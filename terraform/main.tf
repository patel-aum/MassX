
resource "aws_vpc" "massx_vpc" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_support   = true
  enable_dns_hostnames = true
  tags = {
    Name = "massx_vpc"
  }
}

resource "aws_subnet" "massx_subnet" {
  vpc_id                  = aws_vpc.massx_vpc.id
  cidr_block              = "10.0.1.0/24"
  availability_zone       = "ap-south-1a"
  map_public_ip_on_launch = true
}

resource "aws_internet_gateway" "massx_igw" {
  vpc_id = aws_vpc.massx_vpc.id

  tags = {
    Name = "massx_igw"
  }
}

resource "aws_route_table" "massx_route_table" {
  vpc_id = aws_vpc.massx_vpc.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.massx_igw.id
  }

  tags = {
    Name = "massx_route_table"
  }
}

resource "aws_route_table_association" "massx_rta" {
  subnet_id      = aws_subnet.massx_subnet.id
  route_table_id = aws_route_table.massx_route_table.id
}
resource "aws_security_group" "massx_sg" {
  vpc_id = aws_vpc.massx_vpc.id

  ingress {
    from_port   = 6443
    to_port     = 6443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 10250
    to_port     = 10250
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 10251
    to_port     = 10252
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "massx_sg"
  }
}


resource "aws_instance" "master" {
  ami                    = "ami-078264b8ba71bc45e"
  instance_type          = "t2.nano"
  subnet_id              = aws_subnet.massx_subnet.id
  vpc_security_group_ids = [aws_security_group.massx_sg.id] # Using security group ID

  tags = {
    Name = "massx_master"
  }
}

resource "aws_instance" "worker1" {
  ami                    = "ami-078264b8ba71bc45e"
  instance_type          = "t2.small"
  subnet_id              = aws_subnet.massx_subnet.id
  vpc_security_group_ids = [aws_security_group.massx_sg.id] # Using security group ID

  tags = {
    Name = "massx_worker1"
  }
}

resource "aws_instance" "worker2" {
  ami                    = "ami-078264b8ba71bc45e"
  instance_type          = "t2.medium"
  subnet_id              = aws_subnet.massx_subnet.id
  vpc_security_group_ids = [aws_security_group.massx_sg.id] # Using security group ID

  tags = {
    Name = "massx_worker2"
  }
}
