# `ip a`

## IP Addresses
### Classless Inter-Domain Routing (CIDR) notation
- notice how IP addresses are made up of 8 bits between `.`'s
  - the numbers after slashes are multiples of 8, representing how many bits are allocated for the network prefix.
    - e.g., `192.168.1.0/24`, refers to the hosts from `192.168.1.0` to `192.168.1.255` 
- `192.168` addresses are assigned by the DHCP (router)
- `169.254` addresses are self-assigned when a DHCP server cannot be found
- every device connected to the router has the same public ip but different private ip

## Interfaces
- `lo` stands for loopback, which tests network cards

## Scope

`scope link` - can be used only within a LAN

`mtu` - maximum transfer unit