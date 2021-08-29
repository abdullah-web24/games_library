"use strict";

let player_1 = document.querySelectorAll(".player_1");
let player_2 = document.querySelectorAll(".player_2");
let player_1_score_bord = document.querySelector("#player_1_score");
let player_2_score_bord = document.querySelector("#player_2_score");
let player_1_score = 0;
let player_2_score = 0;
let slayer = document.querySelectorAll(".slayer");
let slayer_height_weight;
if (window.innerWidth > 1024) {
  slayer_height_weight = 70;
} else if (window.innerWidth <= 1024 && window.innerWidth > 500) {
  slayer_height_weight = 50;
} else if (window.innerWidth <= 500) {
  slayer_height_weight = 35;
}

let places = document.querySelectorAll(".place");
let corner_places = document.querySelectorAll(".corner_place");
let center = document.querySelector("#center");
let player_1_key = document.querySelector("#player_1_key");
let player_2_key = document.querySelector("#player_2_key");
let turn_player;
let player_2_select_function_called = false;
let paths;
let winner_anounce = document.querySelector("#winner_anounce");
let main_anounce = document.querySelector("#main_anounce");
let player_1_result = document.querySelector("#player_1_result");
let player_2_result = document.querySelector("#player_2_result");

// Game setup ------
let get_identity = document.querySelector("#get_identity");
let get_player_1 = document.querySelector("#get_player_1");
let get_player_2 = document.querySelector("#get_player_2");
let play_now = document.querySelector("#play_now");
let player_1_name = document.querySelector("#player_1_name");
let player_2_name = document.querySelector("#player_2_name");
let player_1_name_ = document.querySelector("#player_1_name_");
let player_2_name_ = document.querySelector("#player_2_name_");

play_now.addEventListener("click", function () {
  let player_1_name_value = get_player_1.value;
  let player_2_name_value = get_player_2.value;
  if (player_1_name_value != "") {
    player_1_name.innerText = player_1_name_value;
    player_1_name_.innerText = player_1_name_value;
  }
  if (player_2_name_value != "") {
    player_2_name.innerText = player_2_name_value;
    player_2_name_.innerText = player_2_name_value;
  }
  get_identity.style.display = "none";
});

let play_again = document.querySelector("#play_again");

play_again.addEventListener("click", function () {
  location.reload();
});
// setup ------

function select_function() {
  slayer.forEach(function (slayer_item, index) {
    slayer_item.addEventListener("click", function () {
      let selected = document.querySelector(".selected");
      if (
        turn_player == undefined ||
        slayer_item.classList.contains(turn_player)
      ) {
        if (selected != undefined) {
          selected.classList.remove("selected");
        }
        this.classList.add("selected");
        if (slayer_item.classList.contains("player_1")) {
          turn_player = "player_1";
        } else {
          turn_player = "player_2";
        }
        remove_path(places);
        remove_path(player_1);
        remove_path(player_2);
        path_finder();
        mover();
      }
    });
  });
}
select_function();

