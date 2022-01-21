"use strict";

// -------------------------- Banner functions ----------------------------

//  ----- Game banner  -----
const gameBanner = document.querySelector("#game-banner");
const startGame = document.querySelector("#start-game");
const settingsBtn = document.querySelector("#settings-btn");
const helpBtn = document.querySelector("#help-btn");

startGame.addEventListener("click", function () {
  gameBanner.classList.add("game-started");
});

// -------------------------- Game functions ----------------------------

//  ----- Player  -----

const player1 = {
  name: "Player 1",
  color: "red",
  carType: "car-style-2",
  nameShower: document.querySelector("#player-name-p1"),
  picShower: document.querySelector("#player-pic-p1"),
  pointBord: document.querySelector("#point-p1"),
  car: document.querySelector("#player1-car"),
  carImg: document.querySelector("#player1-car .car"),
  distanceShower: document.querySelector("#distance-p1"),
  point: 0,
  carDistance: 50,
  carSpeed: 150,
  gearSpeed: 30,
  nitroSpeed: 20,
  nitroFuel: 0,
  nitroFuelSpace: 3,
  engineUpdate: 1,
  gearUpdate: 1,
  nitroUpdate: 1,
};
const player2 = {
  name: "Player 2",
  color: "blue",
  carType: "car-style-2",
  nameShower: document.querySelector("#player-name-p2"),
  picShower: document.querySelector("#player-pic-p2"),
  pointBord: document.querySelector("#point-p2"),
  car: document.querySelector("#player2-car"),
  carImg: document.querySelector("#player2-car .car"),
  distanceShower: document.querySelector("#distance-p2"),
  point: 0,
  carDistance: 50,
  carSpeed: 150,
  gearSpeed: 30,
  nitroSpeed: 20,
  nitroFuel: 0,
  nitroFuelSpace: 3,
  engineUpdate: 1,
  gearUpdate: 1,
  nitroUpdate: 1,
};

//  ----- Get input value  -----

const getInputValue = function (player) {
  player.color === "black"
    ? (player.picShower.style.backgroundColor = "rgb(60, 60, 60)")
    : (player.picShower.style.backgroundColor = player.color);
  player.nameShower.textContent = player.name;
  player.carImg.classList.add(player.color);
  player.color === "white" || player.color === "black"
    ? (player.carImg.style.backgroundImage = `url("/img/${player.color}-cars/${player.carType}.svg")`)
    : (player.carImg.style.backgroundImage = `url("/img/${player.carType}.svg")`);
};

// ----- Other elements & varriable -----

const playerName = document.querySelector("#player-name");
const playerPic = document.querySelector("#player-pic");
const current = document.querySelector("#current");
const extraPointViewer = document.querySelector("#extra-point");
const extraDistanceViewer = document.querySelector("#extra-distance");
const dice = document.querySelector("#dice");
const dicePointViewer = document.querySelector("#dice-point");
const rollButton = document.querySelector("#roll-btn");
const holdButton = document.querySelector("#hold-btn");
const nitroBooster = document.querySelector("#nitro");
const nitroSpaceShower = document.querySelector("#nitro-viewer");
const nitroFuelShower = document.querySelector("#nitro-fuel");
const gearBtn = document.querySelector("#gear");
const engineUpdaterBtn = document.querySelector("#engine-update");
const engineUpdateShower = document.querySelector("#engine-update-show");
const gearUpdaterBtn = document.querySelector("#gear-update");
const gearUpdateShower = document.querySelector("#gear-update-show");
const nitroUpdaterBtn = document.querySelector("#nitro-update");
const nitroUpdateShower = document.querySelector("#nitro-update-show");
const gameBaseShower = document.querySelector("#show-sec");
const baseShowerHeight = gameBaseShower.getBoundingClientRect().height;
const engineUpdatePoints = [25, 35];
const gearUpdatePoints = [15, 25];
const nitroUpdatePoints = [20, 30];
const engineUpdateincrease = [30, 20];
const gearUpdateincrease = [10, 10];
const nitroUpdateincrease = [10, 20];
const playPathHeight = 4650;
let playing = false;
let dicePoint = 0;
let currentPoint = 0;
let extraPoint = 0;
let extraDistance = 0;
let gear = false;
let diceDegree = 0;
let waiter = "";
let turn;

// -------------------------- Get identity functions ----------------------------

