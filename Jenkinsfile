pipeline {
    agent any
    environment {
        frontendImage = "patelaum/massmx-frontend:${GIT_COMMIT}"
        backendImage = "patelaum/massmx-backend:${GIT_COMMIT}"
        docker_hub = credentials('docker-hub')  // Jenkins secret for DockerHub username
        SONAR_TOKEN = credentials('sonarqube-token')          // Jenkins secret for SonarQube token
    }
    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/patel-aum/massx.git'
            }
        }
        stage('SonarQube Scan') {
            steps {
                script {
                    withSonarQubeEnv('SonarQube') {
                        sh "sonar-scanner -Dsonar.projectKey=mass-email-sender -Dsonar.sources=./frontend,./backend -Dsonar.host.url=http://sonarqube.massx -Dsonar.login=${SONAR_TOKEN}"
                    }
                }
            }
        }
        stage('Quality Gate') {
            steps {
                script {
                    timeout(time: 1, unit: 'MINUTES') {
                        waitForQualityGate abortPipeline: true
                    }
                }
            }
        }
        stage('Trivy Scan') {
            steps {
                sh 'trivy image --exit-code 1 ${frontendImage}'
                sh 'trivy image --exit-code 1 ${backendImage}'
            }
        }
        stage('Build Docker Images') {
            steps {
                script {
                    sh "docker build -t ${frontendImage} -f ./deploy/Dockerfile.frontend ./frontend"
                    sh "docker build -t ${backendImage} -f ./deploy/Dockerfile.backend ./backend"
                }
            }
        }
        stage('Push Docker Images') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', 'docker-hub-credentials') {
                        sh "docker login -u ${dockerHubCreds_USR} -p ${dockerHubCreds_PSW}"
                        sh "docker push ${frontendImage}"
                        sh "docker push ${backendImage}"
                    }
                }
            }
        }
        stage('Update Kubernetes Deployment') {
            steps {
                script {
                    sh """
                    sed -i 's|patelaum/massmx-frontend:.*|${frontendImage}|' ./kubernetes/deployment.app.yaml
                    sed -i 's|patelaum/massmx-backend:.*|${backendImage}|' ./kubernetes/deployment.app.yaml
                    kubectl apply -f ./kubernetes/deployment.app.yaml
                    """
                }
            }
        }
    }
    post {
        always {
            cleanWs()
        }
        success {
            echo "Deployment was successful"
        }
        failure {
            echo "Build or tests failed, deployment aborted"
        }
    }
}

