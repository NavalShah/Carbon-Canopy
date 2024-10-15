const canvas = document.getElementById("display");
const ctx = canvas.getContext("2d");

ctx.imageSmoothingEnabled = false;

let width = window.innerWidth;
let height = window.innerHeight;

let keyPressed = {};
let keyDown = {};
let mouse = { x: 0, y: 0, clicked: false };

let objects = [];
let water = [];

let seedCount = 2;

let waterPouring = false;

let lastTime = 0;

function init() {
  canvas.width = width;
  canvas.height = height;

  document.addEventListener("keydown", e => {
    if (!keyPressed[e.key.toLowerCase()]) keyDown[e.key.toLowerCase()] = true;
    keyPressed[e.key.toLowerCase()] = true;
  });

  document.addEventListener("keyup", e => {
    keyPressed[e.key.toLowerCase()] = false;
  });

  document.addEventListener("mousedown", e => {
    mouse.clicked = true;
  });

  document.addEventListener("mouseup", e => {
    mouse.clicked = false;
  });

  canvas.addEventListener("mousemove", e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  objects.push(new Player());

  lastTime = performance.now();

  loop();
}

function loop() {
  let time = performance.now();
  let deltaTime = (time - lastTime) / 1000;
  lastTime = time;
  // dt in seconds

  ctx.clearRect(0, 0, width, height);

  ctx.drawImage(document.getElementById("bkg"), 0, 0, width, height);
  ctx.drawImage(document.getElementById("bowl"), width - 80, height - 60, 60, 45);
  ctx.drawImage(document.getElementById(waterPouring ? "lup" : "ldn"), 0, height - 80, 40, 40);

  renderUI({
    time, deltaTime
  });

  for (let i = 0; i < objects.length; i++) {
    objects[i].input(keyPressed, keyDown, mouse);
  }

  for (let i = 0; i < objects.length; i++) {
    objects[i].update(deltaTime);
  }

  for (let i = 0; i < objects.length; i++) {
    objects[i].draw(ctx);
  }

  for (let i = 0; i < water.length; i++) {
    water[i].update(deltaTime);
  }

  for (let i = 0; i < water.length; i++) {
    water[i].draw(ctx);
  }

  if (waterPouring) {
    water.push(new Droplet(Math.random() * width));
  }

  if (!waterPouring) {
    water = [];
  }

  keyDown = {};

  requestAnimationFrame(loop);
}

function renderUI(data) {
  if (keyPressed["i"])
    renderDiagnostics(data);

  document.getElementById("seeds").textContent = seedCount;
}

function renderDiagnostics(data) {
  ctx.textBaseline = "top";
  ctx.font = `20px monospace`;
  ctx.fillStyle = "white";
  ctx.fillText("FrameTime: " + (data.deltaTime * 1000).toFixed(2) + "ms", 0, 0);
}

document.addEventListener("DOMContentLoaded", init);