//  ----- get identity  -----
const getInputCont = document.querySelector("#get-input-cont");
const getIdentityBtn = document.querySelector("#get-identity-btn");
const colorBtns = document.querySelectorAll(".get-color");
const carBtns = document.querySelectorAll(".get-car");
const player1NameInput = document.querySelector("#name-p1");
const player2NameInput = document.querySelector("#name-p2");
const previewImgP1 = document.querySelector("#preview-img-p1");
const previewImgP2 = document.querySelector("#preview-img-p2");

colorBtns.forEach(function (btn, indx) {
  if (!playing) {
    btn.addEventListener("click", function () {
      const selectedColor = btn.dataset.color;
      if (btn.classList.contains("color-p1")) {
        player1.color = selectedColor;
        selectedColor === "black"
          ? (previewImgP1.style.backgroundColor = "rgb(30, 30, 30)")
          : (previewImgP1.style.backgroundColor = selectedColor);
        colorBtns.forEach(function (eachBtn, i) {
          eachBtn.dataset.color === selectedColor ? eachBtn.classList.add("selected-p1") : eachBtn.classList.remove("selected-p1");
        });
      } else if (btn.classList.contains("color-p2")) {
        player2.color = selectedColor;
        selectedColor === "black"
          ? (previewImgP2.style.backgroundColor = "rgb(30, 30, 30)")
          : (previewImgP2.style.backgroundColor = selectedColor);
        colorBtns.forEach(function (eachBtn, i) {
          eachBtn.dataset.color === selectedColor ? eachBtn.classList.add("selected-p2") : eachBtn.classList.remove("selected-p2");
        });
      }
    });
  }
});

carBtns.forEach(function (btn, indx) {
  if (!playing) {
    btn.addEventListener("click", function () {
      const selectedCar = btn.dataset.car;
      if (btn.classList.contains("car-p1")) {
        carBtns.forEach(function (eachBtn, i) {
          if (eachBtn.classList.contains("car-p1")) eachBtn.classList.remove("selected");
        });
        btn.classList.add("selected");
        player1.carType = selectedCar;
      } else if (btn.classList.contains("car-p2")) {
        carBtns.forEach(function (eachBtn, i) {
          if (eachBtn.classList.contains("car-p2")) eachBtn.classList.remove("selected");
        });
        btn.classList.add("selected");
        player2.carType = selectedCar;
      }
    });
  }
});

getIdentityBtn.addEventListener("click", function () {
  if (!playing) {
    if (player1NameInput.value !== player2NameInput.value || (player1NameInput.value === "" && player2NameInput.value === "")) {
      if (player1NameInput.value !== "") player1.name = player1NameInput.value;
      if (player2NameInput.value !== "") player2.name = player2NameInput.value;
      getInputValue(player1);
      getInputValue(player2);
      playerName.textContent = player1.name;
      player1.color === "black" ? (playerPic.style.backgroundColor = "rgb(60, 60, 60)") : (playerPic.style.backgroundColor = player1.color);
      turn = player1.name;
      getInputCont.classList.add("game-started");
      playing = true;
    } else {
      alert("Players name can not be same!");
    }
  }
});

