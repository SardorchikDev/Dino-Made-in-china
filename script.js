const dino = document.getElementById("dino");
const cactus = document.getElementById("cactus");
const scoreEl = document.getElementById("score");
const game = document.getElementById("game");

let y = 0;
let velocity = 0;
let gravity = 0.6;
let jumping = false;
let ducking = false;

let cactusX = 600;
let cactusHeight = 40;

let speed = 6;
let score = 0;
let night = false;

/* ===== INPUT ===== */
document.addEventListener("keydown", e => {
  if (e.code === "Space" || e.code === "ArrowUp") jump();
  if (e.code === "ArrowDown") duck(true);
});

document.addEventListener("keyup", e => {
  if (e.code === "ArrowDown") duck(false);
});

/* Mobile */
document.getElementById("jumpZone").addEventListener("touchstart", jump);
document.getElementById("duckZone").addEventListener("touchstart", () => duck(true));
document.getElementById("duckZone").addEventListener("touchend", () => duck(false));

function jump() {
  if (jumping || ducking) return;
  velocity = 12;
  jumping = true;
  dino.classList.remove("run");
}

function duck(state) {
  ducking = state;
  dino.classList.toggle("duck", state);
}

/* ===== GAME LOOP ===== */
function loop() {
  /* Jump physics */
  if (jumping) {
    y += velocity;
    velocity -= gravity;
    if (y <= 0) {
      y = 0;
      jumping = false;
      dino.classList.add("run");
    }
    dino.style.bottom = y + "px";
  }

  /* Cactus */
  cactusX -= speed;
  if (cactusX < -30) {
    cactusX = 600;
    cactusHeight = Math.random() > 0.5 ? 30 : 50;
    cactus.style.height = cactusHeight + "px";

    score++;
    scoreEl.textContent = score.toString().padStart(5, "0");

    speed += 0.15;

    /* Night mode */
    if (score % 10 === 0) {
      night = !night;
      game.classList.toggle("night", night);
    }
  }

  cactus.style.left = cactusX + "px";

  /* Collision */
  const hit =
    cactusX < 90 &&
    cactusX > 50 &&
    y < cactusHeight - (ducking ? 20 : 0);

  if (hit) {
    alert("Game Over");
    location.reload();
  }

  requestAnimationFrame(loop);
}

loop();
