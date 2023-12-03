//Purpose: Set up JavaScript to run the Python scripts to interface with the Labjack

const EventEmitter = require('events');

class PiWrapper extends EventEmitter
{
  constructor(fullPath, shellOptions)  //intialize the python script and message event listeners
  {
    super() // Call ctor of superclass (EventEmitter)

    this.script = fullPath;
    this.options = shellOptions;

    this.connect = this.connectSmart.bind(this);
    this.disconnect = this.disconnectSmart.bind(this);
    this.destroy = this.destroy.bind(this);

    this.incomingData;

    this.connection = -1; //undetermined disconnected state
    
    this.init();
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
  LJWrapper:LJWrapper
};