# Implementation of AWS EC2 


## Connect locally to EC2's Linux using SSH in Gitbash
In [AWS EC2](https://eu-north-1.console.aws.amazon.com/ec2/), create Instance and get the SSH Key from the SSH Client:

Run this command, if necessary, to ensure your key is not publicly viewable.
```bash
chmod 400 "dialogflow-key.pem"
```

Instance using its Public DNS:
```bash
ec2-your-ec2-ip.eu-north-1.compute.amazonaws.com
```

Run the bottom line to connect using SSH 
```bash
ssh -i "dialogflow-key.pem" ubuntu@ec2-your-ec2-ip.eu-north-1.compute.amazonaws.com
```

## AWS Key for Instance
Save this Key file (.pem format) from AWS EC2 
```bash
.\folder_name\dialogflow-key.pem
```

## Installation of Necessary Packages
### Upgrade and update packages on machine

```bash
sudo apt update && sudo apt upgrade -y
```

### Install Node.js:

```bash
sudo apt install nodejs npm -y
node -v && npm -v   # Check installation
node --version
```

### Install Unzip to install curl:
```bash
sudo apt install unzip
sudo apt-get install curl

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
scp -i dialogflow-key.pem -r chatbot_json_file.json  ubuntu@ec2-yuor-ip.eu-north-1.compute.amazonaws.com:/home/ubuntu/
```

Use this JSON file to authenticate API requests
``` bash
export GOOGLE_APPLICATION_CREDENTIALS="/home/ubuntu/chatbot_XXX_XXXXX.json"
```



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






