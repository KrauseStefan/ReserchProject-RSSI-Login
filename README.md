ReserchProject-RSSI-Proximiti-detection
=========================

Proximiti-detection Method using RSSI of a Bluetooth Low Energy Device, with intention of authentication.

Handy commands, in genral BLE actions needs root premisions and both commands and node should be run with sudo.

The devices needs to be configured to use Bluetooth LE, this is done by running the command

`sudo hciconfig hci0 leadv` This gives the device the Peripherals role, and the device starts advertising BLE information.

`sudo hcitool -i hci1 lescan` This start a continuous scan for BLE devices.

If node is installed manyaly path might ned to be set for the root user, it can be done like this:
`PATH=\$PATH:/home/pi/node-v0.10.26-linux-arm-pi/bin`
`export PATH`

Run the data collector (from a ./data_collectoer)
`sudo node index.js | tee log.csv`

Run the test app (from ./testApp)
`sudo npm start`

Links with extra information
- Inside Bluetooth Low Energy: http://books.google.dk/books?id=-LMq0NhoEQgC&pg=PA358&lpg=PA358&dq=EnableGatt&source=bl&ots=AXu2znOEUw&sig=PjvPAADd4H3WInDAEFszw1MALr8&hl=da&sa=X&ei=uilyU6biJIz6yAOH914CQCg&ved=0CIsBEOgBMAk#v=onepage&q=EnableGatt&f=false
- Node.js install guide on Raspberry Pi - http://joshondesign.com/2013/10/23/noderpi
