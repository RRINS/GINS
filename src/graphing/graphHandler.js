const Dygraph = require('dygraphs');

let data = [
  [0, 0, 0, 0]
];

const defaultColors = ["#FF4136", "#2ECC40", "#0074D9", "#FF851B", "#FFDC00", "#39CCCC", "#F012BE", "#b94b80", "#3D9970", "#1e7b1e", "#FF6F61", "#6b6ece", "#7FDBFF", "#B10DC9", "#FF4136", "#01FF70"];

let options = {
  colors: defaultColors,
};


const XWIDTH = 2;
let XMin = -1;

let graph = null;

const createGraphs = () => {
  const loader = document.getElementById("accelDataGraph");

  graph = new Dygraph(loader, data, options);
}

const appendData = (newData) => {
  let time = newData["time"] / 1000.0;

  data.push(
    [
      time,
      newData["accel"]["X"],
      newData["accel"]["Y"],
      newData["accel"]["Z"],
    ]
  );

  XMin = time - XWIDTH;
  graph.updateOptions( { 'file': data, "dateWindow": [XMin, time] } );
}

module.exports = {
  createGraphs:createGraphs,
  appendData:appendData
}