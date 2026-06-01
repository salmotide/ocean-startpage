const pixelCharacter = document.getElementById("pixel-character");

const characterState = {
  PLAYER: "player",
  FOLLOW: "follow",
  NPC: "npc"
};

let currentState = characterState.NPC;

let lastPlayerMoveTime = Date.now();

document.addEventListener("mousemove", (event) => {
  mouseX = event.clientX;
  mouseY = event.clientY;
});

const sprites = {
  idle: {
    up: "image/hatsu/idleb.gif",
    down: "image/hatsu/idlef.gif",
    left: "image/hatsu/idlel.gif",
    right: "image/hatsu/idler.gif"
  },
  run: {
    up: "image/hatsu/runb.gif",
    down: "image/hatsu/runf.gif",
    left: "image/hatsu/runl.gif",
    right: "image/hatsu/runr.gif"
  },
  click: "image/hatsu/click.gif"
};

let posX = window.innerWidth / 2;
let posY = window.innerHeight - 120;

let mouseX = posX;
let mouseY = posY;

let speed = 6;
let direction = "down";

const keys = {
  up: false,
  down: false,
  left: false,
  right: false
};

let customKeys = JSON.parse(localStorage.getItem("characterKeys")) || {
  up: "w",
  down: "s",
  left: "a",
  right: "d",
  action: "e",
};

const keyUpInput = document.getElementById("key-up");
const keyDownInput = document.getElementById("key-down");
const keyLeftInput = document.getElementById("key-left");
const keyRightInput = document.getElementById("key-right");
const saveKeysButton = document.getElementById("save-character-keys");
const keyActionInput = document.getElementById("key-action");

keyUpInput.value = customKeys.up;
keyDownInput.value = customKeys.down;
keyLeftInput.value = customKeys.left;
keyRightInput.value = customKeys.right;
keyActionInput.value = customKeys.action;

saveKeysButton.addEventListener("click", () => {
  customKeys = {
    up: keyUpInput.value.toLowerCase() || "w",
    down: keyDownInput.value.toLowerCase() || "s",
    left: keyLeftInput.value.toLowerCase() || "a",
    right: keyRightInput.value.toLowerCase() || "d",
    action: keyActionInput.value.toLowerCase() || "e",
  };

  localStorage.setItem("characterKeys", JSON.stringify(customKeys));
});

const characterBubble = document.getElementById("character-bubble");

const encouragementTexts = [
  "Semangat, salmotide.",
  "Satu langkah kecil dulu.",
  "Jangan menyerah sekarang.",
  "Aku masih di sini.",
  "Pelan-pelan juga tetap maju.",
  "Kita bereskan satu per satu.",
  "Hari ini cukup mulai saja."
];

function showBubble() {
  const text = encouragementTexts[
    Math.floor(Math.random() * encouragementTexts.length)
  ];

  characterBubble.textContent = text;
  characterBubble.classList.add("active");

  setTimeout(() => {
    characterBubble.classList.remove("active");
  }, 3000);
}

function updateBubblePosition() {
  characterBubble.style.left = `${posX - 20}px`;
  characterBubble.style.top = `${posY - 48}px`;
}

function updatePosition() {
  pixelCharacter.style.left = `${posX}px`;
  pixelCharacter.style.top = `${posY}px`;
  updateBubblePosition();
  updateInteractHint();
}

const interactHint = document.getElementById("interact-hint");


function getCharacterRect() {
  return pixelCharacter.getBoundingClientRect();
}

function isNearElement(element) {
  const char = getCharacterRect();
  const target = element.getBoundingClientRect();

  const charX = char.left + char.width / 2;
  const charY = char.top + char.height / 2;

  return (
    charX >= target.left &&
    charX <= target.right &&
    charY >= target.top &&
    charY <= target.bottom
  );
}

function actionClickNearby() {
  const interactables = document.querySelectorAll(
    "button, a, input, textarea, select"
  );

  for (const element of interactables) {
    if (element === pixelCharacter) continue;

    if (isNearElement(element, 0)) {
      pixelCharacter.src = sprites.click;

      if (
        element.tagName === "INPUT" ||
        element.tagName === "TEXTAREA" ||
        element.tagName === "SELECT"
      ) {
        element.focus();
      } else {
        element.click();
      }

      setTimeout(() => {
        setSprite("idle", direction);
      }, 600);

      break;
    }
  }
}

function getNearbyElement() {
  const interactables = document.querySelectorAll(
    "button, a, input, textarea, select"
  );

  for (const element of interactables) {
    if (isNearElement(element, 0)) {
      return element;
    }
  }

  return null;
}

function updateInteractHint() {
  const nearby = getNearbyElement();

  if (nearby) {
    interactHint.style.opacity = "1";
    interactHint.style.left = `${posX + 20}px`;
    interactHint.style.top = `${posY - 28}px`;
    interactHint.textContent = customKeys.action.toUpperCase();
  } else {
    interactHint.style.opacity = "0";
  }
}

