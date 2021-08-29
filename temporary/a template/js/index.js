"use strict";
const player1 = {
  name: "Player 1",
  scoreBord: document.querySelector("#score-p1"),
  score: 0,
};
const player2 = {
  name: "Player 2",
  scoreBord: document.querySelector("#score-p2"),
  score: 0,
};
const playerName = document.querySelector("#player-name");
const current = document.querySelector("#current");
const dice = document.querySelector("#dice");
const dicePointViewer = document.querySelector("#dice-point");
const rollButton = document.querySelector("#roll-btn");
const holdButton = document.querySelector("#hold-btn");
let dicePoint = 0;
let currentPoint = 0;
let diceDegree = 0;
let rollerWaiter = "";

let turn = "player1";

const turner = function () {
  if (turn === "player1") {
    turn = "player2";
    playerName.textContent = "Player 2"; // Player 2 Name
    currentPoint = 0;
    current.textContent = currentPoint;
  } else if (turn === "player2") {
    turn = "player1";
    playerName.textContent = "Player 1"; // Player 1 Name
    currentPoint = 0;
    current.textContent = currentPoint;
  }
};
const holder = function () {
  console.log(turn);
  if (turn === "player1") {
    player1.score += currentPoint;
    player1.scoreBord.textContent = player1.score;
  } else if (turn === "player2") {
    player2.score += currentPoint;
    player2.scoreBord.textContent = player2.score;
  }
  turner();
};

const rollDice = function () {
  const point = Math.trunc(Math.random() * 6) + 1;
  diceDegree === 360 ? (diceDegree = 45) : (diceDegree += 45);
  console.log(point);

  const diceRoller = function (point) {
    const dots = dice.children;
    for (let i = 0; i < dots.length; i++) {
      const dot = dots[i];
      const style = dot.style;
      dot.dataset.points.includes(point) ? (style.opacity = 1) : (style.opacity = 0);
    }
    dice.style.transform = `rotateZ(${diceDegree}deg)`;
  };

  switch (point) {
    case 1:
      diceRoller(1);
      break;
    case 2:
      diceRoller(2);
      break;
    case 3:
      diceRoller(3);
      break;
    case 4:
      diceRoller(4);
      break;
    case 5:
      diceRoller(5);
      break;
    case 6:
      diceRoller(6);
      break;

    default:
      alert("Something went wrong!");
      break;
  }

  dicePoint = point;
};

const roller = function () {
  setTimeout(function () {
    rollDice();
    setTimeout(function () {
      rollDice();
      setTimeout(function () {
        rollDice();
        const addValue = function (con) {
          dicePointViewer.textContent = dicePoint;
          if (con !== "false") {
            currentPoint += dicePoint;
            current.textContent = currentPoint;
          }
        };
        switch (dicePoint) {
          case 1:
            addValue("false");
            turner();
            break;
          case 2:
          case 3:
          case 4:
          case 5:
          case 6:
            addValue();
            break;

          // case 2:
          //   addValue();
          //   break;
          // case 3:
          //   addValue();
          //   break;
          // case 4:
          //   addValue();
          //   break;
          // case 5:
          //   addValue();
          //   break;
          // case 6:
          //   addValue();
          //   break;

          default:
            alert("Something went wrong!");
            break;
        }
      }, 500);
    }, 300);
  }, 100);
};

rollButton.addEventListener("click", function () {
  if (rollerWaiter === "") {
    roller();
    rollerWaiter = "waite";
    setTimeout(function () {
      rollerWaiter = "";
    }, 1000);
  }
});
