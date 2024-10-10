# MassX Project

An enterprise-grade mass mailing solution with robust DevOps infrastructure. Send millions of emails efficiently while maintaining deliverability and scalability.

## 📧 Key Features

- **High-throughput Email Processing**: Capable of sending millions of emails per day
- **Email Templating**: Customizable templates for personalized mass communications
- **Bounce Handling**: Automated processing of bounced emails
- **Deliverability Optimization**: Built-in practices to ensure high delivery rates
- **Analytics Dashboard**: Track open rates, click rates, and other key metrics
- **List Management**: Efficient handling of subscriber lists and segmentation

## 🏗️ Infrastructure Features

- AWS infrastructure provisioned with Terraform for optimal email throughput
- Kubernetes cluster for scalable email processing
- Jenkins integration for automated deployment of email templates and configurations
- SonarQube for code quality analysis ensuring reliable email service
- Containerized application deployment for consistent environments

## 📋 Prerequisites

Ensure you have the following tools installed:

- [Terraform](https://www.terraform.io/downloads) for infrastructure provisioning
- [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html)
- [kubectl](https://kubernetes.io/docs/tasks/tools/) for Kubernetes management
- [kubeadm](https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/install-kubeadm/)
- [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- [Docker](https://docs.docker.com/get-docker/)

## 🛠️ Setup Guide

### 1. Configure SMTP Servers

Create a `.env` file with your SMTP server details. Multiple SMTP servers can be configured for increased throughput:

```bash
# Primary SMTP Server
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your-email@example.com
SMTP_PASS=your-email-password

# Add more SMTP servers as needed for higher throughput
```

### 2. AWS Infrastructure Provisioning

Deploy the required AWS infrastructure with high network capacity for email sending:

```bash
terraform init
terraform plan
terraform apply
```

### 3. Kubernetes Setup

SSH into AWS instances and run the setup script:

```bash
./setup.sh
```

### 4. Repository Setup

```bash
git clone https://github.com/your-repo/massx.git
cd massx
```

### 5. Create Kubernetes Namespaces

```bash
kubectl create ns app
kubectl create ns database
kubectl create ns jenkins
kubectl create ns sonarqube
```

### 6. Deploy Kubernetes Resources

```bash
kubectl apply -f ./kubernetes
```

### 7. Security Configuration

Configure AWS Security Groups to open required ports:
- 80, 443 (Email Web Interface)
- 8080 (Jenkins)
- 9000 (SonarQube)
- 25, 587, 465 (SMTP Ports - configure based on your providers)

## 📧 Email Configuration

### DKIM and SPF Setup

1. Configure DKIM keys for each sending domain
2. Set up SPF records for improved deliverability
3. Implement DMARC policies

Example DNS records:
```
# SPF Record
v=spf1 include:_spf.massx.com ~all

# DKIM Record
massx._domainkey IN TXT "v=DKIM1; k=rsa; p=YOUR_PUBLIC_KEY"
```

### Rate Limiting

Configure email rate limits in `config.yaml`:
```yaml
ratelimits:
  per_second: 50
  per_minute: 3000
  per_hour: 100000
```

## 📊 Monitoring

- Monitor email queues through the Kubernetes dashboard
- Track delivery rates and bounces in the application UI
- Set up alerts for delivery issues or high bounce rates

## 🔍 Troubleshooting

Common issues and solutions:
- **High bounce rates**: Check sender reputation and DKIM/SPF setup
- **Low throughput**: Verify SMTP server connections and rate limits
- **Template rendering issues**: Validate template syntax and data formats

## 📝 Notes

- Regularly monitor IP reputation for optimal deliverability
- Implement proper warming up procedures for new IP addresses
- Follow email best practices to maintain high sender reputation

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

