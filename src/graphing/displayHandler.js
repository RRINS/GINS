const displayHandler = (name, data) => {
  Object.keys(data[name]).forEach(dimension => {
    const element = document.getElementById(`${name}${dimension}`);
    element.innerText = data[name][dimension];
  });
}

module.exports = {
  displayHandler:displayHandler
}