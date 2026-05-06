pipeline {
    agent any

    environment {
        DEPLOY_DIR = "/var/lib/jenkins/deploy"
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

        
        stage('Deploy') {
            steps {
                sh '''
                mkdir -p $DEPLOY_DIR
                rm -rf $DEPLOY_DIR/*
                cp -r * $DEPLOY_DIR/
                '''
            }
        }

        
        stage('Start App with PM2') {
            steps {
                sh '''
                cd $DEPLOY_DIR/backend

                # install pm2 if not exists
                npm install -g pm2 || true

                # stop old app
                pm2 delete movies-app || true

                # start app
                pm2 start index.js --name movies-app

                pm2 save
                '''
            }
        }
    }
}