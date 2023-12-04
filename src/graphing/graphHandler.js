const Dygraph = require('dygraphs');

const defaultColors = ["#FF4136", "#2ECC40", "#0074D9", "#FF851B", "#FFDC00", "#39CCCC", "#F012BE", "#b94b80", "#3D9970", "#1e7b1e", "#FF6F61", "#6b6ece", "#7FDBFF", "#B10DC9", "#FF4136", "#01FF70"];

let options = {
  colors: defaultColors,
};

let data = {
  gyro: [[0,0,0,0]],
  accel: [[0,0,0,0]],
};
let graphs = {};

const XWIDTH = 4;
let XMin = -1;

const createGraphs = () => {
  const accelLoader = document.getElementById("accelDataGraph");
  const gyroLoader = document.getElementById("gyroDataGraph");

  graphs.accel = new Dygraph(accelLoader, data.accel, options);
  graphs.gyro = new Dygraph(gyroLoader, data.gyro, options);
}

let deltaTime = -1;
let lastTime = -1;
let numElements = -1;

const appendData = (newData) => {
  let keys = ["accel", "gyro"];
  let time = newData["time"] / 1000.0;

  keys.forEach(key => {
    data[key].push(
      [
        time,
        newData[key]["X"],
        newData[key]["Y"],
        newData[key]["Z"],
      ]
    );

    // Only keep the necessary number of elements in the array
    if(data[key].length > numElements)
    {
      data[key].shift();
    }
  
    XMin = time - XWIDTH;
    graphs[key].updateOptions( { 'file': data[key], "dateWindow": [XMin, time] } );
  });

  if (lastTime === -1) {
    lastTime = time;
  } else if (deltaTime === -1) {
    deltaTime = time - lastTime;
    numElements = (XWIDTH / deltaTime) + 1;
  }
}

module.exports = {
  createGraphs:createGraphs,
  appendData:appendData
}