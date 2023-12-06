const { displayHandler } = require("../graphing/displayHandler");
const { createGraphs, appendData } = require("../graphing/graphHandler");
const { ClientWrapper, connectionStates, commandKeys } = require("../interface/ClientWrapper");


const Pi = new ClientWrapper();
Pi.addListener('incomingData', (incomingData) => {
  // console.log("Heard:", incomingData);
  displayHandler("accel", incomingData);
  displayHandler("gyro", incomingData);

  appendData(incomingData);
});

Pi.addListener(commandKeys.PrintDataDir, (commandData) => {
  console.log("command response", commandData);
});

// Pi.addListener('message', (message) => {
//   console.log("Heard:", message);
// });

Pi.addListener('connectionChange', (connectionStatus) => {
  console.log(connectionStatus);
  document.getElementById('connectionStatusText').innerText = connectionStatus;
  const connectionButton = document.getElementById('connectionButton');

  if(connectionStatus === 'Connected')
  {
    connectionButton.innerText = "Disconnect";
    connectionButton.classList.remove("connect");
    connectionButton.classList.add("disconnect");

    
  } else if(connectionStatus === 'Disconnected') {
    connectionButton.innerText = "Connect";
    connectionButton.classList.add("connect");
    connectionButton.classList.remove("disconnect");
  }
});

connectionButton.addEventListener('click', () => {
  if(Pi.connectionStatus === connectionStates.Connected)
  {
    Pi.disconnect();
  }
  else
  {
    Pi.connect();
  }
});

createGraphs();

// Pi.addListener('message', (message) => {
//   console.log(new Buffer(message).toString());
// });
