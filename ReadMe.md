
# Implementation & Guidelines of Google Dialogflow ES in AWS EC2 

## Connect locally to EC2's Linux using SSH in Gitbash
In [AWS EC2](https://eu-north-1.console.aws.amazon.com/ec2/), create Instance and get the SSH Key from the SSH Client:

Run this command, if necessary, to ensure your key is not publicly viewable.

``` bash
chmod 400 "dialogflow-key-file.pem"
```

Instance using its Public DNS:
``` bash
ubuntu@ec2-your-ec2-ip.eu-north-1.compute.amazonaws.com
```

Run the bottom line to connect using SSH 

``` bash
ssh -i "dialogflow-key-file.pem" ubuntu@ec2-ip-address.eu-north-1.compute.amazonaws.com
``` 

## AWS Key for Instance
Save this Key pairing file (.pem format) from AWS EC2 to the local folder as a '.pem' file  
 ``` bash
 aws local_folder\dialogflow-key-file.pem
 ```

## Installation of Necessary Packages
### Upgrade and update packages on machine

``` bash
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

Install rsync to transfer files
``` bash
sudo apt-get install rsync
``` 

## Upload Chatbot UI file to EC2 Instance
To upload the files on the AWS EC2, use the linux command called <b>scp</b> to copies everything or <b>rsync</b> for selectively adding data to EC2 

``` bash
rsync -avz --exclude 'node_modules' --exclude '.git' --exclude '.env' --exclude 'aws-ec2-keypair-ubuntu24' \ -e "ssh -i ~/.aws-ec2-keypair-ubuntu24/dialogflow-key-file.pem" \ .   ubuntu@ec2-ip-address.eu-north-1.compute.amazonaws.com:~/app
``` 
OR

``` bash

scp -i "aws-ec2-keypair-ubuntu24/dialogflow-key-file.pem" -r "C:/Users/virtu/Desktop/DiploTech/ChatBot/dialogflow-backend" ubuntu@ec2-ip-address.eu-north-1.compute.amazonaws.com:/home/ubuntu/
``` 

Location of AWS EC2 Pairing KEY
``` bash
local_folder\dialogflow-key-file.pem
``` 

Accessing AWS EC2 Instance using SSH
``` bash
chmod 400 "dialogflow-key-file.pem"
ssh -i "local_folder\dialogflow-key-file.pem" ubuntu@ec2-ip-address.eu-north-1.compute.amazonaws.com
``` 



transfer the ONLY json file to EC2
``` bash
scp -i dialogflow-key-file.pem -r dialogflow_api_key.json  ubuntu@ec2-ip-address.eu-north-1.compute.amazonaws.com:/home/ubuntu/
```

Use this JSON file to authenticate API requests
``` bash
export GOOGLE_APPLICATION_CREDENTIALS="/home/ubuntu/dialogflow_api_key.json"
```

Check <b>Public IP</b> in EC2 using command:

``` bash
curl ifconfig.me
```
<b>Result: </b> 00.00.000.000


<b>Private IP </b>
``` bash
hostname -I
```

<b>Result:</b> 111.11.11.111


Run command in Bash in the EC2 Instance to start server:

```bash
node server.js
```

Now, Run the code:
``` bash
curl http://00.00.000.000.:X000
```
<b> Result:</b> Chatbot backend is running!

if the chatbot handles POST requests (chat reply), try sending a POST request instead of GET

```bash
curl -X POST http://00.00.000.000.:X000/dialogflow -H "Content-Type: application/json" -d '{"message": "Hello"}'

```

or Run this in local browser. A chatbot will appear on the bottom left
```bash
http://00.00.000.000/
```

Deny access to Port X000
```bash
sudo ufw deny X000

```


## How to Restart server using pm2
PM2 makes sure that the EC2 will be running the Nodejs application continously, even when the AWS is close.
It allows you quickly start, control, or stop your node processes
```bash
pm2 start server.js
pm2 restart server.js
sudo systemctl restart nginx
```