// ------- Resate game function ---------
const resate = function () {
  const resatePlayer = function (player) {
    player.carImg.classList.remove(player.color);
    if (player === player1) {
      player.name = "player 1";
      player.color = "red";
    } else if (player === player2) {
      player.name = "player 2";
      player.color = "blue";
    }
    player.carType = "car-style-2";
    player.nameShower.textContent = player.name;
    player.picShower.style.backgroundColor = player.color;
    player.point = 0;
    player.pointBord.textContent = player.point;
    player.carDistance = 50;
    player.car.style.bottom = `${player.carDistance}px`;
    player.car.classList.remove("active-nitro");
    player.carImg.style.backgroundImage = `url("/img/${player.carType}.svg")`;
    player.distanceShower.textContent = player.carDistance;
    player.carSpeed = 500;
    player.gearSpeed = 30;
    player.nitroSpeed = 20;
    player.nitroFuel = 0;
    player.nitroFuelSpace = 3;
    player.engineUpdate = 1;
    player.gearUpdate = 1;
    player.nitroUpdate = 1;
  };
  resatePlayer(player1);
  resatePlayer(player2);
  playing = false;
  dicePoint = 0;
  currentPoint = 0;
  extraPoint = 0;
  extraDistance = 0;
  gear = false;
  diceDegree = 0;
  waiter = "";
  turn = player1.name;
  playerName.textContent = player1.name;
  playerPic.style.backgroundColor = player1.color;
  current.textContent = currentPoint;
  extraPointViewer.textContent = extraPoint;
  extraDistanceViewer.textContent = extraDistance;
  dice.style.transform = `rotateZ(${diceDegree}deg)`;
  dicePointViewer.textContent = dicePoint;
  nitroBooster.classList.remove("active");
  nitroFuelShower.style.width = `0px`;
  nitroSpaceShower.style.width = `150px`;
  gearBtn.classList.remove("active");
  engineUpdaterBtn.classList.remove("max");
  gearUpdaterBtn.classList.remove("max");
  nitroUpdaterBtn.classList.remove("max");
  engineUpdateShower.textContent = "1 / (25 points)";
  gearUpdateShower.textContent = "1 / (15 points)";
  nitroUpdateShower.textContent = "1 / (20 points)";
  gameBaseShower.scrollTo(0, baseShowerScrollHeight);

  colorBtns.forEach(function (eachBtn, i) {
    eachBtn.classList.contains("selected-p1") ? eachBtn.classList.remove("selected-p1") : eachBtn.classList.remove("selected-p2");
  });
  carBtns.forEach(function (eachBtn, i) {
    if (eachBtn.classList.contains("selected")) eachBtn.classList.remove("selected");
  });
  previewImgP1.style.backgroundColor = "red";
  previewImgP2.style.backgroundColor = "blue";
};

// ------- Win board & push game ----------
const winBoard = document.querySelector("#win-board");
const winPlayer = document.querySelector("#winPlayer");
const resultNameP1 = document.querySelector("#result-name-p1");
const resultNameP2 = document.querySelector("#result-name-p2");
const resultP1 = document.querySelector("#result-p1");
const resultP2 = document.querySelector("#result-p2");
const mainMenuBtns = document.querySelectorAll(".main-menu-btn");
const playAgainBtn = document.querySelector("#play-again-btn");
const pushBtn = document.querySelector("#push-btn");
const pushGame = document.querySelector("#push-game");
const resumeBtn = document.querySelector("#resume-btn");

mainMenuBtns.forEach(function (mainMenuBtn, i) {
  mainMenuBtn.addEventListener("click", function () {
    resate();
    gameBanner.classList.remove("game-started");
    setTimeout(function () {
      getInputCont.classList.remove("game-started");
      winBoard.classList.remove("game-finished");
      pushGame.classList.remove("game-pushed");
    }, 500);
  });
});

playAgainBtn.addEventListener("click", function () {
  if (!playing) {
    getInputCont.classList.remove("game-started");
    setTimeout(function () {
      winBoard.classList.remove("game-finished");
    }, 500);
  }
});

const showWinBord = function (draw, winer) {
  if (draw !== "true") {
    winPlayer.textContent = winer.name;
  } else {
    winPlayer.textContent = "Both players";
  }
  resultNameP1.textContent = player1.name;
  resultP1.textContent = player1.carDistance;
  resultNameP2.textContent = player2.name;
  resultP2.textContent = player2.carDistance;
  winBoard.classList.add("game-finished");
};

pushBtn.addEventListener("click", function () {
  pushGame.classList.add("game-pushed");
});
resumeBtn.addEventListener("click", function () {
  pushGame.classList.remove("game-pushed");
});

// ----- Massage function --------
const massageShower = document.querySelector("#massage-cont");
let hideMassage = null;

const showMassage = function (text) {
  const massageBox = document.createElement("p");
  const massage = document.createTextNode(text);
  massageBox.appendChild(massage);
  massageShower.classList.add("show");
  massageShower.appendChild(massageBox);

  if (hideMassage === null) {
    hideMassage = setTimeout(function () {
      massageShower.classList.remove("show");
    }, 1000);
  } else {
    clearTimeout(hideMassage);
    hideMassage = null;
    hideMassage = setTimeout(function () {
      massageShower.classList.remove("show");
    }, 1000);
  }
  setTimeout(function () {
    massageShower.removeChild(massageBox);
  }, 2000);
};

// ----- Car releted functions -----

