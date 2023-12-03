//Purpose: Set up JavaScript to run the Python scripts to interface with the Labjack

const EventEmitter = require('events');
const net = require('net');

let connectionStates = {
  Disconnected: 0,
  Connected: 1,
  Attempting_Connection: 2,
  Attempting_Disconnection: 3,

  Undefined: -1,
}

class PiWrapper extends EventEmitter
{
  constructor()  //intialize the python script and message event listeners
  {
    super() // Call ctor of superclass (EventEmitter)

    this.client = new net.Socket();
    this.client.on('error', (error) => {
      // console.log("error occured", error);
      this.client.destroy();
      this.connectionStatus = connectionStates.Disconnected;
    });

    this.connect = this.connect.bind(this);
    this.disconnect = this.disconnect.bind(this);
    this.connectionStatus = connectionStates.Disconnected;

    this.connect();
  }

  connect()
  {
    let self = this;

    if (self.connectionStatus !== connectionStates.Connected)
    {
      self.connectionStatus = connectionStates.Attempting_Connection;
      self.client.connect(9001, '169.254.26.252', () => {
          console.log('Connected');
          self.connectionStatus = connectionStates.Connected;
          self.client.write('Hello, server! Love, Client.');

          self.client.on('data', (data) => {
            console.log('Received: ' + data);
      
            try {
              let incomingData = JSON.parse(data);
              self.emit('incomingData', incomingData);
            } catch(err) {
              // self.emit('message', data);
              console.log(data);
            }
          });
      
          self.client.on('close', () => {
            console.log('Connection closed');
            self.connectionStatus = connectionStates.Disconnected;
            self.client.destroy();
          });
      });
    }
    else
    {
      console.log("Already connected");
    }
  }

  disconnect()
  {
    let self = this;

    if (self.connectionStatus !== connectionStates.Disconnected)
    {
      self.connectionStatus = connectionStates.Attempting_Disconnection;
      try {
        self.client.destroy();
        self.connectionStatus = connectionStates.Disconnected;
      } catch (err) {
        self.connectionStatus = connectionStates.Undefined;
      }
    }
  }
}

module.exports = {
  PiWrapper:PiWrapper
};