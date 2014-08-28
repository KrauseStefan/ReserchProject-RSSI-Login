ReserchProject-RSSI-Proximiti-detection
=========================

Proximiti-detection Method using RSSI of a Bluetooth Low Energy Device, with intention of authentication.

Code used

The devices needs to be configured to use Bluetooth LE, this is done by running the command 
‘sudo hciconfig hci0 leadv’


- Inside Bluetooth Low Energy: http://books.google.dk/books?id=-LMq0NhoEQgC&pg=PA358&lpg=PA358&dq=EnableGatt&source=bl&ots=AXu2znOEUw&sig=PjvPAADd4H3WInDAEFszw1MALr8&hl=da&sa=X&ei=uilyU6biJIz6yAOH914CQCg&ved=0CIsBEOgBMAk#v=onepage&q=EnableGatt&f=false
- Node.js install guide on Raspberry Pi - http://joshondesign.com/2013/10/23/noderpi



Root user needs PATH to be setup for node to run a BLE application:
`PATH=\$PATH:/home/pi/node-v0.10.26-linux-arm-pi/bin`
`export PATH`
`node <start BLE app>.js`
`sudo node index.js | tee log.csv`
