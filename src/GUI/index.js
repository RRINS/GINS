const { PiWrapper } = require("../interface/PiWrapper");

const Pi = new PiWrapper();
Pi.addListener('incomingData', (incomingData) => {
  console.log("Heard:", incomingData);
});
