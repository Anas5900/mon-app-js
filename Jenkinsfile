pipeline {
    agent any

    environment {
        IMAGE_NAME = "anas59/mon-app-js"
        IMAGE_TAG = "latest"
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install') {
            steps {
                sh 'npm install'
            }
        }

        stage('Test') {
            steps {
                sh 'npm test'
            }
        }

        stage('Build Docker') {
            steps {
                sh "docker build -t ${IMAGE_NAME}:${IMAGE_TAG} ."
            }
        }

        stage('Push Docker Hub') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-credentials',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    sh "echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin"
                    sh "docker push ${IMAGE_NAME}:${IMAGE_TAG}"
                }
            }
        }

        stage('Deploy') {
            steps {
                // Docker (commenté, remplacé par Kubernetes)
                // sh "docker run -d -p 3000:3000 --name mon-app-js ${IMAGE_NAME}:${IMAGE_TAG}"

                sh "kubectl apply -f deployment.yaml"
                sh "kubectl apply -f service.yaml"
            }
        }
    }

    post {
        success {
            mail to: 'anasbouchlaghem@gmail.com',
                 subject: "✅ Pipeline réussi - ${env.JOB_NAME}",
                 body: "Le pipeline ${env.JOB_NAME} #${env.BUILD_NUMBER} s'est terminé avec succès."
        }
        failure {
            mail to: 'anasbouchlaghem@gmail.com',
                 subject: "❌ Pipeline échoué - ${env.JOB_NAME}",
                 body: "Le pipeline ${env.JOB_NAME} #${env.BUILD_NUMBER} a échoué. Vérifie les logs."
        }
    }
}