const carShower = function (playerTurn) {
  const carHeight = playerTurn.car.getBoundingClientRect().height;
  const offsetTopCar = playerTurn.car.offsetTop;
  const carPosition = offsetTopCar - baseShowerHeight + carHeight;
  gameBaseShower.scrollTo(0, carPosition + 50);
};

const carDriver = function (playerTurn) {
  playerTurn.carDistance += extraDistance;
  if (playerTurn.nitroFuel > 0) {
    playerTurn.carDistance += playerTurn.nitroSpeed;
    playerTurn.nitroFuel -= 1;
    nitroChecker(playerTurn);
  }
  if (gear) {
    playerTurn.carDistance += playerTurn.gearSpeed;
    gearBtn.classList.remove("active");
  }
  playerTurn.carDistance += playerTurn.carSpeed;
  playerTurn.car.style.bottom = `${playerTurn.carDistance}px`;
  playerTurn.distanceShower.textContent = playerTurn.carDistance;
};

// ----- Check related function -----

const checkWinner = function () {
  if (player1.carDistance > playPathHeight && player1.carDistance > player2.carDistance) {
    setTimeout(function () {
      showWinBord("false", player1);
      resate();
    }, 500);
  } else if (player2.carDistance > playPathHeight && player2.carDistance > player1.carDistance) {
    setTimeout(function () {
      showWinBord("false", player2);
      resate();
    }, 500);
  } else if (player1.carDistance > playPathHeight && player2.carDistance > playPathHeight && player1.carDistance === player2.carDistance) {
    setTimeout(function () {
      showWinBord("true");
      resate();
    }, 500);
  }
};

const nitroChecker = function (playerTurn, con) {
  if (con === "false") {
    nitroFuelShower.classList.add("quick");
    nitroFuelShower.style.width = `${50 * playerTurn.nitroFuel}px`;
    nitroSpaceShower.style.width = `${50 * playerTurn.nitroFuelSpace}px`;
    setTimeout(function () {
      nitroFuelShower.classList.remove("quick");
    }, 150);
  } else {
    nitroFuelShower.style.width = `${50 * playerTurn.nitroFuel}px`;
  }
  if (playerTurn.nitroFuel === 0) {
    nitroBooster.classList.remove("active");
    playerTurn.car.classList.remove("active-nitro");
  } else {
    nitroBooster.classList.add("active");
    playerTurn.car.classList.add("active-nitro");
  }
};

const maxUpdateChecker = function (con, updateThing) {
  if (con) {
    if (updateThing === "engineUpdate") {
      engineUpdaterBtn.classList.add("max");
    } else if (updateThing === "gearUpdate") {
      gearUpdaterBtn.classList.add("max");
    } else if (updateThing === "nitroUpdate") {
      nitroUpdaterBtn.classList.add("max");
    }
  } else {
    if (updateThing === "engineUpdate") {
      engineUpdaterBtn.classList.remove("max");
    } else if (updateThing === "gearUpdate") {
      gearUpdaterBtn.classList.remove("max");
    } else if (updateThing === "nitroUpdate") {
      nitroUpdaterBtn.classList.remove("max");
    }
  }
};

const updateChecker = function (playerTurn, updateThing, updatePoints, shower) {
  if (playerTurn[updateThing] < 3) {
    playerTurn[updateThing] === 1
      ? (shower.textContent = `${playerTurn[updateThing]} / (${updatePoints[0]} points)`)
      : (shower.textContent = `${playerTurn[updateThing]} / (${updatePoints[1]} points)`);
    maxUpdateChecker(false, updateThing);
  } else {
    shower.textContent = playerTurn[updateThing];
    maxUpdateChecker(true, updateThing);
  }
};

// ----- Upgrade related functions -----

