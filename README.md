# MassX Project
<img src="https://github.com/user-attachments/assets/73bd0255-0e53-4dc2-9d7b-48b63db06eb1" alt="MassX drawio" width="1000" height="800">


An enterprise-grade mass mailing solution with robust DevOps infrastructure. Send millions of emails efficiently while maintaining deliverability and scalability.

## Deployment Plan

The deployment process adheres to the following steps:

1. **Image Creation:** A Docker image is constructed for the application.
2. **Quality Gates:** The code undergoes scrutiny through SonarQube for code quality and security checks.
3. **Security Scanning:** Trivy scans the Docker image for vulnerabilities.
4. **Docker Registry:** The image is pushed to a Docker registry for storage and distribution.
5. **Cloud Deployment:** The image is deployed to an EC2 instance on the cloud.

## Technology Stack

- **Frontend:** React
- **Backend:** Flask
- **Caching:** Redis
- **Database:** Cassandra DB
- **Deployment:** Jenkins, Docker, AWS
- **Security:** SonarQube, Trivy

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
git clone https://github.com/patel-aum/massx.git
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

### 8. Jenkins Setup
Required Plugins

Docker & Docker Pipeline
SonarQube Scanner
Kubernetes & Kubernetes CLI

- Credentials Setup
Add the following to Jenkins credentials:

GitHub credentials - github-creds
SonarQube token - sonarqube-token
Docker Hub credentials - docker-hub


### 9. Configure Kubernetes in Jenkins
Use the withKubeCredentials directive to generate the syntax for configuring kubectl in Jenkins. This will allow Jenkins to interact with your Kubernetes cluster.

withKubeConfig([credentialsId: 'your-k8s-credentials', namespace: 'app']) {
    sh 'kubectl get pods'
}


### 10. Application Deployment

Once the above steps are complete, your application should be deployed on the Kubernetes cluster. Use Jenkins to trigger the pipeline for building Docker images, running SonarQube checks, and deploying to Kubernetes.