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

        // DEPLOY (with env fix)
        stage('Deploy') {
            steps {
                sh '''
                mkdir -p $DEPLOY_DIR

                # backup .env if exists
                cp $DEPLOY_DIR/backend/.env /tmp/.env_backup 2>/dev/null || true

                rm -rf $DEPLOY_DIR/*
                cp -r * $DEPLOY_DIR/

                # restore .env
                mkdir -p $DEPLOY_DIR/backend
                cp /tmp/.env_backup $DEPLOY_DIR/backend/.env 2>/dev/null || true
                '''
            }
        }

        // START APP (clean  and reliable)
        stage('Start App with PM2') {
            steps {
                sh '''
                cd $DEPLOY_DIR/backend

                # start or restart safely
                pm2 restart movies-app || pm2 start index.js --name movies-app

                pm2 save
                '''
            }
        }
    }
}