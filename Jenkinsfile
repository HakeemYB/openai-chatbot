node {
    def tag
    stage('Build') {
        // build react app
        sh 'npm install && npm run build'
    }
    stage('Dockerize') {
        // assign tag as env variable
        tag = env.BUILD_ID
        // build docker image
        sh "docker build -t react-app:$tag ."
    }
    stage('Push to registry') {
        // push docker image to registry
        sh "docker push react-app:$tag"
    }
    stage("Deploy") {
            steps {
                sh "sudo -S rm -rf /var/www/openai-chatbot"
                sh "sudo cp -r ${WORKSPACE}/build/ /var/www/openai-chatbot/"
            }
        }
}