pipeline {
    agent any

    stages {
        stage('Cloning repo') {
            steps {
                git 'https://github.com/surendharsundar793-prog/Surendhar-Portfolio.git'
            }
        }
        stage('Build the image') {
            steps {
                bat 'docker build -t portfolio .'
            }
        }
         stage('Create a container') {
            steps {
                bat 'docker run -d -p 150:80 --name con1 portfolio'
            }
        }
         stage('Push image to dockerhub') {
            steps {
                bat '''docker login -u surendharr -p Surendhar@12
                       docker tag docker-img surendharr/portfolio:v1
                       docker push surendharr/portfolio:v1'''
            }
        }
    }
}
