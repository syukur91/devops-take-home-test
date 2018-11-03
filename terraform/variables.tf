variable "aws_region" {
  description = "AWS region to launch servers."
  default     = "us-east-2"
}

# Ubuntu Precise 12.04 LTS (x64)
variable "aws_amis" {
  default = {
    us-east-2 = "ami-0b59bfac6be064b78"
  }
}

variable "instanceTenancy" {
 default = "default"
}

variable "dnsSupport" {
 default = true
}

variable "dnsHostNames" {
        default = true
}

variable "vpcCIDRblock" {
 default = "10.0.0.0/16"
}

variable "subnetCIDRblock" {
        default = "10.0.1.0/24"
}

variable "destinationCIDRblock" {
        default = "0.0.0.0/0"
}


variable "instanceType" {
        default = "t2.micro"
}


variable "public_key_path" {
  description = <<DESCRIPTION
Path to the SSH public key to be used for authentication.
Ensure this keypair is added to your local SSH agent so provisioners can
connect.
Example: ~/.ssh/id_rsa.pub
DESCRIPTION
}