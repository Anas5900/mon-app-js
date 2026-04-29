pipeline {
    agent any

    environment {
        IMAGE_NAME = "anas59/mon-app-js"
        IMAGE_TAG = "latest"
        PATH = "/usr/local/bin:/usr/bin:/bin"
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install') {
            steps {
                sh '/usr/local/bin/node /usr/local/bin/npm install'
            }
        }

        stage('Test') {
            steps {
                sh '/usr/local/bin/node /usr/local/bin/npm test'
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
                // sh "docker run -d -p 3000:3000 --name mon-app-js ${IMAGE_NAME}:${IMAGE_TAG}"
                sh "kubectl apply -f deployment.yaml"
                sh "kubectl apply -f service.yaml"
            }
        }
    }

    post {
        success {
            echo 'Pipeline réussi !'
        }
        failure {
            echo 'Pipeline échoué !'
        }
    }
}