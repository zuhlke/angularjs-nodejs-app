## Settung up a Production Environment

To set up a live environment with a load balancer, Node.Js instances and a MongoDB database we're using
**Vagrant** and **Chef** to provision the virtual machines.

In order to make this work you'll need the **vagrant-omnibus** and the **vagrant-vbguest** plugins installed. They
ensure that your bare virtual machines gets the latest version of **chef_solo** and the latter that your
VirtualBox Guest additions are up to date.

Install the plugins by running the following command:


```
# vagrant plugin install vagrant-omnibus
# vagrant plugin install vagrant-vbguest
```
### Adding more Chef dependencies

If you'll need to add more chef recipes use the following command:

```
# git submodule add https://github.com/opscode-cookbooks/rsyslog vagrant/cookbooks/rsyslog
```
