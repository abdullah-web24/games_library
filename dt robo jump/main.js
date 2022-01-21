"use strict";

const character = document.querySelector("#character");
const characterHeight = character.getBoundingClientRect().height;
const characterWidth = character.getBoundingClientRect().width;
const characterleft = character.getBoundingClientRect().left;
const characterOffsetLeft = characterleft + characterWidth;

const scoreEl = document.querySelector("#score");
const levelEl = document.querySelector("#level");
const startBtn = document.querySelector("#startBtn");
const playAgainBtn = document.querySelector("#playAgainBtn");
const main_banner = document.querySelector("#main_banner");
const game_over_banner = document.querySelector("#game_over_banner");
const score_cont = document.querySelector("#score_cont");

// ------- Obstakles -------
const obstakle_1 = {
  el: document.querySelector("#obstakle_1"),
  id: 0,
  movementX: 0,
  heightLimit: [80, 100, 120, 140, 170, 200],
  widthLimit: [80, 100, 120, 140, 170, 200],
  height: 50,
  width: 50,
  isStarted: false,
  isStartedCall: false,
  notStartedAnimate: false,
  isScoreCunted: false,
};
const obstakle_2 = {
  el: document.querySelector("#obstakle_2"),
  id: 1,
  movementX: 0,
  heightLimit: [80, 100, 120, 140, 170, 200],
  widthLimit: [80, 100, 120, 140, 170, 200],
  height: 50,
  width: 50,
  isStarted: false,
  isStartedCall: false,
  notStartedAnimate: true,
  isScoreCunted: false,
};

// ------------- Grass ------------
const grass_1 = {
  el: document.querySelector("#grass_1"),
  movementX: 0,
};
const grass_2 = {
  el: document.querySelector("#grass_2"),
  movementX: -innerWidth,
};

// ------------- Tree ------------
const tree_1 = {
  el: document.querySelector("#tree_1"),
  movementX: innerWidth * 0.1,
  heightWidthLimit: [100, 130, 150, 180, 200, 220, 240, 260],
  height: 100,
  width: 100,
};
const tree_2 = {
  el: document.querySelector("#tree_2"),
  movementX: innerWidth * 0.2,
  heightWidthLimit: [100, 130, 150, 180, 200, 220, 240, 260],
  height: 100,
  width: 100,
};
const tree_3 = {
  el: document.querySelector("#tree_3"),
  movementX: innerWidth * 0.3,
  heightWidthLimit: [100, 130, 150, 180, 200, 220, 240, 260],
  height: 100,
  width: 100,
};
const tree_4 = {
  el: document.querySelector("#tree_4"),
  movementX: innerWidth * 0.4,
  heightWidthLimit: [100, 130, 150, 180, 200, 220, 240, 260],
  height: 100,
  width: 100,
};
const tree_5 = {
  el: document.querySelector("#tree_5"),
  movementX: innerWidth * 0.5,
  heightWidthLimit: [100, 130, 150, 180, 200, 220, 240, 260],
  height: 100,
  width: 100,
};
const tree_6 = {
  el: document.querySelector("#tree_6"),
  movementX: innerWidth * 0.6,
  heightWidthLimit: [100, 130, 150, 180, 200, 220, 240, 260, 280, 300],
  height: 100,
  width: 100,
};
const tree_7 = {
  el: document.querySelector("#tree_7"),
  movementX: innerWidth * 0.7,
  heightWidthLimit: [100, 130, 150, 180, 200, 220, 240, 260, 280, 300],
  height: 100,
  width: 100,
};
const tree_8 = {
  el: document.querySelector("#tree_8"),
  movementX: innerWidth * 0.8,
  heightWidthLimit: [100, 130, 150, 180, 200, 220, 240, 260, 280, 300],
  height: 100,
  width: 100,
};
const tree_9 = {
  el: document.querySelector("#tree_9"),
  movementX: innerWidth * 0.9,
  heightWidthLimit: [100, 130, 150, 180, 200, 220, 240, 260, 280, 300],
  height: 100,
  width: 100,
};
const tree_10 = {
  el: document.querySelector("#tree_10"),
  movementX: innerWidth,
  heightWidthLimit: [100, 130, 150, 180, 200, 220, 240, 260, 280, 300],
  height: 100,
  width: 100,
};

// ------------- Far tree ------------
const far_tree_1 = {
  el: document.querySelector("#far_tree_1"),
  movementX: 0,
};
const far_tree_2 = {
  el: document.querySelector("#far_tree_2"),
  movementX: -innerWidth,
};

