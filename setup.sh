sudo apt-get update -y || sudo yum update -y

if ! command -v git &> /dev/null
then
    echo "Installing Git..."
    sudo apt-get install git -y || sudo yum install git -y
else
    echo "Git is already installed."
fi

if ! command -v docker &> /dev/null
then
    echo "Installing Docker..."
    sudo apt-get install docker.io -y || sudo yum install docker -y
    sudo systemctl start docker
    sudo systemctl enable docker
else
    echo "Docker is already installed."
fi

if ! command -v kubeadm &> /dev/null
then
	echo "Installing kubeadm with kubelet"
	sudo apt-get install -y apt-transport-https ca-certificates curl gpg
	curl -fsSL https://pkgs.k8s.io/core:/stable:/v1.31/deb/Release.key | sudo gpg --dearmor -o /etc/apt/keyrings/kubernetes-apt-keyring.gpg
	echo 'deb [signed-by=/etc/apt/keyrings/kubernetes-apt-keyring.gpg] https://pkgs.k8s.io/core:/stable:/v1.31/deb/ /' | sudo tee /etc/apt/sources.list.d/kubernetes.list
	sudo apt-get install -y kubelet kubeadm kubectl
	sudo systemctl enable --now kubelet

else
	echo "Kubeadm and kubelet is installed"


echo "Version installed"
git --version
kubectl version --client
kubeadm version

