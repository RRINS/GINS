const Dygraph = require('dygraphs');

let data = [
  [0, 0, 0, 0]
];

let options = {
  xlabel: 'Time',
  ylabel: 'Acceleration (g)'
};

const XWIDTH = 6 * 1000;
let XMin = -1;

let graph = null;

const createGraphs = () => {
  const loader = document.getElementById("accelDataGraph");

  graph = new Dygraph(loader, data, options);
}

const appendData = (newData) => {
  data.push(
    [
      newData["time"],
      newData["accel"]["X"],
      newData["accel"]["Y"],
      newData["accel"]["Z"],
    ]
  );

  XMin = newData["time"] - XWIDTH;
  graph.updateOptions( { 'file': data, "dateWindow": [XMin, newData["time"]] } );
}

module.exports = {
  createGraphs:createGraphs,
  appendData:appendData
}