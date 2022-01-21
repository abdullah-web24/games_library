"use strict";

var buttonColours = ["red", "blue", "green", "yellow"];
var randomChosenColour = nextSequence(buttonColours);
function nextSequence(buttonColours) {
  var randomNumber = Math.floor(Math.random() * buttonColours.length);
  return buttonColours[randomNumber];
}

for (let i = 1; i <= 10; i++) {
  console.log(nextSequence(buttonColours));
}