// ------------- Hill ------------
const hill_1 = {
  el: document.querySelector("#hill_1"),
  movementX: -innerWidth / 2,
  heightWidthLimit: [300, 400, 500],
  height: 100,
  width: 100,
};
const hill_2 = {
  el: document.querySelector("#hill_2"),
  movementX: innerWidth / 2,
  heightWidthLimit: [300, 400, 500],
  height: 100,
  width: 100,
};
const hill_3 = {
  el: document.querySelector("#hill_3"),
  movementX: 0,
  heightWidthLimit: [300, 400, 500],
  height: 100,
  width: 100,
};

let playing = true;
let isGameStarted = false;
let score = 0;
let oldScore = score;
let gameSpeed = 10;
let gameLevel = 1;
let obstaklesOffsetDecrement = innerWidth / 10;
let obstaklesOffset = innerWidth + obstaklesOffsetDecrement;

const character_jump = function () {
  if (playing) {
    if (!character.classList.contains("character_jump")) {
      character.classList.add("character_jump");
      setTimeout(function () {
        character.classList.remove("character_jump");
      }, 700);
    }
  }
};

// ------------
// ------------- Other functions -------
const getRandomeValue = (max) => Math.floor(Math.random() * (max + 1));

const changeGameMode = function (gameScore, isLevelUpdate, isOffsetUpdate) {
  if (oldScore !== gameScore) {
    oldScore = gameScore;
    gameSpeed += 1;
    if (isLevelUpdate) {
      gameLevel += 1;
      levelEl.textContent = gameLevel;
    }
    if (isOffsetUpdate) obstaklesOffset -= obstaklesOffsetDecrement;
  }
};

// ------------
// ------------- Run animation functions -------
const animateElBg = function (animateThings, animateSpeed) {
  animateThings.forEach((animateThing) => {
    if (animateThing.movementX >= innerWidth) {
      animateThing.movementX = -innerWidth;
      animateThing.el.style.right = `${animateThing.movementX}px`;
    } else {
      animateThing.movementX += animateSpeed;
      animateThing.el.style.right = `${animateThing.movementX}px`;
    }
  });
};
const animateEl = function (animateThings, animateSpeed, thingType, img_num) {
  animateThings.forEach((animateThing) => {
    if (animateThing.movementX >= innerWidth) {
      let randomeValues = [
        getRandomeValue(animateThing.heightWidthLimit.length - 1),
        getRandomeValue(img_num - 1),
        getRandomeValue(10),
      ];

      animateThing.height = animateThing.heightWidthLimit[randomeValues[0]];
      animateThing.width = animateThing.heightWidthLimit[randomeValues[0]];
      if (thingType === "hill") animateThing.width = animateThing.width * 1.5;
      animateThing.el.style.height = `${animateThing.height}px`;
      animateThing.el.style.width = `${animateThing.width}px`;
      animateThing.el.style.backgroundImage = `url("./img/${thingType}_${
        randomeValues[1] + 1
      }.svg")`;

      animateThing.movementX =
        -innerWidth + (innerWidth / randomeValues[2] - animateThing.width);
      animateThing.el.style.right = `${animateThing.movementX}px`;
    } else {
      animateThing.movementX += animateSpeed;
      animateThing.el.style.right = `${animateThing.movementX}px`;
    }
  });
};
const animateObstakle = function (obstakles) {
  obstakles.forEach((obstakle) => {
    if (obstakle.isStarted) {
      if (obstakle.notStartedAnimate) {
        obstakle.notStartedAnimate = false;
      }
      obstakle.isScoreCunted = false;
      obstakle.isStarted = false;
      obstakle.isStartedCall = false;
      let randomeValues = [
        getRandomeValue(gameLevel),
        getRandomeValue(gameLevel),
      ];
      obstakle.height = obstakle.heightLimit[randomeValues[0]];
      obstakle.width = obstakle.widthLimit[randomeValues[1]];
      obstakle.movementX = 0;
      obstakle.el.style.height = `${obstakle.height}px`;
      obstakle.el.style.width = `${obstakle.width}px`;
      obstakle.el.style.right = `0px`;
    } else {
      if (!obstakle.notStartedAnimate) {
        if (
          obstakle.movementX - obstakle.width >= obstaklesOffset &&
          !obstakle.isStartedCall
        ) {
          obstakle.isStartedCall = true;
          if (obstakle.id === 0) {
            obstakle_2.isStarted = true;
          } else {
            obstakle_1.isStarted = true;
          }
        }
        obstakle.movementX += gameSpeed;
        obstakle.el.style.right = `${obstakle.movementX}px`;
      }
    }
    if (obstakle.el.getBoundingClientRect().left + obstakle.width < 0) {
      if (!obstakle.isScoreCunted) {
        obstakle.isScoreCunted = true;
        score += 1;
        scoreEl.textContent = score;
      }
    }
    switch (score) {
      case 10:
        changeGameMode(score, false, true);
        break;
      case 20:
        changeGameMode(score, true);
        break;
      case 30:
        changeGameMode(score, false, true);
        break;
      case 50:
        changeGameMode(score, true);
        break;
      case 70:
        changeGameMode(score, false, true);
        break;
      case 100:
        changeGameMode(score);
        break;
      case 130:
        changeGameMode(score, true, true);
        break;
      case 150:
        changeGameMode(score);
        break;
      case 170:
        changeGameMode(score, false, true);
        break;
      case 200:
        changeGameMode(score, true, true);
        break;
    }
  });
};

