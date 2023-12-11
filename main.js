import { setupGround, updateGround } from "./components/ground";
import { setupDino, updateDino, getDinoBounds, setDinoLose } from "./components/dino";
import { setupCactus, updateCactus, getAllCactus } from "./components/cactus";

const WORLD_WIDTH = 100;
const WORLD_HEIGHT = 30;
const SPEED_SCALE_INCREASE = 0.00001;

const worldElem = document.querySelector("[data-world");
const scoreElem = document.querySelector("[data-score");
const startElem = document.querySelector("[data-start-screen");

setWorldScale();
window.addEventListener("resize", setWorldScale);
document.addEventListener("keydown", handleStart, { once: true });

// update loop
let lastTime;
let speedScale;
let score;
function update(time) {
  if (lastTime == null) {
    lastTime = time;
    window.requestAnimationFrame(update);
    return;
  }

  const delta = time - lastTime;
  updateGround(delta, speedScale);
  updateDino(delta, speedScale);
  updateCactus(delta, speedScale);
  updateSpeedScale(delta);
  updateScore(delta);
  if (checkLose()) return handleLose();

  lastTime = time;
  window.requestAnimationFrame(update);
}

function checkLose() {
  const dinoBounds = getDinoBounds();
  const cactusBounds = getAllCactus();

  return cactusBounds.some((cactus) => isCollision(cactus, dinoBounds));
}

function isCollision(rect1, rect2) {
  return (
    rect1.left < rect2.right &&
    rect1.top < rect2.bottom &&
    rect1.right > rect2.left &&
    rect1.bottom > rect2.top
  );
}

function updateSpeedScale(delta) {
  speedScale += delta * SPEED_SCALE_INCREASE;
}

function updateScore(delta) {
  score += delta * 0.01;
  scoreElem.textContent = Math.round(score);
}

function handleStart() {
  lastTime = null;
  speedScale = 1;
  score = 0;
  setupGround();
  setupDino();
  setupCactus();
  startElem.classList.add("hide");
  window.requestAnimationFrame(update);
}

function handleLose() {
  setDinoLose();
  setTimeout(() => {
    document.addEventListener("keydown", handleStart, { once: true });
    startElem.classList.remove("hide");
  }, 200);
}

function setWorldScale() {
  let scale;

  if (window.innerWidth / window.innerHeight < WORLD_WIDTH / WORLD_HEIGHT)
    scale = window.innerWidth / WORLD_WIDTH;
  else scale = window.innerHeight / WORLD_HEIGHT;

  worldElem.style.width = `${WORLD_WIDTH * scale}px`;
  worldElem.style.height = `${WORLD_HEIGHT * scale}px`;
}