function define_path(moveable) {
  moveable.forEach(function (place, index) {
    let selected = document.querySelector(".selected");
    if (selected != undefined) {
      let offset_top = place.offsetTop;
      let offset_left = place.offsetLeft;
      let offset_top_center = center.offsetTop;
      let offset_left_center = center.offsetLeft;
      let offset_top_selected = selected.offsetTop;
      let offset_left_selected = selected.offsetLeft;

      if (selected.classList.contains("s_s")) {
        let top_left =
          offset_left_selected - slayer_height_weight == offset_left &&
          offset_top_selected - slayer_height_weight == offset_top;
        let top_right =
          offset_left_selected + slayer_height_weight == offset_left &&
          offset_top_selected - slayer_height_weight == offset_top;
        let bottom_left =
          offset_left_selected - slayer_height_weight == offset_left &&
          offset_top_selected + slayer_height_weight == offset_top;
        let bottom_right =
          offset_left_selected + slayer_height_weight == offset_left &&
          offset_top_selected + slayer_height_weight == offset_top;

        if (
          top_left == true ||
          top_right == true ||
          bottom_left == true ||
          bottom_right == true
        ) {
          if (
            !(
              (moveable != places ||
                (turn_player == "player_1" &&
                  if_any_on_key(player_2_key, player_2) == true) ||
                (turn_player == "player_2" &&
                  if_any_on_key(player_1_key, player_1) == true)) &&
              offset_top_center == offset_top &&
              offset_left_center == offset_left
            )
          ) {
            place.classList.add("path");
            if (moveable != places) {
              place.classList.add("eat_path");
            }
          }
        }
      } else {
        // top
        let top =
          offset_top_selected - slayer_height_weight * 2 == offset_top &&
          offset_left_selected == offset_left;
        let top_top_left =
          offset_top_selected - slayer_height_weight * 3 == offset_top &&
          offset_left_selected - slayer_height_weight == offset_left;
        let top_top_right =
          offset_top_selected - slayer_height_weight * 3 == offset_top &&
          offset_left_selected + slayer_height_weight == offset_left;
        let top_top =
          offset_top_selected - slayer_height_weight * 4 == offset_top &&
          offset_left_selected == offset_left;

        // bottom
        let bottom =
          offset_top_selected + slayer_height_weight * 2 == offset_top &&
          offset_left_selected == offset_left;
        let bottom_bottom_left =
          offset_top_selected + slayer_height_weight * 3 == offset_top &&
          offset_left_selected - slayer_height_weight == offset_left;
        let bottom_bottom_right =
          offset_top_selected + slayer_height_weight * 3 == offset_top &&
          offset_left_selected + slayer_height_weight == offset_left;
        let bottom_bottom =
          offset_top_selected + slayer_height_weight * 4 == offset_top &&
          offset_left_selected == offset_left;

        // left
        let left =
          offset_left_selected - slayer_height_weight * 2 == offset_left &&
          offset_top_selected == offset_top;
        let left_left_top =
          offset_left_selected - slayer_height_weight * 3 == offset_left &&
          offset_top_selected - slayer_height_weight == offset_top;
        let left_left_bottom =
          offset_left_selected - slayer_height_weight * 3 == offset_left &&
          offset_top_selected + slayer_height_weight == offset_top;
        let left_left =
          offset_left_selected - slayer_height_weight * 4 == offset_left &&
          offset_top_selected == offset_top;

        // right
        let right =
          offset_left_selected + slayer_height_weight * 2 == offset_left &&
          offset_top_selected == offset_top;
        let right_right_top =
          offset_left_selected + slayer_height_weight * 3 == offset_left &&
          offset_top_selected - slayer_height_weight == offset_top;
        let right_right_bottom =
          offset_left_selected + slayer_height_weight * 3 == offset_left &&
          offset_top_selected + slayer_height_weight == offset_top;
        let right_right =
          offset_left_selected + slayer_height_weight * 4 == offset_left &&
          offset_top_selected == offset_top;

        // corner
        let top_left =
          offset_left_selected - slayer_height_weight == offset_left &&
          offset_top_selected - slayer_height_weight == offset_top;
        let top_left_top_left =
          offset_left_selected - slayer_height_weight * 2 == offset_left &&
          offset_top_selected - slayer_height_weight * 2 == offset_top;
        let top_right =
          offset_left_selected + slayer_height_weight == offset_left &&
          offset_top_selected - slayer_height_weight == offset_top;
        let top_right_top_right =
          offset_left_selected + slayer_height_weight * 2 == offset_left &&
          offset_top_selected - slayer_height_weight * 2 == offset_top;
        let bottom_left =
          offset_left_selected - slayer_height_weight == offset_left &&
          offset_top_selected + slayer_height_weight == offset_top;
        let bottom_left_bottom_left =
          offset_left_selected - slayer_height_weight * 2 == offset_left &&
          offset_top_selected + slayer_height_weight * 2 == offset_top;
        let bottom_right =
          offset_left_selected + slayer_height_weight == offset_left &&
          offset_top_selected + slayer_height_weight == offset_top;
        let bottom_right_bottom_right =
          offset_left_selected + slayer_height_weight * 2 == offset_left &&
          offset_top_selected + slayer_height_weight * 2 == offset_top;

        if (
          !(
            (moveable != places ||
              (turn_player == "player_1" &&
                if_any_on_key(player_2_key, player_2) == true) ||
              (turn_player == "player_2" &&
                if_any_on_key(player_1_key, player_1) == true)) &&
            offset_top_center == offset_top &&
            offset_left_center == offset_left
          )
        ) {
          if (if_in_corner() == true) {
            if (
              (top == true &&
                (is_any("top_left") == true || is_any("top_right") == true)) ||
              (bottom == true &&
                (is_any("bottom_left") == true ||
                  is_any("bottom_right") == true)) ||
              (left == true &&
                (is_any("top_left") == true ||
                  is_any("bottom_left") == true)) ||
              (right == true &&
                (is_any("top_right") == true ||
                  is_any("bottom_right") == true)) ||
              (top_top_left == true && is_any("top_left") == true) ||
              (top_top_right == true && is_any("top_right") == true) ||
              (bottom_bottom_left == true && is_any("bottom_left") == true) ||
              (bottom_bottom_right == true && is_any("bottom_right") == true) ||
              (left_left_top == true && is_any("top_left") == true) ||
              (left_left_bottom == true && is_any("bottom_left") == true) ||
              (right_right_top == true && is_any("top_right") == true) ||
              (right_right_bottom == true && is_any("bottom_right") == true) ||
              top_left == true ||
              (top_left_top_left == true && is_any("top_left") == true) ||
              top_right == true ||
              (top_right_top_right == true && is_any("top_right") == true) ||
              bottom_left == true ||
              (bottom_left_bottom_left == true &&
                is_any("bottom_left") == true) ||
              bottom_right == true ||
              (bottom_right_bottom_right == true &&
                is_any("bottom_right") == true)
            ) {
              place.classList.add("path");
              if (moveable != places) {
                place.classList.add("eat_path");
              }
            }
          } else if (if_in_corner() == false) {
            if (
              top == true ||
              bottom == true ||
              left == true ||
              right == true ||
              (top_top == true && is_any("top") == true) ||
              (top_top_left == true && is_any("top") == true) ||
              (top_top_right == true && is_any("top") == true) ||
              (bottom_bottom == true && is_any("bottom") == true) ||
              (bottom_bottom_left == true && is_any("bottom") == true) ||
              (bottom_bottom_right == true && is_any("bottom") == true) ||
              (left_left == true && is_any("left") == true) ||
              (left_left_top == true && is_any("left") == true) ||
              (left_left_bottom == true && is_any("left") == true) ||
              (right_right == true && is_any("right") == true) ||
              (right_right_top == true && is_any("right") == true) ||
              (right_right_bottom == true && is_any("right") == true) ||
              top_left == true ||
              (top_left_top_left == true &&
                (is_any("top_left") == true ||
                  is_any("top") == true ||
                  is_any("left") == true)) ||
              top_right == true ||
              (top_right_top_right == true &&
                (is_any("top_right") == true ||
                  is_any("top") == true ||
                  is_any("right") == true)) ||
              bottom_left == true ||
              (bottom_left_bottom_left == true &&
                (is_any("bottom_left") == true ||
                  is_any("bottom") == true ||
                  is_any("left") == true)) ||
              bottom_right == true ||
              (bottom_right_bottom_right == true &&
                (is_any("bottom_right") == true ||
                  is_any("bottom") == true ||
                  is_any("right") == true))
            ) {
              place.classList.add("path");
              if (moveable != places) {
                place.classList.add("eat_path");
              }
            }
          }
        }
      }

      function is_any(place_condition) {
        let condition = true;
        let that_place;
        places.forEach(function (is_that_place, indx) {
          let offset_top_place = is_that_place.offsetTop;
          let offset_left_place = is_that_place.offsetLeft;

          if (
            place_condition == "top" &&
            offset_top_selected - slayer_height_weight * 2 ==
              offset_top_place &&
            offset_left_selected == offset_left_place
          ) {
            that_place = is_that_place;
          } else if (
            place_condition == "bottom" &&
            offset_top_selected + slayer_height_weight * 2 ==
              offset_top_place &&
            offset_left_selected == offset_left_place
          ) {
            that_place = is_that_place;
          } else if (
            place_condition == "left" &&
            offset_left_selected - slayer_height_weight * 2 ==
              offset_left_place &&
            offset_top_selected == offset_top_place
          ) {
            that_place = is_that_place;
          } else if (
            place_condition == "right" &&
            offset_left_selected + slayer_height_weight * 2 ==
              offset_left_place &&
            offset_top_selected == offset_top_place
          ) {
            that_place = is_that_place;
          } else if (
            place_condition == "top_left" &&
            offset_left_selected - slayer_height_weight == offset_left_place &&
            offset_top_selected - slayer_height_weight == offset_top_place
          ) {
            that_place = is_that_place;
          } else if (
            place_condition == "top_right" &&
            offset_left_selected + slayer_height_weight == offset_left_place &&
            offset_top_selected - slayer_height_weight == offset_top_place
          ) {
            that_place = is_that_place;
          } else if (
            place_condition == "bottom_left" &&
            offset_left_selected - slayer_height_weight == offset_left_place &&
            offset_top_selected + slayer_height_weight == offset_top_place
          ) {
            that_place = is_that_place;
          } else if (
            place_condition == "bottom_right" &&
            offset_left_selected + slayer_height_weight == offset_left_place &&
            offset_top_selected + slayer_height_weight == offset_top_place
          ) {
            that_place = is_that_place;
          }
        });
        player_1.forEach(function (any, indx) {
          let place_top = that_place.offsetTop;
          let place_left = that_place.offsetLeft;
          let any_top = any.offsetTop;
          let any_left = any.offsetLeft;
          if (place_top == any_top && place_left == any_left) {
            condition = false;
          }
        });
        player_2.forEach(function (any, indx) {
          let place_top = that_place.offsetTop;
          let place_left = that_place.offsetLeft;
          let any_top = any.offsetTop;
          let any_left = any.offsetLeft;
          if (place_top == any_top && place_left == any_left) {
            condition = false;
          }
        });
        if (condition == false) {
          return false;
        } else {
          return true;
        }
      }
    }
  });
}