// ------------
// ------------- Check game over functions -------
const checkGameOver = function (obstakles) {
  obstakles.forEach((obstakle) => {
    const obstakleLeft = obstakle.el.getBoundingClientRect().left;
    if (
      obstakleLeft + obstakle.width >= characterleft &&
      obstakleLeft <= characterOffsetLeft &&
      character.getBoundingClientRect().top + characterHeight >=
        obstakle.el.getBoundingClientRect().top
    ) {
      playing = false;
      game_over_banner.classList.add("gameFinish");
    }
  });
};

// ------------
// ------------- Animation functions -------
function animate() {
  const treeSpeed = [Math.round(gameSpeed / 1.2), Math.round(gameSpeed / 1.1)];
  const hillSpeed = Math.round(gameSpeed / 6);
  const far_treeSpeed = Math.round(gameSpeed / 1.4);
  if (isGameStarted) {
    animateObstakle([obstakle_1, obstakle_2]);
  }
  animateElBg([grass_1, grass_2], gameSpeed);
  animateEl([tree_1, tree_2, tree_3, tree_4, tree_5], treeSpeed[0], "tree", 5);
  animateEl([tree_6, tree_7, tree_8, tree_9, tree_10], treeSpeed[1], "tree", 5);
  animateElBg([far_tree_1, far_tree_2], far_treeSpeed);
  animateEl([hill_1, hill_2, hill_3], hillSpeed, "hill", 2);
  checkGameOver([obstakle_1, obstakle_2]);
  if (playing) {
    requestAnimationFrame(animate);
  }
}
animate();

startBtn.addEventListener("click", function () {
  setTimeout(function () {
    isGameStarted = true;
  }, 1000);
  character.classList.add("gameStarted");
  main_banner.classList.add("gameStarted");
  score_cont.classList.add("gameStarted");
});

playAgainBtn.addEventListener("click", function () {
  // location.reload();
  playing = true;
  isGameStarted = false;
  score = 0;
  oldScore = score;
  gameSpeed = 10;
  gameLevel = 1;
  obstaklesOffset = innerWidth + obstaklesOffsetDecrement;

  scoreEl.textContent = score;
  levelEl.textContent = gameLevel;

  const initObstakles = function (obstakles) {
    obstakles.forEach((obstakle) => {
      obstakle.movementX = 0;
      obstakle.height = 50;
      obstakle.width = 50;
      obstakle.isStarted = false;
      obstakle.isStartedCall = false;
      obstakle.id === 0
        ? (obstakle.notStartedAnimate = false)
        : (obstakle.notStartedAnimate = true);
      obstakle.isScoreCunted = false;

      obstakle.el.style.right = `0px`;
      obstakle.el.style.height = `${obstakle.height}px`;
      obstakle.el.style.width = `${obstakle.width}px`;
    });
  };
  initObstakles([obstakle_1, obstakle_2]);

  game_over_banner.classList.remove("gameFinish");

  animate();
  setTimeout(function () {
    isGameStarted = true;
  }, 1000);
});

character_jump();

// ------------
// ------------- Jumping functions -------
let keyUped = true;
window.addEventListener("keydown", function (e) {
  if (keyUped) {
    keyUped = false;
    if (e.key === " " || e.key === "ArrowUp") {
      character_jump();
    }
  }
});
window.addEventListener("keyup", function () {
  keyUped = true;
});

window.addEventListener("pointerdown", function () {
  character_jump();
});
