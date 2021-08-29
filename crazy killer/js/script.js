let player_1 = document.querySelectorAll(".player_1");
let player_2 = document.querySelectorAll(".player_2");
let player_1_score_bord = document.querySelector("#player_1_score");
let player_2_score_bord = document.querySelector("#player_2_score");
let player_1_score = 0;
let player_2_score = 0;
let slayer = document.querySelectorAll(".slayer");
let slayer_height_weight = 70;
let places = document.querySelectorAll(".place");
let center = document.querySelector("#center");
let player_1_key = document.querySelector("#player_1_key");
let player_2_key = document.querySelector("#player_2_key");
let turn_player;
let player_2_select_function_called = false;

function select_function () {
    slayer.forEach(function(slayer_item, index){
        slayer_item.addEventListener("click", function () {
            let selected = document.querySelector(".selected");
            if (turn_player == undefined || slayer_item.classList.contains(turn_player)) {
                if (selected != undefined){
                    selected.classList.remove("selected");
                }
                this.classList.add("selected");
                if (slayer_item.classList.contains("player_1")){
                    turn_player = "player_1";
                }else {
                    turn_player = "player_2";
                };

                movenment ();
            };
        });
    });
};
select_function ();

function mover (moveable) {
    moveable.forEach(function(place, index){
        place.addEventListener('click', function() {
            if (turn_player == "player_1" && (moveable == player_2 || moveable == places) || turn_player == "player_2" && (moveable == player_1 || moveable == places)) {
                let selected = document.querySelector(".selected");
                if (selected != undefined){
                    let offset_top = place.offsetTop;
                    let offset_left = place.offsetLeft;
                    let offset_top_center = center.offsetTop;
                    let offset_left_center = center.offsetLeft;
                    let offset_top_selected = selected.offsetTop;
                    let offset_left_selected = selected.offsetLeft;

                    if (selected.classList.contains("s_s")){
                        let top_left = offset_left_selected - slayer_height_weight == offset_left && offset_top_selected - slayer_height_weight == offset_top;
                        let top_right = offset_left_selected + slayer_height_weight == offset_left && offset_top_selected - slayer_height_weight == offset_top;
                        let bottom_left = offset_left_selected - slayer_height_weight == offset_left && offset_top_selected + slayer_height_weight == offset_top;
                        let bottom_right = offset_left_selected + slayer_height_weight == offset_left && offset_top_selected + slayer_height_weight == offset_top;

                        if (top_left == true || top_right == true || bottom_left == true || bottom_right == true) {
                            if ( !(moveable != places && offset_top_center == offset_top && offset_left_center == offset_left) ){
                                move();
                                eat_and_count();
                                player_key();
                            };
                        };
                    }
                    else {
                            // top
                        let top = offset_top_selected - slayer_height_weight * 2 == offset_top && offset_left_selected == offset_left;
                        let top_top_left = offset_top_selected - slayer_height_weight * 3 == offset_top && offset_left_selected - slayer_height_weight == offset_left;
                        let top_top_right = offset_top_selected - slayer_height_weight * 3 == offset_top && offset_left_selected + slayer_height_weight == offset_left;
                        let top_top = offset_top_selected - slayer_height_weight * 4 == offset_top && offset_left_selected == offset_left;
                        
                            // bottom
                        let bottom = offset_top_selected + slayer_height_weight * 2 == offset_top && offset_left_selected == offset_left;
                        let bottom_bottom_left = offset_top_selected + slayer_height_weight * 3 == offset_top && offset_left_selected - slayer_height_weight == offset_left;
                        let bottom_bottom_right = offset_top_selected + slayer_height_weight * 3 == offset_top && offset_left_selected + slayer_height_weight == offset_left;
                        let bottom_bottom = offset_top_selected + slayer_height_weight * 4 == offset_top && offset_left_selected == offset_left;

                            // left
                        let left = offset_left_selected - slayer_height_weight * 2 == offset_left && offset_top_selected == offset_top;
                        let left_left_top = offset_left_selected - slayer_height_weight * 3 == offset_left && offset_top_selected - slayer_height_weight == offset_top;
                        let left_left_bottom = offset_left_selected - slayer_height_weight * 3 == offset_left && offset_top_selected + slayer_height_weight == offset_top;
                        let left_left = offset_left_selected - slayer_height_weight * 4 == offset_left && offset_top_selected == offset_top;

                            // right
                        let right = offset_left_selected + slayer_height_weight * 2 == offset_left && offset_top_selected == offset_top;
                        let right_right_top = offset_left_selected + slayer_height_weight * 3 == offset_left && offset_top_selected - slayer_height_weight == offset_top;
                        let right_right_bottom = offset_left_selected + slayer_height_weight * 3 == offset_left && offset_top_selected + slayer_height_weight == offset_top;
                        let right_right = offset_left_selected + slayer_height_weight * 4 == offset_left && offset_top_selected == offset_top;

                            // corner
                        let top_left = offset_left_selected - slayer_height_weight == offset_left && offset_top_selected - slayer_height_weight == offset_top;
                        let top_left_top_left = offset_left_selected - slayer_height_weight * 2 == offset_left && offset_top_selected - slayer_height_weight * 2 == offset_top;
                        let top_right = offset_left_selected + slayer_height_weight == offset_left && offset_top_selected - slayer_height_weight == offset_top;
                        let top_right_top_right = offset_left_selected + slayer_height_weight * 2 == offset_left && offset_top_selected - slayer_height_weight * 2 == offset_top;
                        let bottom_left = offset_left_selected - slayer_height_weight == offset_left && offset_top_selected + slayer_height_weight == offset_top;
                        let bottom_left_bottom_left = offset_left_selected - slayer_height_weight * 2 == offset_left && offset_top_selected + slayer_height_weight * 2 == offset_top;
                        let bottom_right = offset_left_selected + slayer_height_weight == offset_left && offset_top_selected + slayer_height_weight == offset_top;
                        let bottom_right_bottom_right = offset_left_selected + slayer_height_weight * 2 == offset_left && offset_top_selected + slayer_height_weight * 2 == offset_top;

                        if (top == true || bottom == true || left == true || right == true || top_top == true && is_any("top") == true || top_top_left == true && is_any("top") == true || top_top_right == true && is_any("top") == true || bottom_bottom == true && is_any("bottom") == true || bottom_bottom_left == true && is_any("bottom") == true || bottom_bottom_right == true && is_any("bottom") == true || left_left == true && is_any("left") == true || left_left_top == true && is_any("left") == true || left_left_bottom == true && is_any("left") == true || right_right == true && is_any("right") == true || right_right_top == true && is_any("right") == true || right_right_bottom == true && is_any("right") == true || top_left == true || top_left_top_left == true && is_any("top_left") == true || top_left_top_left == true && is_any("top") == true || top_left_top_left == true && is_any("left") == true || top_right == true || top_right_top_right == true && is_any("top_right") == true || top_right_top_right == true && is_any("top") == true || top_right_top_right == true && is_any("right") == true || bottom_left == true || bottom_left_bottom_left == true && is_any("bottom_left") == true || bottom_left_bottom_left == true && is_any("bottom") == true || bottom_left_bottom_left == true && is_any("left") == true || bottom_right == true || bottom_right_bottom_right == true && is_any("bottom_right") == true || bottom_right_bottom_right == true && is_any("bottom") == true || bottom_right_bottom_right == true && is_any("right") == true) {
                            if ( !(moveable != places && offset_top_center == offset_top && offset_left_center == offset_left) ){
                                move();
                                eat_and_count();
                                player_key();
                            };
                        };
                    };
                
                    function is_any( place_condition ) {
                        let condition = true;
                        let that_place;
                        places.forEach(function(is_that_place, indx){
                            let offset_top_place = is_that_place.offsetTop;
                            let offset_left_place = is_that_place.offsetLeft;

                            if(place_condition == "top" && offset_top_selected - slayer_height_weight * 2 == offset_top_place && offset_left_selected == offset_left_place){
                                that_place = is_that_place;
                            }
                            else if (place_condition == "bottom" && offset_top_selected + slayer_height_weight * 2 == offset_top_place && offset_left_selected == offset_left_place){
                                that_place = is_that_place;
                            }
                            else if (place_condition == "left" && offset_left_selected - slayer_height_weight * 2 == offset_left_place && offset_top_selected == offset_top_place){
                                that_place = is_that_place;
                            }
                            else if (place_condition == "right" && offset_left_selected + slayer_height_weight * 2 == offset_left_place && offset_top_selected == offset_top_place){
                                that_place = is_that_place;
                            }
                            else if (place_condition == "top_left" && offset_left_selected - slayer_height_weight == offset_left_place && offset_top_selected - slayer_height_weight == offset_top_place){
                                that_place = is_that_place;
                            }
                            else if (place_condition == "top_right" && offset_left_selected + slayer_height_weight == offset_left_place && offset_top_selected - slayer_height_weight == offset_top_place){
                                that_place = is_that_place;
                            }
                            else if (place_condition == "bottom_left" && offset_left_selected - slayer_height_weight == offset_left_place && offset_top_selected + slayer_height_weight == offset_top_place){
                                that_place = is_that_place;
                            }
                            else if (place_condition == "bottom_right" && offset_left_selected + slayer_height_weight == offset_left_place && offset_top_selected + slayer_height_weight == offset_top_place){
                                that_place = is_that_place;
                            }
                        });
                        player_1.forEach(function(any, indx){
                            let place_top = that_place.offsetTop;
                            let place_left = that_place.offsetLeft;
                            let any_top = any.offsetTop;
                            let any_left = any.offsetLeft;
                            if (place_top == any_top && place_left == any_left) {
                                condition = false;
                            };
                        });
                        player_2.forEach(function(any, indx){
                            let place_top = that_place.offsetTop;
                            let place_left = that_place.offsetLeft;
                            let any_top = any.offsetTop;
                            let any_left = any.offsetLeft;
                            if (place_top == any_top && place_left == any_left) {
                                condition = false;
                            };
                        });
                        if(condition == false){
                            return false;
                        }else{
                            return true;
                        };
                    };
                    
                    function eat_and_count() {
                        if (moveable != places) {
                            place.style.opacity = 0;
                            setTimeout(function() {
                                place.style.display = "none";
                            }, 500);
                            if (turn_player == "player_1") {
                                player_1_score = player_1_score + 1;
                                player_1_score_bord.innerText = player_1_score;
                            }else {
                                player_2_score = player_2_score + 1;
                                player_2_score_bord.innerText = player_2_score;
                            };
                            if (player_1_score == 8) {
                                setTimeout(function() {
                                    alert ("player 1 won !");
                                }, 500);
                            }
                            else if (player_2_score == 8) {
                                setTimeout(function() {
                                    alert ("player 2 won !");
                                }, 500);
                            };
                        };
                    }

                    function player_key() {
                        if (turn_player == "player_1" && place == player_1_key) {
                            player_2.forEach( function(elem, indx) {
                                if (elem.offsetTop == offset_top_center && elem.offsetLeft == offset_left_center){
                                    elem.style.opacity = 0;
                                    setTimeout(function() {
                                        elem.style.display = "none";
                                    }, 500);
                                    player_1_score = player_1_score + 1;
                                    player_1_score_bord.innerText = player_1_score;
                                };
                            });
                        }
                        else if (turn_player == "player_2" && place == player_2_key) {
                            player_1.forEach( function(elem, indx) {
                                if (elem.offsetTop == offset_top_center && elem.offsetLeft == offset_left_center){
                                    elem.style.opacity = 0;
                                    setTimeout(function() {
                                        elem.style.display = "none";
                                    }, 500);
                                    player_2_score = player_2_score + 1;
                                    player_2_score_bord.innerText = player_2_score;
                                }
                            });
                        };
                    };

                    function move() {
                        selected.style.top = offset_top + "px";
                        selected.style.left = offset_left + "px";
                        selected.classList.remove("selected");
                        select_condition = false;
                        setTimeout(function(){
                            turn_function();
                        },10);
                    };
                };
            };
        });
    });
};

function movenment (){
    mover(places);
    if (turn_player == "player_1") {
        mover(player_2);
    }else {
        mover(player_1);
    }
};

function turn_function () {
    if (turn_player == "player_1") {
        player_1.forEach(function(slayer, index){
            slayer.classList.remove("slayer");
        });
        player_2.forEach(function(slayer, index){
            slayer.classList.add("slayer");
        });
        turn_player = "player_2";
    }else {
        player_1.forEach(function(slayer, index){
            slayer.classList.add("slayer");
        });
        player_2.forEach(function(slayer, index){
            slayer.classList.remove("slayer");
        });
        turn_player = "player_1";
    };
    slayer = document.querySelectorAll(".slayer");
    if (player_2_select_function_called == false) {
        select_function ();
        player_2_select_function_called = true;
    };
};