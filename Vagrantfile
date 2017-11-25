
# -*- mode: ruby -*-
# vi: set ft=ruby :
VAGRANTFILE_API_VERSION = "2"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|

  config.vm.box = "ubuntu/trusty64"
  config.vm.provider "virtualbox" do |v|
    v.memory = 1024
  end
  #config.vm.define "img-panda"   #name of machine 1
  #config.vm.define "smart-panda" #name of machine 2
  config.vm.provision "ansible" do |ansible|
    ansible.groups = {
      "base" => ["img-panda","smart-panda"]
    }
    ansible.playbook = "base.yml"
    # ansible.inventory_path = "dev" # no need for path to ansible inventory since vagrant ill creat it
    ansible.host_key_checking = false
    ansible.extra_vars = { 'ansible_connection' => 'ssh',
                           'ansible_ssh_args' => '-o ForwardAgent=yes'
                      	 }
    ansible.raw_ssh_args = ['-o UserKnownHostsFile=/dev/null', '-o StrictHostKeyChecking=false']
  end

  config.ssh.forward_agent = true
  config.vm.network "public_network", bridge:"enp8s0", type: "dhcp"

  # Create a base machine 
  config.vm.define "img-panda" do |imgpanda|
   imgpanda.vm.network :forwarded_port, host: 8080, guest: 8080,
    auto_correct: true
  end

  config.vm.define "smart-panda" do |smartpanda|
   smartpanda.vm.network :forwarded_port, host: 8081, guest: 8080,
    auto_correct: true
  end
end
