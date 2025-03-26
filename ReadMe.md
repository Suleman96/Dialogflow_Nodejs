Application Default Credentials in Local Development Environment    :
https://cloud.google.com/docs/authentication/provide-credentials-adc

Google Cloud APIs and Credentials:
https://console.cloud.google.com/apis/credentials?inv=1&invt=Abqisw&project=diplopal-ydko
API KEY 1: AIzaSyBJI66gSw2jicvm1crj8IbQUxmTZgAIkAA


# Implementation of AWS EC2 



## Connect locally to EC2's Linux using SSH in Gitbash
In [AWS EC2](https://eu-north-1.console.aws.amazon.com/ec2/), create Instance and get the SSH Key from the SSH Client:

Run this command, if necessary, to ensure your key is not publicly viewable.

``` bash
chmod 400 "dialogflow-ui-key.pem"
```

Instance using its Public DNS:
``` bash
ubuntu@ec2-your-ec2-ip.eu-north-1.compute.amazonaws.com
```

Run the bottom line to connect using SSH 

``` bash
ssh -i "dialogflow-ui-key.pem" ubuntu@ec2-13-53-125-185.eu-north-1.compute.amazonaws.com
``` 

## AWS Key for Instance
Save this Key file (.pem format) from AWS EC2  
 ``` bash
 aws keyaws-ec2-keypair-ubuntu24\dialogflow-ui-key.pem
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
rsync -avz --exclude 'node_modules' --exclude '.git' --exclude '.env' --exclude 'aws-ec2-keypair-ubuntu24' \ -e "ssh -i ~/.aws-ec2-keypair-ubuntu24/dialogflow-ui-key.pem" \ .   ubuntu@ec2-13-53-125-185.eu-north-1.compute.amazonaws.com:~/app
``` 
OR

``` bash

scp -i "aws-ec2-keypair-ubuntu24/dialogflow-ui-key.pem" -r "C:/Users/virtu/Desktop/DiploTech/ChatBot/dialogflow-backend" ubuntu@ec2-13-53-125-185.eu-north-1.compute.amazonaws.com:/home/ubuntu/
``` 

Location of AWS EC2 Pairing KEY
``` bash
folder\dialogflow-ui-key.pem
``` 

Accessing AWS EC2 Instance using SSH
``` bash
chmod 400 "dialogflow-ui-key.pem"
ssh -i "dialogflow-ui-key.pem" ubuntu@ec2-13-53-125-185.eu-north-1.compute.amazonaws.com
``` 



transfer the ONLY json file to EC2
``` bash
scp -i dialogflow-ui-key.pem -r diplopal-ydko-2e11661250b0.json  ubuntu@ec2-13-53-125-185.eu-north-1.compute.amazonaws.com:/home/ubuntu/
```

Use this JSON file to authenticate API requests
``` bash
export GOOGLE_APPLICATION_CREDENTIALS="/home/ubuntu/diplopal-ydko-2e11661250b0.json"
```





Check <b>Public IP</b> in EC2 using command:

``` bash

curl ifconfig.me
```
<b>Result: </b> 13.53.125.185


<b>Private IP </b>
``` bash
hostname -I
```

<b>Result:</b> 172.31.18.182


Run command in Bash in the EC2 Instance:

```bash
node server.js
```

Now, Run the code:
``` bash
curl http://13.53.125.185:3000
```
<b> Result:</b> Chatbot backend is running!

if the chatbot handles POST requests (chat reply), try sending a POST request instead of GET

```bash
curl -X POST http://13.53.125.185:3000/dialogflow -H "Content-Type: application/json" -d '{"message": "Hello"}'

```



Deny access to Port 3000
```bash
sudo ufw deny 3000

```


How to Restart server using pm2

```bash
pm2 restart server.js
sudo systemctl restart nginx
```







