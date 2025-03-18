 this is key code from AWS EC2 <code>.\folder_name\dialogflow-key.pem</code>

Connect to linux command using ssh using gitbash: go to instance and start instance and take the ssh key:

- <code>chmod 400 "dialogflow-key.pem" </code>
- <code>ssh -i "dialogflow-key.pem" ubuntu@ec2-your-ec2-ip.eu-north-1.compute.amazonaws.com </code>

<code>Upgrade and update packages on machine:</code>

```bash
sudo apt update && sudo apt upgrade -y

```
Install Node.js:

```bash
sudo apt install nodejs npm -y
node -v && npm -v   # Check installation
node --version
```


Install Unzip to install curl:
```bash
sudo apt install unzip
```

Install bun if you dont want to use node:
``` bash
curl -fsSL https://bun.sh/install | bash
sudo snap install bun-js
```

To upload the files on the AWS EC2- linux
command called 'scp'- copies everything or 'rsync' for selectively adding data to EC2 

``` bash
rsync -avz --exclude 'node_modules' --exclude '.git' --exclude '.env' --exclude 'aws-ec2-keypair-ubuntu24' \ -e "ssh -i ~/.folder_name/dialogflow_key.pem" \ .   ubuntu@ec2-your-ec2-ip.eu-north-1.compute.amazonaws.com:~/app
``` 
``` bash

scp -i "folder_name\dialogflow-ui-key.pem" -r "C:/Users/virtu/Desktop/DiploTech/ChatBot/dialogflow-backend" ubuntu@ec2-your-ec2-ip.eu-north-1.compute.amazonaws.com:/home/ubuntu/
``` 

Location of AWS EC2 Pairing KEY
``` bash
folder_name\dialogflow-ui-key.pem
``` 

Accessing AWS EC2 Instance using SSH
``` bash
chmod 400 "dialogflow_key.pem"
ssh -i "dialogflow-ui-key.pem" ubuntu@ec2-your-ec2-ip.eu-north-1.compute.amazonaws.com
``` 



transfer the ONLY json file to EC2
``` bash
scp -i dialogflow-ui-key.pem -r diplopal-ydko-2e11661250b0.json  ubuntu@ec2-13-53-125-185.eu-north-1.compute.amazonaws.com:/home/ubuntu/
```



export GOOGLE_APPLICATION_CREDENTIALS="/home/ubuntu/chatbot_XXX_XXXXX.json"




Check <b>Public IP</b> in EC2 using command:

``` bash

curl ifconfig.me
```

<b>Private IP </b>
``` bash
hostname -I
```

Run command in Bash in the EC2 Instance:

```bash
node server.js
```

Now, Run the code:
``` bash
curl http://your-ec2-ip:3000
```
<b> Result:</b> Chatbot backend is running!

if the chatbot handles POST requests (chat reply), try sending a POST request instead of GET

```bash
curl -X POST http://your-ec2-ip:3000/dialogflow -H "Content-Type: application/json" -d '{"message": "Hello"}'

```






