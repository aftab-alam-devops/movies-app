pipeline {
    agent any

    environment {
        APP_DIR = "/home/ubuntu/MERN-Movies-App"
    }

    stages {

        stage('Clone Code') {
            steps {
                git branch: 'main', url: 'https://github.com/aftab-alam-devops/movies-app.git'
            }
        }

        stage('Install Backend Dependencies') {
            steps {
                dir('backend') {
                    sh 'npm install'
                }
            }
        }

        stage('Install Frontend Dependencies') {
            steps {
                dir('frontend') {
                    sh 'npm install'
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir('frontend') {
                    sh 'npm run build'
                }
            }
        }

        stage('Deploy to EC2') {
            steps {
                sh '''
                rm -rf $APP_DIR
                mkdir -p $APP_DIR
                cp -r * $APP_DIR
                '''
            }
        }

        stage('Start App with a PM2') {
            steps {
                sh '''
                cd $APP_DIR/backend

                pm2 delete movies-app || true
                pm2 start index.js --name movies-app
                '''
            }
        }
    }
}