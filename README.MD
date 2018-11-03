# Instruction

The stack:

- nginx
- node app
- postgresql 
- redis

Tools

- Terraform to provision server or aws_instance, vpc, subnet, and security grroup
- Ansible to install the stack

Note:

Cannot install vagrant `aws-plugin` because of the limitation of my host packages and I can't install the required dependencies related to aws-plugin (one of them ruby). I used ubuntu 16.04 for working environment so I decided to use terraform to create `aws_instance ` and the networks and ansible to provision the stack as well 


## Prerequisites

1. Terraform v0.11.8
    + provider.aws v1.41.0
    + provider.null v1.0.0
    + provider.template v1.0.0
1. ansible 2.6.3
1. The aws-cli installed in machine
1. The aws-cli should do  `aws configure`  to set access-key and secret from aws console (used it by terraform and make sure your account have minimal ec2admin role)


## Steps


```
cd terraform

terraform init //it will download plugins 
required by terraform

terraform plan

terraform apply

//


```


```
When terraform apply process occured it will prompt the location of id_rsa.pub or public key to create ssh access over the server and you need to enter the location

  Path to the SSH public key to be used for authentication.
  Ensure this keypair is added to your local SSH agent so provisioners can
  connect.
  Example: ~/.ssh/id_rsa.pub

  Enter a value: ~/.ssh/id_rsa.pub
```

## Endpoints for programming assignments

- http://aws_public_ip/users //To get user data from dummy external API
- http://aws_public_ip/connections //To get list of connection in database
- http://aws_public_ip/occured //To get most occured IP

Note: The `aws_public_ip` provided in `dev_hosts` file, this file used for create dynamic host inventory for ansible to set the target host.