function path_finder() {
  define_path(places);
  if (turn_player == "player_1") {
    define_path(player_2);
  } else {
    define_path(player_1);
  }
}

function turn_function() {
  if (turn_player == "player_1") {
    player_1.forEach(function (slayer, index) {
      slayer.classList.remove("slayer");
    });
    player_2.forEach(function (slayer, index) {
      slayer.classList.add("slayer");
    });
    player_1_name.classList.remove("turn_player");
    player_2_name.classList.add("turn_player");
    turn_player = "player_2";
  } else {
    player_1.forEach(function (slayer, index) {
      slayer.classList.add("slayer");
    });
    player_2.forEach(function (slayer, index) {
      slayer.classList.remove("slayer");
    });
    player_1_name.classList.add("turn_player");
    player_2_name.classList.remove("turn_player");
    turn_player = "player_1";
  }
  slayer = document.querySelectorAll(".slayer");
  if (player_2_select_function_called == false) {
    select_function();
    player_2_select_function_called = true;
  }
}

function remove_path(elem) {
  elem.forEach(function (element, index) {
    element.classList.remove("path");
    paths = document.querySelectorAll(".path");
    if (element.classList.contains("eat_path")) {
      element.classList.remove("eat_path");
    }
  });
}

function mover() {
  paths = document.querySelectorAll(".path");
  let offset_top_center = center.offsetTop;
  let offset_left_center = center.offsetLeft;
  paths.forEach(function (path, indx) {
    path.addEventListener("click", function () {
      let selected = document.querySelector(".selected");
      if (selected != undefined) {
        let offset_top_path = path.offsetTop;
        let offset_left_path = path.offsetLeft;

        if (
          (turn_player == "player_1" &&
            path.classList.contains("path") &&
            (path.classList.contains("player_2") ||
              path.classList.contains("place"))) ||
          (turn_player == "player_2" &&
            path.classList.contains("path") &&
            (path.classList.contains("player_1") ||
              path.classList.contains("place")))
        ) {
          move(selected, offset_top_path, offset_left_path);
          eat_and_count(path);
          player_key(path, offset_top_center, offset_left_center);
          if (player_1_score == 8) {
            setTimeout(function () {
              main_anounce.innerText = `${player_1_name.innerText} won !`;
              player_1_result.innerText = player_1_score;
              player_2_result.innerText = player_2_score;
              winner_anounce.style.display = "flex";
            }, 500);
          } else if (player_2_score == 8) {
            setTimeout(function () {
              main_anounce.innerText = `${player_2_name.innerText} won !`;
              player_1_result.innerText = player_1_score;
              player_2_result.innerText = player_2_score;
              winner_anounce.style.display = "flex";
            }, 500);
          }
          remove_path(places);
          remove_path(player_1);
          remove_path(player_2);
          paths = document.querySelectorAll(".path");
        }
      }
    });
  });
}

