# Setting Up Wired Interface On Ubuntu Server 

## RTL8125

1. find network interface with `sudo lshw -class network`
  - `lshw` stands for list hardware
  - `network` lists the network interfaces
2. check if hardware is linked with `ip address`
3. if not, search for driver tarball, extract, and run script
4. check if the module is loaded with `lsmod | grep "your module"`
  - drivers may be built as kernel modules inserted at runtime
5. repeat step 2
6. if the link is down, run `sudo ip link set "your interface" up`
7. set the ip address with `ifconfig "your interface" "the IP address of your machine"
8. configure the nameserver by adding `nameserver "the IP address of your DNS"` in `/etc/resolv.conf`
  - the IP address of a DNS can be found on a connected Windows machine by running `ipconfig /all`
  - `etc` contains configuration files
    -`resolv.conf` contains DNS resolver configuration
9. add the default gateway of your network to the IP routing table with `route add default gw "the IP address of your gateway"
  - the gateway enables the DNS to communitcate with the outside network
  - the address of the gateway may be the same as the DNS with modern routers
  - the address of your default gateway can be found also with `ipconfig /all` on a connected Windows machine

