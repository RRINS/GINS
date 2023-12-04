//Purpose: Set up JavaScript to run the Python scripts to interface with the Labjack

const EventEmitter = require('events');
const net = require('net');

let connectionStates = {
  Disconnected: 0,
  Connected: 1,
  Attempting_Connection: 2,
  Attempting_Disconnection: 3,

  Undefined: 4,
}

class PiWrapper extends EventEmitter
{
  constructor()  //intialize the python script and message event listeners
  {
    super() // Call ctor of superclass (EventEmitter)

    this.client = new net.Socket();
    this.client.on('error', (error) => {
      console.log("Error Occured:", error);
      this.client.destroy();
      this.setConnection(connectionStates.Disconnected);
    });

    this.connect = this.connect.bind(this);
    this.disconnect = this.disconnect.bind(this);
    this.setConnection = this.setConnection.bind(this);
    this.setConnection(connectionStates.Disconnected);

    this.connect();
  }

  connect()
  {
    let self = this;

    if (self.connectionStatus !== connectionStates.Connected)
    {
      self.setConnection(connectionStates.Attempting_Connection);
      self.client.connect(9001, '169.254.26.252', () => {
          self.setConnection(connectionStates.Connected);
          self.client.write('Hello, server! Love, Client.');

          self.client.on('data', (data) => {
            // console.log('Received: ' + data);
            try {
              let incomingData = JSON.parse(data);
              self.emit('incomingData', incomingData);
            } catch(err) {
              self.emit('message', data);
            }
          });
      
          self.client.on('close', () => {
            console.log('Connection closed');
            self.setConnection(connectionStates.Disconnected);
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
      self.setConnection(connectionStates.Attempting_Disconnection);
      try {
        self.client.destroy();
        self.setConnection(connectionStates.Disconnected);
      } catch (err) {
        self.setConnection(connectionStates.Undefined);
      }
    }
  }

  setConnection(connectionState)
  {
    let self = this;

    self.connectionStatus = connectionState;
    const connectionStrings = Object.keys(connectionStates);
    self.emit('connectionChange', connectionStrings[connectionState]);
  }
}

module.exports = {
  PiWrapper:PiWrapper
};