from flask import Flask, request, jsonify
from flask_mail import Mail, Message
import os
from dotenv import load_dotenv
from flask_cors import CORS

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

mail = Mail(app)

@app.route('/')
def home():
    return jsonify({"message": "Welcome to the Mass Email Sender API"})

@app.route('/send-email', methods=['POST'])
def send_email():
    data = request.get_json()
    subject = data.get('subject')
    recipient = data.get('recipient')
    body = data.get('body')
    
    if not subject or not recipient or not body:
        return jsonify({"error": "Missing required fields"}), 400
    
    try:
        msg = Message(subject, sender=os.getenv('MAIL_USERNAME'), recipients=[recipient])
        msg.body = body
        mail.send(msg)
        return jsonify({"message": "Email sent successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)