function move(selected, offset_top_path, offset_left_path) {
  selected.style.top = offset_top_path + "px";
  selected.style.left = offset_left_path + "px";
  selected.classList.remove("selected");
  setTimeout(function () {
    turn_function();
  }, 500);
}

function eat_and_count(path) {
  if (
    path.classList.contains("player_1") ||
    path.classList.contains("player_2")
  ) {
    path.style.opacity = 0;
    setTimeout(function () {
      path.style.display = "none";
    }, 500);
    if (turn_player == "player_1") {
      player_1_score = player_1_score + 1;
      player_1_score_bord.innerText = player_1_score;
    } else {
      player_2_score = player_2_score + 1;
      player_2_score_bord.innerText = player_2_score;
    }
  }
}

function player_key(path, offset_top_center, offset_left_center) {
  if (
    turn_player == "player_1" &&
    (path == player_1_key ||
      (path.classList.contains("player_2") &&
        if_any_on_key(player_1_key, player_2) == true))
  ) {
    player_2.forEach(function (elem, indx) {
      if (
        elem.offsetTop == offset_top_center &&
        elem.offsetLeft == offset_left_center
      ) {
        elem.style.opacity = 0;
        setTimeout(function () {
          elem.style.display = "none";
        }, 500);
        player_1_score = player_1_score + 1;
        player_1_score_bord.innerText = player_1_score;
      }
    });
  } else if (
    turn_player == "player_2" &&
    (path == player_2_key ||
      (path.classList.contains("player_1") &&
        if_any_on_key(player_2_key, player_1) == true))
  ) {
    player_1.forEach(function (elem, indx) {
      if (
        elem.offsetTop == offset_top_center &&
        elem.offsetLeft == offset_left_center
      ) {
        elem.style.opacity = 0;
        setTimeout(function () {
          elem.style.display = "none";
        }, 500);
        player_2_score = player_2_score + 1;
        player_2_score_bord.innerText = player_2_score;
      }
    });
  }
}

function if_in_corner() {
  let selected = document.querySelector(".selected");
  let condition = false;
  if (selected != undefined) {
    let offset_top_selected = selected.offsetTop;
    let offset_left_selected = selected.offsetLeft;
    corner_places.forEach(function (elem, indx) {
      let offset_top = elem.offsetTop;
      let offset_left = elem.offsetLeft;
      if (
        offset_top == offset_top_selected &&
        offset_left == offset_left_selected
      ) {
        condition = true;
      }
    });
  }

  if (condition == true) {
    return true;
  } else {
    return false;
  }
}

function if_any_on_key(place, player) {
  let condition = false;
  if (place != undefined) {
    let offset_top_place = place.offsetTop;
    let offset_left_place = place.offsetLeft;
    player.forEach(function (elem, indx) {
      let offset_top = elem.offsetTop;
      let offset_left = elem.offsetLeft;
      if (offset_top == offset_top_place && offset_left == offset_left_place) {
        condition = true;
      }
    });
  }

  if (condition == true) {
    return true;
  } else {
    return false;
  }
}
