const { displayHandler } = require("../graphing/displayHandler");
const { PiWrapper } = require("../interface/PiWrapper");


const Pi = new PiWrapper();
Pi.addListener('incomingData', (incomingData) => {
  //console.log("Heard:", incomingData);
  displayHandler("accel", incomingData);
});

// Pi.addListener('message', (message) => {
//   console.log(new Buffer(message).toString());
// });
