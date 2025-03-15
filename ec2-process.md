 this is key code from AWS EC2 <code>aws keyaws-ec2-keypair-ubuntu24\dialogflow-ui-key.pem</code>

Connect to linux command using ssh using gitbash: go to instance and start instance and take the ssh key:

- <code>chmod 400 "dialogflow-ui-key.pem" </code>
- <code>ssh -i "dialogflow-ui-key.pem" ubuntu@ec2-13-53-125-185.eu-north-1.compute.amazonaws.com</code>

<code>Upgrade and update packages on machine:</code>
<code>sudo apt update && sudo apt upgrade -y </code>


Install Node.js:
<code>sudo apt install nodejs npm -y
<code>node -v && npm -v   # Check installation
<code>node --version

Install Unzip to install curl:
sudo apt install unzip

Install bun if you dont want to use node:
curl -fsSL https://bun.sh/install | bash
bash
bun 
OR 
sudo snap install bun-js


To upload the files on the AWS EC2- linux
command called 'scp'- copies everything 

or rsync

rsync -avz --exclude 'node_modules' --exclude '.git' --exclude '.env' --exclude 'aws-ec2-keypair-ubuntu24' \ -e "ssh -i ~/.aws-ec2-keypair-ubuntu24/dialogflow-ui-key.pem" \ .   ubuntu@ec2-13-53-125-185.eu-north-1.compute.amazonaws.com:~/app


 now go to local machine bash and add the above code


aws-ec2-keypair-ubuntu24\dialogflow-ui-key.pem

chmod 400 "aws-ec2-keypair-ubuntu24\dialogflow-ui-key.pem"
ssh -i "aws-ec2-keypair-ubuntu24\dialogflow-ui-key.pem" ubuntu@ec2-13-53-125-185.eu-north-1.compute.amazonaws.com

scp -i "aws-ec2-keypair-ubuntu24/dialogflow-ui-key.pem" -r "C:/Users/virtu/Desktop/DiploTech/ChatBot/dialogflow-backend" ubuntu@ec2-13-53-125-185.eu-north-1.compute.amazonaws.com:/home/ubuntu/






