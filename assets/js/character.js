const pixelCharacter = document.getElementById("pixel-character");

const sprites = {
  idle: {
    up: "image/hatsu/idleb.gif",
    down: "image/hatsu/idlef.gif",
    left: "image/hatsu/idlel.gif",
    right: "image/hatsu/idler.gif",
  },
  run: {
    up: "image/hatsu/runb.gif",
    down: "image/hatsu/runf.gif",
    left: "image/hatsu/runl.gif",
    right: "image/hatsu/runr.gif",
  },
  click: "image/hatsu/click.gif"
};

let posX = window.innerWidth / 2;
let posY = window.innerHeight - 120;
let speed = 6;
let direction = "down";

const keys = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowLeft: false,
  ArrowRight: false,
  w: false,
  a: false,
  s: false,
  d: false,
};

function updatePosition() {
  pixelCharacter.style.left = `${posX}px`
  pixelCharacter.style.top = `${posY}px`
}

function setSprite(type, dir) {
  const nextSprite = sprites[type][dir];

  if (pixelCharacter.src.includes(nextSprite)) return;

  pixelCharacter.src = nextSprite;
}

function moveCharacter() {
  let moving = false;

  if (keys.ArrowUp || keys.w) {
    posY -= speed;
    direction = "up";
    moving = true;
  }

  if (keys.ArrowDown || keys.s) {
    posY += speed;
    direction = "down";
    moving = true;
  }

  if (keys.ArrowLeft || keys.a) {
    posX -= speed;
    direction = "left";
    moving = true;
  }

  if (keys.ArrowRight || keys.d) {
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
  if (event.key in keys) {
    keys[event.key] = true;
  }
});

document.addEventListener("keyup", (event) => {
  if (event.key in keys) {
    keys[event.key] = false;
  }
});

pixelCharacter.addEventListener("click", () => {
  pixelCharacter.src = sprites.click;

  setTimeout(() => {
    setSprite("idle", direction);
  }, 600;
});

setSprite("idle", "down");
updatePosition();
moveCharacter();
