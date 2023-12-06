//Purpose: Set up JavaScript to run the Python scripts to interface with the Labjack

const EventEmitter = require('events');
const net = require('net');

const connectionStates = {
  Disconnected: 0,
  Connected: 1,
  Attempting_Connection: 2,
  Attempting_Disconnection: 3,

  Undefined: 4,
}

const commandKeys = {
  PrintDataDir: "PrintDataDir"
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
    this.client.on('data', (data) => {
      // console.log('Received: ' + data);
      let dataString = new Buffer(data).toString();
      let incomingData = null;

      try {
        incomingData = JSON.parse(dataString.split("\'").join('\"'));
      } catch(err) {
        // console.log(err);
        this.emit('message', dataString);
      }

      if(incomingData.command !== undefined) {
        this.emit(incomingData.command, incomingData);
      }
      else {
        this.emit('incomingData', incomingData);
      }
    });
    this.client.on('close', () => {
      this.client.destroy();
    });

    this.connect = this.connect.bind(this);
    this.disconnect = this.disconnect.bind(this);
    this.command = this.command.bind(this);
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
          self.client.write('Test');
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

  command(commandStr)
  {
    let self = this;
    self.client.write(commandStr);
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
  PiWrapper:PiWrapper,
  connectionStates:connectionStates,
  commandKeys:commandKeys
};