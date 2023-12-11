import {
  incrementCustomProperty,
  setCustomProperty,
  getCustomProperty,
} from "../helpers/updateCustomProperty";

const SPEED = 0.05;
const CACTUS_INTERVAL_MIN = 500;
const CACTUS_INTERVAL_MAX = 2000;

const worldElem = document.querySelector("[data-world");

let nextCactusTime;

export function setupCactus() {
  nextCactusTime = CACTUS_INTERVAL_MIN;
  document.querySelectorAll("[data-cactus]").forEach((cactus) => {
    cactus.remove();
  });
}

export function updateCactus(delta, speedScale) {
  document.querySelectorAll("[data-cactus]").forEach((cactus) => {
    incrementCustomProperty(cactus, "--left", delta * speedScale * SPEED * -1);

    if (getCustomProperty(cactus, "--left") <= -100) cactus.remove();
  });

  if (nextCactusTime <= 0) {
    createCactus();
    nextCactusTime =
      randomCactusGen(CACTUS_INTERVAL_MIN, CACTUS_INTERVAL_MAX) / speedScale;
  }

  nextCactusTime -= delta;
}

export function getAllCactus() {
  return [...document.querySelectorAll("[data-cactus]")].map((cactus) =>
    cactus.getBoundingClientRect()
  );
}

function createCactus() {
  const cactusElem = document.createElement("img");
  cactusElem.dataset.cactus = true;
  cactusElem.src = "cactus.png";
  cactusElem.classList.add("cactus");
  setCustomProperty(cactusElem, "--left", 100);
  worldElem.append(cactusElem);
}

function randomCactusGen(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
