pipeline {
    agent any

    stages {

        stage('Clone') {
            steps {
                echo 'Repository cloned successfully'
            }
        }

        stage('Build Backend Image') {
            steps {
                sh 'docker build -t kuldeepkolage/cloudforge-backend:v1 ./backend'
            }
        }

        stage('Build Frontend Image') {
            steps {
                sh 'docker build -t kuldeepkolage/cloudforge-frontend:v1 ./frontend'
            }
        }

        stage('Push Backend Image') {
            steps {
                sh 'docker push kuldeepkolage/cloudforge-backend:v1'
            }
        }

        stage('Push Frontend Image') {
            steps {
                sh 'docker push kuldeepkolage/cloudforge-frontend:v1'
            }
        }
    }
}
