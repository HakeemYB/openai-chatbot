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
        def buildTag = BUILD_TAG.split("-")
        sh 'docker tag chatbot docker.io/beyghakymyar/chatbot:${buildTag[0]}-${buildTag[1]}'
        sh 'docker build --rm -f Dockerfile -t beyghakymyar/chatbot:$BUILD_NUMBER .'
      }
    }
    stage('Deployment') {
      steps {
        echo 'Deploying React Application to Minikube'
        sh 'kubectl apply -f chatbot.yml'
        sh 'kubectl expose deployment beyghakymyar/chatbot:$BUILD_NUMBER --type=NodePort --port=30000'
      }
    }
  }
}