# tcpdump

## Output

- Timestamp
- Protocol
  - usually IP or IP6
- Source
- Destination
  - usually your machine

# Interfaces `-i`

- ethernet `eth0` or `eth1`
- wireless `wlan0`

# Host

- `host`
  - two way parameter
- `src`/`dst`
  - sniffs packets where argument is the source/destination
  

## TCP (transmission control protocol)

- reliable (as opposed to User Datagram Protocol or UDP)

## RDNS

- allows you to search domain name and receive IP address

## OSI (Open Systems Interconnection) Model

- standardization
  - rules for the implementation of a protocol that we must comply with
- layers of the OSI are assigned certain tasks

|number     | unit      |name           |
|-----------|-----------|---------------|
| 7         |data       |application    |
| 6         |data       |presentation   |
| 5         |data       |session        |
| 4         |segments   |transport      |
| 3         |packets    |network        |
| 2         |frames     |data link      |
| 1         |bits       |physical       |

- each layer has its own standard, independent of other layers

7. application layer

  - the top layer is the OSI model's direct connection to app functionality

6. presentation layer

  - this layer formats the data to be sent
  - headers added to specify format
  
5. session layer (connection layer)

4. transportation layer

  - packet receives a transport header
  - ports are defined, these ports control applications