const updater = function (playerTurn, [updateThing, updateItem], updateIncrease, updatePoints, shower) {
  if (playerTurn[updateThing] === 1) {
    if (playerTurn.point >= updatePoints[0]) {
      playerTurn.point -= updatePoints[0];
      playerTurn.pointBord.textContent = playerTurn.point;
      playerTurn[updateThing] = 2;
      playerTurn[updateItem] += updateIncrease[0];
      shower.textContent = `${playerTurn[updateThing]} / (${updatePoints[1]} points)`;
      if (updateThing === "nitroUpdate") {
        playerTurn.nitroFuelSpace += 1;
        nitroSpaceShower.style.width = `${50 * playerTurn.nitroFuelSpace}px`;
      }
      showMassage(`You have successfully updated your ${updateThing} to level 2 ${playerTurn.name}!`);
    } else {
      showMassage(`You have no enough points ${playerTurn.name}!`);
    }
  } else if (playerTurn[updateThing] === 2) {
    if (playerTurn.point >= updatePoints[1]) {
      playerTurn.point -= updatePoints[1];
      playerTurn.pointBord.textContent = playerTurn.point;
      playerTurn[updateThing] = 3;
      playerTurn[updateItem] += updateIncrease[1];
      maxUpdateChecker(true, updateThing);
      shower.textContent = playerTurn[updateThing];
      if (updateThing === "nitroUpdate") {
        playerTurn.nitroFuelSpace += 1;
        nitroSpaceShower.style.width = `${50 * playerTurn.nitroFuelSpace}px`;
      }
      showMassage(`You have successfully updated your ${updateThing} to level 3 ${playerTurn.name}!`);
    } else {
      showMassage(`You have no enough points ${playerTurn.name}!`);
    }
  } else if (playerTurn[updateThing] === 3) {
    showMassage(`This is max!`);
  }
};

// ----- Extra speed releted functions -----

const gearUp = function (playerTurn) {
  if (playerTurn.point >= 5 && !gear) {
    playerTurn.point -= 5;
    playerTurn.pointBord.textContent = playerTurn.point;
    gear = true;
    gearBtn.classList.add("active");
    showMassage(`You have successfully geared up ${playerTurn.name}!`);
  } else if (gear) {
    showMassage(`You have already geared up ${playerTurn.name}!`);
  } else {
    showMassage(`You have no enough points ${playerTurn.name}!`);
  }
};

const boostNitro = function (playerTurn) {
  if (playerTurn.point >= 15 && playerTurn.nitroFuel === 0) {
    playerTurn.point -= 15;
    playerTurn.pointBord.textContent = playerTurn.point;
    playerTurn.nitroFuel = playerTurn.nitroFuelSpace;
    nitroBooster.classList.add("active");
    showMassage(`You have successfully boosted up ${playerTurn.name}!`);
    nitroChecker(playerTurn, "false");
  } else if (playerTurn.point >= 15 && playerTurn.nitroFuel > 0) {
    showMassage(`You have already boosted up ${playerTurn.name}!`);
  } else {
    showMassage(`You have no enough points ${playerTurn.name}!`);
  }
};

// ----- Turn releted functions -----

const turner = function (point) {
  if (turn === player1.name) {
    if (point === 1) {
      player1.point += extraPoint;
    }
    player1.pointBord.textContent = player1.point;
    carShower(player2);
    turn = player2.name;
    playerName.textContent = player2.name;
    player2.color === "black" ? (playerPic.style.backgroundColor = "rgb(60, 60, 60)") : (playerPic.style.backgroundColor = player2.color);
    nitroChecker(player2, "false");
    updateChecker(player2, "engineUpdate", engineUpdatePoints, engineUpdateShower);
    updateChecker(player2, "gearUpdate", gearUpdatePoints, gearUpdateShower);
    updateChecker(player2, "nitroUpdate", nitroUpdatePoints, nitroUpdateShower);
  } else if (turn === player2.name) {
    if (point === 1) {
      player2.point += extraPoint;
    }
    player2.pointBord.textContent = player2.point;
    carShower(player1);
    turn = player1.name;
    playerName.textContent = player1.name;
    player1.color === "black" ? (playerPic.style.backgroundColor = "rgb(60, 60, 60)") : (playerPic.style.backgroundColor = player1.color);
    nitroChecker(player1, "false");
    updateChecker(player1, "engineUpdate", engineUpdatePoints, engineUpdateShower);
    updateChecker(player1, "gearUpdate", gearUpdatePoints, gearUpdateShower);
    updateChecker(player1, "nitroUpdate", nitroUpdatePoints, nitroUpdateShower);
  }
  currentPoint = 0;
  current.textContent = currentPoint;
  extraPoint = 0;
  extraPointViewer.textContent = extraPoint;
  extraDistance = 0;
  extraDistanceViewer.textContent = extraDistance;
  gear = false;
};

