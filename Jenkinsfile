pipeline {
  agent any
 
  stages {
    stage('Build') {
      steps {
        echo 'Building React Project'
        sh 'npm install'
        sh 'npm run build'
      }
    }
    stage('Dockerize') {
      steps {
        echo 'Dockerize React Application'
        sh 'docker build --rm -f Dockerfile -t beyghakymyar/chatbot:$BUILD_NUMBER .'
      }
    }
    stage('Deployment') {
      steps {
        echo 'Deploying React Application to Minikube'
        sh 'kubectl apply -f deployment.yml'
        sh 'kubectl expose deployment <app-name> --type=NodePort --port=8080'
      }
    }
  }
  post {
    always {
      echo 'Auto tagging images'
      sh 'docker tag beyghakymyar/chatbot:$BUILD_NUMBER beyghakymyar/chatbot:latest'
      sh 'docker push beyghakymyar/chatbot:$BUILD_NUMBER'
      sh 'docker push beyghakymyar/chatbot:latest'
    }
  }
}