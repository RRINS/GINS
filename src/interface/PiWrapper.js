//Purpose: Set up JavaScript to run the Python scripts to interface with the Labjack

const EventEmitter = require('events');
const net = require('net');

class PiWrapper extends EventEmitter
{
  constructor()  //intialize the python script and message event listeners
  {
    super() // Call ctor of superclass (EventEmitter)

    this.server = net.createServer();

    this.server.listen(9000, '169.254.174.132', () => {    
      console.log('server listening to %j', this.server.address());  
    });

    this.server.on('connection', (conn) => {
      var remoteAddress = conn.remoteAddress + ':' + conn.remotePort;  
      console.log('new client connection from %s', remoteAddress);

      conn.on('data', onConnData);  
      conn.once('close', onConnClose);  
      conn.on('error', onConnError);
      function onConnData(d) {  
        console.log('connection data from %s: %s', remoteAddress, Buffer(d).toString()); 
        conn.write(d);  
      }
      function onConnClose() {  
        console.log('connection from %s closed', remoteAddress);  
      }
      function onConnError(err) {  
        console.log('Connection %s error: %s', remoteAddress, err.message);  
      } 
    });

    // this.init();
  }

  /**
   * @deprecated
   * 
   * Not depreciated, but should not be used
   * publicly. Is called in the constructor, more calls
   * will result in undesirable behavior.
   */
  init()
  {
    let self = this;

    self.pyshell = new PythonShell(this.script, this.options);   //initalize using the full script path and options

    //When Python sends a message using "print()"
    self.pyshell.on('message', function(message) {
      console.log("Raw Message:", message);

      try {
        self.incomingData = JSON.parse(message.split("\'").join('\"')); //replace single quotes with doubles so JSON can be parsed properly

        if(self.incomingData["CONNECTION"] != undefined){
          self.connection = self.incomingData["CONNECTION"];  //if incoming data has a connection parameter
          self.emit('connectionUpdate', self.connection, self.incomingData["HANDLE"], self.incomingData["INFO"]);     // Allow external processes to react to connection state.
        }

        self.emit('message', self.incomingData);  // Pass JSON-formatted data to driver
      
      } catch (err) {
        //console.log(`Error: ${err} \nRaw Data: ${message}`); // In case the Python Code spits out an error instead of JSON Formatted stuff.
      }
    });

    //If script throws an error
    self.pyshell.on('stderr', function(stderr) {
      console.log(stderr);
      self.connection = connectionStates.Undefined;
      self.emit("connectionUpdate", self.connection);

      self.emit('stderr', stderr);  // Pass pyshell err to Driver
    });
  }

}

module.exports = {
  PiWrapper:PiWrapper
};