const holder = function (point, con) {
  if (playing) {
    if (waiter === "" || (waiter === "rolling" && (point === 3 || point === 1))) {
      waiter = "waite";
      if (turn === player1.name) {
        carDriver(player1);
        if (con !== "false") {
          player1.point += currentPoint;
          player1.point += extraPoint;
        }
      } else if (turn === player2.name) {
        carDriver(player2);
        checkWinner();
        if (con !== "false") {
          player2.point += currentPoint;
          player2.point += extraPoint;
        }
      }
      setTimeout(function () {
        turner(point);
        waiter = "";
      }, 1500);
    }
  }
};

// ----- Dice releted functions -----

const rollDice = function () {
  const point = Math.trunc(Math.random() * 6) + 1;
  diceDegree === 360 ? (diceDegree = 45) : (diceDegree += 45);

  const diceRoller = function (point) {
    const dots = dice.children;
    for (let i = 0; i < dots.length; i++) {
      const dot = dots[i];
      const style = dot.style;
      dot.dataset.points.includes(point) ? (style.opacity = 1) : (style.opacity = 0);
    }
    dice.style.transform = `rotateZ(${diceDegree}deg)`;
  };
  diceRoller(point);

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
            holder(1, "false");
            break;
          case 2:
          case 3:
          case 4:
          case 5:
          case 6:
            addValue();
            if (dicePoint === 3) {
              holder(3);
            } else if (dicePoint === 2) {
              extraDistance += 20;
              extraDistanceViewer.textContent = extraDistance;
            } else if (dicePoint === 4) {
              extraPoint += -4;
              extraPointViewer.textContent = extraPoint;
            } else if (dicePoint === 6) {
              extraPoint += 3;
              extraPointViewer.textContent = extraPoint;
            }
            break;

          default:
            alert("Something went wrong!");
            break;
        }
        dicePoint = 0;
      }, 500);
    }, 300);
  }, 100);
};

// ----- All eventlisteners & handelers -----

rollButton.addEventListener("click", function () {
  if (playing) {
    if (waiter === "") {
      waiter = "rolling";
      roller();
      setTimeout(function () {
        if (waiter === "rolling") {
          waiter = "";
        }
      }, 1000);
    }
  }
});

holdButton.addEventListener("click", function () {
  if (playing) {
    if (waiter === "") {
      if (currentPoint === 0) {
        const con = confirm(`Do you really want to hold, ${turn}?`);
        if (con) {
          holder();
        }
      } else {
        holder();
      }
    }
  }
});

nitroBooster.addEventListener("click", function () {
  if (playing) {
    if (turn === player1.name) {
      boostNitro(player1);
    } else if (turn === player2.name) {
      boostNitro(player2);
    }
  }
});

gearBtn.addEventListener("click", function () {
  if (playing) {
    if (turn === player1.name) {
      gearUp(player1);
    } else if (turn === player2.name) {
      gearUp(player2);
    }
  }
});

engineUpdaterBtn.addEventListener("click", function () {
  if (playing) {
    if (turn === player1.name) {
      updater(player1, ["engineUpdate", "carSpeed"], engineUpdateincrease, engineUpdatePoints, engineUpdateShower);
    } else if (turn === player2.name) {
      updater(player2, ["engineUpdate", "carSpeed"], engineUpdateincrease, engineUpdatePoints, engineUpdateShower);
    }
  }
});
gearUpdaterBtn.addEventListener("click", function () {
  if (playing) {
    if (turn === player1.name) {
      updater(player1, ["gearUpdate", "gearSpeed"], gearUpdateincrease, gearUpdatePoints, gearUpdateShower);
    } else if (turn === player2.name) {
      updater(player2, ["gearUpdate", "gearSpeed"], gearUpdateincrease, gearUpdatePoints, gearUpdateShower);
    }
  }
});
nitroUpdaterBtn.addEventListener("click", function () {
  if (playing) {
    if (turn === player1.name) {
      updater(player1, ["nitroUpdate", "nitroSpeed"], nitroUpdateincrease, nitroUpdatePoints, nitroUpdateShower);
    } else if (turn === player2.name) {
      updater(player2, ["nitroUpdate", "nitroSpeed"], nitroUpdateincrease, nitroUpdatePoints, nitroUpdateShower);
    }
  }
});

// ----- On load default things -----

const baseShowerScrollHeight = gameBaseShower.scrollHeight;
gameBaseShower.scrollTo(0, baseShowerScrollHeight);
