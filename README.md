###################################################3
# Author: Niv Asher nivasher@gmail.com 054-6417008

BigPanda mission Documantation of Big Panda Devops task 
-------------------------------------------------------


Architecture:
--------------
Hosting server which is Ubuntu 16.04.3 LTS with git and Vagrant 1.8.1, Ansible  2.4.1.0-1ppa~xenial and virtualbox-5.0
From this hosting server we will run Vagrant and Ansible and create the micro services.

How it works:
A Vagrant file named 'Vagrantfile' creates 2 VirtualBox instances and named them img-panda andsmart-panad, each running Ubuntu 14.04.5 LTS

The Vagrant file calls ansible playbook yml file named: base.yml

The absible yml file run 3 roles:

1) base_micro_services 
	- run on all machines (both img-panda & smart-panada machines)
	- Installspackages: nodejs npm

2) nodejs 
	- run on machine named img-panda
	- Copies the uploader file micro service files (nodejs) to the Vagrant folder inimg-panda machine
 	- Configure npm  local environment
        - install nodejs formidable packege which allow parsering.
        - checks that the nodejs http server is not already runinig and if does then kill it.
        - Run the micro service usinig nodejs http built in server.
        - To check this surf to http://localhost:8080/ and upload random file
        - Intall apache httpd server
        - Check that the ansible moved the uploaded files to apache folder: /var/www/html/resources
3) bamboo 
        - run on machine named smart-panada
	- Configure npm  local environment
        - Checks that the nodejs http server is not already runinig and if it does then kill it.
        - Run the micro service usinig nodejs http built in server. So now nodejs server run the micro service that count http request
        - To check this surf to http://localhost:8081/
        
Commands to run the project:
-----------------------------

vagtant up               # to execute the deployment of the the 2 mico services nodes.
vagrant globla-status    # show all Vagrant instances
vagrant ssh <machine id> # to ssh vagrant node

to run the ansible for recofigure:
ansible-playbook  -i .vagrant/provisioners/ansible/inventory/vagrant_ansible_inventory base.yml

to run specifi ansible role usinig tagging
 ansible-playbook --tags "bamboo_count_http_req" -i .vagrant/provisioners/ansible/inventory/vagrant_ansible_inventory base.yml 


Instalation of environment
-----------------------------

Install ubunto 16.04 that will host the 2 virtual macines.

apt-get install git

git clone --bare https://github.com/bigpandaio/devops-exercise

git clone https://github.com/bigpandaio/devops-exercise.git

apt-get install ansible

Vagrant
Installed ubuntu 16.04
https://atlas.hashicorp.com/search

vagrant support only virtual-box 5  # tried it (from ubuntu 16.04 with virtualbox 5.2 and it failed)

aptitude search virtualbox-5.0
aptitude install virtualbox-5.0

Vagrant commands to check that it works ok:
vagrant init hashicorp/precise64 #create the vagrant config file for ubuntu 12
vagrant up --provider=virtualbox # create ubuntu 12 machin above virtualbox
vagrant global-status  #to see the new machine you just created
vagrant ssh #to connect ot the machine
vagrant destroy
ansible-playbook -i .vagrant/provisioners/ansible/inventory/vagrant_ansible_inventory base.yml 


Notes:

- vistual-box version 5,2 didn;t work with Vagrant so I installed virualbox 5.0

- ignore_errors: yes for ansbile instaltion of the npm and nodejs packages

- Delete ssh keys for smooth ansible runninig: 
      vim ~/.ssh/known_hosts  # delete keys

- disable ssh keys checks by creating this file: (this is dengerous but it is must for ansible automation)

  vim  ~/.ssh/config
  Host *
    StrictHostKeyChecking no

 chmod 400 ~/.ssh/config

- I faced ansible connectivity problem so I changed the privat_netowrk to public in the Vagrant file.
Got prompt asking for nic name so I added bridge and nic config to the Vagrant file.
Remove the "ansible.inventory_path = "dev" file from the Vgrant file since it is DHCP so I can't know the ip in advnced and Vagrant create
the inventory file automatically.
 
- Added to ansible taks files:
	  become: yes 
  sinice insitaltion is posible only with sudo. The instaltion is using 'vagrant' user name by default (as configured).

Task source:
https://github.com/bigpandaio/devops-exercise