function setSprite(type, dir) {
  const nextSprite = sprites[type][dir];

  if (pixelCharacter.src.includes(nextSprite)) return;

  pixelCharacter.src = nextSprite;
}

function moveCharacter() {
  let moving = false;

  if (currentState === characterState.FOLLOW) {
  const dx = mouseX - posX;
  const dy = mouseY - posY;

  if (Math.abs(dx) > Math.abs(dy)) {
    direction = dx > 0 ? "right" : "left";
  } else {
    direction = dy > 0 ? "down" : "up";
  }

  if (Math.abs(dx) > 20 || Math.abs(dy) > 80) {
    posX += dx * 0.025;
    posY += dy * 0.025;
    moving = true;
  }
}

  if (autoMove && currentState === characterState.NPC) {

  const dx = targetX - posX;
  const dy = targetY - posY;

  if (Math.abs(dx) > Math.abs(dy)) {
    direction = dx > 0 ? "right" : "left";
  }  else {
    direction = dy > 0 ? "down" : "up";
  }

  posX += dx * 0.02;
  posY += dy * 0.02;

  if (Math.abs(dx) > 1) {
    moving = true;
  }

  if (Math.abs(dy) > 1) {
    moving = true;
  }

  if (
    Math.abs(dx) < 2 &&
    Math.abs(dy) < 2
  ) {
    autoMove = false;
  }
}
  if (keys.up) {
    posY -= speed;
    direction = "up";
    moving = true;
  }

  if (keys.down) {
    posY += speed;
    direction = "down";
    moving = true;
  }

  if (keys.left) {
    posX -= speed;
    direction = "left";
    moving = true;
  }

  if (keys.right) {
    posX += speed;
    direction = "right";
    moving = true;
  }

  posX = Math.max(0, Math.min(window.innerWidth - 64, posX));
  posY = Math.max(72, Math.min(window.innerHeight - 64, posY));

  if (moving) {
    setSprite("run", direction);
  } else {
    setSprite("idle", direction);
  }

  updatePosition();
  requestAnimationFrame(moveCharacter);
}

document.addEventListener("keydown", (event) => {
  const activeElement = document.activeElement;
  const isTyping =
    activeElement.tagName === "INPUT" ||
    activeElement.tagName === "TEXTAREA" ||
    activeElement.tagName === "SELECT";
  
  if (event.key === "Escape") {
    document.activeElement.blur();
    return;
  }

  const key = event.key.toLowerCase();

  if (isTyping) {
    return;
  }

  if (key === customKeys.action) {
    event.preventDefault();
    actionClickNearby();
    return;
  }

  if (
  key === customKeys.up ||
  key === customKeys.down ||
  key === customKeys.left ||
  key === customKeys.right
) {
  currentState = characterState.PLAYER;

  autoMove = false;
  targetX = posX;
  targetY = posY;

  lastPlayerMoveTime = Date.now();
}

  if (key === customKeys.up) keys.up = true;
  if (key === customKeys.down) keys.down = true;
  if (key === customKeys.left) keys.left = true;
  if (key === customKeys.right) keys.right = true;
});

document.addEventListener("keyup", (event) => {
  const key = event.key.toLowerCase();

if (key === customKeys.up) keys.up = false;
if (key === customKeys.down) keys.down = false;
if (key === customKeys.left) keys.left = false;
if (key === customKeys.right) keys.right = false;

if (
  !keys.up &&
  !keys.down &&
  !keys.left &&
  !keys.right &&
  currentState === characterState.PLAYER
) {
  currentState = characterState.NPC;
}});

pixelCharacter.addEventListener("click", () => {

  currentState =
    currentState === characterState.FOLLOW
      ? characterState.NPC
      : characterState.FOLLOW;

  autoMove = false;
  targetX = posX;
  targetY = posY;

  characterBubble.textContent =
    currentState === characterState.FOLLOW
      ? "Aku mengikutimu!"
      : "Aku akan berjalan sendiri.";

  characterBubble.classList.add("active");

  setTimeout(() => {
    characterBubble.classList.remove("active");
  }, 2000);

});

let autoMove = false;
let targetX = posX;
let targetY = posY;

setSprite("idle", "down");
updatePosition();
moveCharacter();

setInterval(() => {

  const isPlayerMoving =
    keys.up ||
    keys.down ||
    keys.left ||
    keys.right;

  const timeSincePlayerMove =
    Date.now() - lastPlayerMoveTime;

  if (
    currentState !== characterState.NPC ||
    isPlayerMoving ||
    timeSincePlayerMove < 5000
  ) {
    return;
  }

  autoMove = true;

  targetX = posX + (Math.random() * 300 - 150);
  targetY = posY + (Math.random() * 150 - 75);

  targetX = Math.max(
    0,
    Math.min(window.innerWidth - 64, targetX)
  );

  targetY = Math.max(
    72,
    Math.min(window.innerHeight - 64, targetY)
  );

}, 8000);

setInterval(() => {
  const isMoving =
    keys.up ||
    keys.down ||
    keys.left ||
    keys.right;

  if (!isMoving) {
    showBubble();
  }
}, 12000);
