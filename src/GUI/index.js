const { displayHandler } = require("../graphing/displayHandler");
const { createGraphs, appendData } = require("../graphing/graphHandler");
const { PiWrapper } = require("../interface/PiWrapper");


const Pi = new PiWrapper();
Pi.addListener('incomingData', (incomingData) => {
  //console.log("Heard:", incomingData);
  displayHandler("accel", incomingData);
  appendData(incomingData);
});

createGraphs();

// Pi.addListener('message', (message) => {
//   console.log(new Buffer(message).toString());
// });
