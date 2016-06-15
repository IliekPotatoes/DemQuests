var canvas = document.getElementById("canvas");
var canvasContainer = document.getElementById("canvas-container");
canvas.width = canvasContainer.offsetWidth;
canvas.height = canvasContainer.offsetHeight;

var ctx = canvas.getContext("2d");

var appState = {
  clouds: []
};

var updateObjects = function() {
  for (var i in appState.clouds) {
    appState.clouds[i].x += 1 * appState.clouds[i].speed;
    if (appState.clouds[i].x > canvas.width) {
      appState.clouds[i].x = 0 - appState.clouds[i].width;
    }
  }
};

var render = function() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  var numClouds = appState.clouds.length;
  for (var i=0; i<numClouds; i++) {
    ctx.fillStyle = "rgba(255,255,255,0.4)";
    ctx.fillRect(appState.clouds[i].x,
                 appState.clouds[i].y,
                 appState.clouds[i].width,
                 appState.clouds[i].height);
  }
};

var appLoop = function() {
  updateObjects();
  render();
  window.requestAnimationFrame(appLoop);
};

var init = function() {
  // create resize events
  window.addEventListener("resize", function() {
    canvas.width = canvasContainer.offsetWidth;
    canvas.height = canvasContainer.offsetHeight;
  });
  // create clouds
  var numClouds = Math.round(650);
  for (var i=0; i<numClouds; i++) {
    appState.clouds.push({
      x: canvas.width * Math.random(),
      y: 200 * Math.random(),
      width: (100 * Math.random()),
      height: (50 * Math.random()),
      speed: (10 * Math.random())
    });
  }
  appLoop();
};

init();