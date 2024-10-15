pipeline {
    agent any
    
  tools {
        dockerTool 'docker'
            }
            
    environment {
        frontendImage = "patelaum/massmx-frontend:${GIT_COMMIT}"
        backendImage = "patelaum/massmx-backend:${GIT_COMMIT}"
        SONAR_TOKEN = credentials('sonarqube-token')  
    }


    stages {
		stage('Checkout') {
		    steps {
		        script {
		            git url: 'https://github.com/patel-aum/massx.git', branch: 'dev', credentialsId: 'github-creds' 
		        }
		    }
		}
        
        
stage('SonarQube Scan') {
    steps {
        script {
            def scannerHome = tool 'sonar-scanner'; 
            withSonarQubeEnv('SonarQube') {          
                sh "${scannerHome}/bin/sonar-scanner"
            }
        }
    }
}


       
        stage('Build Docker Image') {
            steps {
                script {
                    sh "${tool 'docker'}/bin/docker build -t ${backendImage} -f ./deploy/Dockerfile.backend ."
                    sh "${tool 'docker'}/bin/docker build -t ${frontendImage} -f ./deploy/Dockerfile.frontend ."
                }
            }
        }
        

stage('Trivy Scan') {
    steps {
        
        script {
            def reportFile = 'trivy-report.txt'
            
            try {
                sh """
                trivy image  ${frontendImage} > ${reportFile}
                """

                echo "Frontend Image Trivy Report:"
                readFile(reportFile).eachLine { line ->
                    echo line
                }

                sh """
                trivy image ${backendImage} > ${reportFile}
                """

                echo "Backend Image Trivy Report:"
                readFile(reportFile).eachLine { line ->
                    echo line
                }

            } catch (Exception e) {
                echo "An error occurred during the Trivy scan: ${e.message}"
                currentBuild.result = 'UNSTABLE'             }
        }
    }
}

        stage('Push Docker Images') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', 'docker-hub') {  // Using Jenkins secret 'docker-hub'
                        sh "docker push ${frontendImage}"
                        sh "docker push ${backendImage}"
                    }
                }
            }
        }

        stage('Update Kubernetes Deployment') {
            steps {
withKubeCredentials(kubectlCredentials: [[caCertificate: '''<ur-cacert>''', clusterName: 'microk8s-cluster', contextName: 'microk8s', credentialsId: 'kubectl-jenkins-sa', namespace: '', serverUrl: 'https://10.152.183.1:443']]) {
    
                    sh """
                    sed -i 's|patelaum/massmx-frontend:.*|${frontendImage}|' ./kubernetes/deployment.app.yaml
                    sed -i 's|patelaum/massmx-backend:.*|${backendImage}|' ./kubernetes/deployment.app.yaml
                    kubectl apply -f ./kubernetes/deployment.app.yaml
                    """
                }
            }
        }}
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

