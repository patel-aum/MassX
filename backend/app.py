from flask import Flask, request, jsonify
from flask_mail import Mail, Message
import os
from dotenv import load_dotenv
from flask_cors import CORS
from cassandra.cluster import Cluster
from cassandra.query import SimpleStatement
import redis
from uuid import UUID

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Configure Flask-Mail
app.config['MAIL_SERVER'] = os.getenv('MAIL_SERVER')
app.config['MAIL_PORT'] = int(os.getenv('MAIL_PORT'))
app.config['MAIL_USERNAME'] = os.getenv('MAIL_USERNAME')
app.config['MAIL_PASSWORD'] = os.getenv('MAIL_PASSWORD')
app.config['MAIL_USE_TLS'] = os.getenv('MAIL_USE_TLS').lower() == 'true'
app.config['MAIL_USE_SSL'] = os.getenv('MAIL_USE_SSL').lower() == 'true'
app.config['CASSENDRA_HOST'] = os.getenv('CASSENDRA_HOST')

mail = Mail(app)

cassandra_host = os.getenv('CASSANDRA_HOST')
# Connect to Cassandra
#cluster = Cluster(['127.0.0.1'])
cluster = Cluster([os.getenv('CASSANDRA_HOST')])

#cluster = Cluster([cassandra_host])
session = cluster.connect('email_sender')

# Connect to Redis
redis_client = None
try:
    redis_client = redis.StrictRedis(host='REDIS_HOST', port=6379, db=0)
    redis_client.ping()
except redis.ConnectionError as e:
    print(f"Warning: Redis connection failed. Error: {str(e)}")
    print("Caching will be disabled.")
    redis_client = None
except Exception as e:
    print(f"Unexpected error when connecting to Redis: {str(e)}")
    redis_client = None

def log_email(recipient_email, subject, body, status):
    query = SimpleStatement("""
        INSERT INTO email_logs (id, recipient_email, subject, body, status, timestamp)
        VALUES (uuid(), %s, %s, %s, %s, toTimestamp(now()))
    """)
    session.execute(query, (recipient_email, subject, body, status))

def cache_template(template_id, template_data):
    if redis_client:
        redis_client.set(template_id, template_data)

def get_cached_template(template_id):
    if redis_client:
        return redis_client.get(template_id)
    return None

def fetch_template(template_id):
    cached_template = get_cached_template(template_id)
    if cached_template:
        return cached_template

    query = SimpleStatement("SELECT * FROM templates WHERE id=%s")
    template = session.execute(query, (template_id,))
    cache_template(template_id, template)
    return template

@app.route('/')
def home():
    return jsonify({"message": "Welcome to the Mass Email Sender API"})

@app.route('/send-email', methods=['POST'])
def send_email():
    data = request.get_json()
    print("Received data:", data)  # Add this line to log the incoming data

    subject = data.get('subject')
    recipient = data.get('recipient')
    body = data.get('body')
    
    if not subject or not recipient or not body:
        return jsonify({"error": "Missing required fields"}), 400
    
    try:
        msg = Message(subject, sender=os.getenv('MAIL_USERNAME'), recipients=[recipient])
        msg.body = body
        mail.send(msg)
        log_email(recipient, subject, body, "Sent")
        return jsonify({"message": "Email sent successfully"}), 200
    except Exception as e:
        log_email(recipient, subject, body, f"Failed: {str(e)}")
        return jsonify({"error": str(e)}), 500

@app.route('/templates', methods=['POST'])
def create_template():
    data = request.get_json()
    name = data.get('name')
    subject = data.get('subject')
    body = data.get('body')

    if not name or not subject or not body:
        return jsonify({"error": "Missing required fields"}), 400

    query = SimpleStatement("""
        INSERT INTO templates (id, name, subject, body)
        VALUES (uuid(), %s, %s, %s)
    """)
    session.execute(query, (name, subject, body))
    return jsonify({"message": "Template created successfully"}), 201

@app.route('/templates', methods=['GET'])
def get_templates():
    query = SimpleStatement("SELECT * FROM templates")
    templates = session.execute(query)
    return jsonify([dict(template._asdict()) for template in templates]), 200

@app.route('/templates/<template_id>', methods=['GET'])
def get_template(template_id):
    template = fetch_template(template_id)
    if template:
        return jsonify(dict(template[0])), 200
    else:
        return jsonify({"error": "Template not found"}), 404

@app.route('/templates/<template_id>', methods=['PUT'])
def update_template(template_id):
    data = request.get_json()
    subject = data.get('subject')
    body = data.get('body')

    if not subject or not body:
        return jsonify({"error": "Missing required fields"}), 400

    query = SimpleStatement("""
        UPDATE templates SET subject=%s, body=%s WHERE id=%s
    """)
    session.execute(query, (subject, body, template_id))
    return jsonify({"message": "Template updated successfully"}), 200

# @app.route('/templates/<template_id>', methods=['DELETE'])
# def delete_template(template_id):
#     query = SimpleStatement("DELETE FROM templates WHERE id=%s")
#     session.execute(query, (template_id,))
#     redis_client.delete(template_id)  # Remove from cache
#     return jsonify({"message": "Template deleted successfully"}), 200

@app.route('/recipients', methods=['POST'])
def create_recipient():
    data = request.get_json()
    email = data.get('email')
    name = data.get('name')

    if not email or not name:
        return jsonify({"error": "Missing required fields"}), 400

    query = SimpleStatement("""
        INSERT INTO recipients (id, email, name)
        VALUES (uuid(), %s, %s)
    """)
    session.execute(query, (email, name))
    return jsonify({"message": "Recipient created successfully"}), 201

@app.route('/recipients', methods=['GET'])
def get_recipients():
    query = SimpleStatement("SELECT * FROM recipients")
    recipients = session.execute(query)
    return jsonify([dict(recipient._asdict())  for recipient in recipients]), 200

@app.route('/recipients/<recipient_id>', methods=['GET'])
def get_recipient(recipient_id):
    query = SimpleStatement("SELECT * FROM recipients WHERE id=%s")
    recipient = session.execute(query, (recipient_id,))
    if recipient:
        return jsonify(dict(recipient[0])), 200
    else:
        return jsonify({"error": "Recipient not found"}), 404

@app.route('/recipients/<recipient_id>', methods=['PUT'])
def update_recipient(recipient_id):
    data = request.get_json()
    email = data.get('email')
    name = data.get('name')

    if not email or not name:
        return jsonify({"error": "Missing required fields"}), 400

    query = SimpleStatement("""
        UPDATE recipients SET email=%s, name=%s WHERE id=%s
    """)
    session.execute(query, (email, name, recipient_id))
    return jsonify({"message": "Recipient updated successfully"}), 201

@app.route('/templates/<template_id>', methods=['DELETE'])
def delete_template(template_id):
    try:
        # Convert the template_id to UUID
        template_uuid = UUID(template_id)
        
        query = SimpleStatement("DELETE FROM templates WHERE id=%s")
        session.execute(query, (template_uuid,))
        
        if redis_client:
            redis_client.delete(template_id)  # Remove from cache
        
        return jsonify({"message": "Template deleted successfully"}), 200
    except ValueError:
        return jsonify({"error": "Invalid template ID format"}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500

print("Starting Flask application...")

if __name__ == '__main__':
    app.run(debug=True)
print("End of script")

