/* jslint esversion: 6 */

import Star from "./classStar.js";
import Moon from "./classMoon.js";

let stars = {};
let starAmount = 100;
let direction = "straight";
var center;
var moon;

var keybind = {
    up: 87,
    down: 83,
    right: 68,
    left: 65
};

var keystate = {
    up: false,
    down: false,
    right: false,
    left: false
};




new p5(function (p5) {

    p5.setup = function () {
        p5.createCanvas(p5.windowWidth, p5.windowHeight);   
        p5.frameRate(60); 
        center = [p5.windowWidth / 2, p5.windowHeight + 100];

        for(var i = 0; i < starAmount; i++){
            stars[i] = new Star(p5.random(-100,p5.windowWidth+100), p5.random(-100,p5.windowHeight+100), p5.random(1,3), center, direction);
            stars[i].createVector(p5);
        }

        moon = new Moon(p5.windowWidth/2, p5.windowHeight/2);
        moon.createVector(p5);


    };

    p5.windowResized = function () {
        p5.resizeCanvas(p5.windowWidth, p5.windowHeight);   
    };

    p5.preload = function () {

    };

/*p5.keyPressed = function () {
        for (var key in keybind) {
            if (p5.keyCode == keybind[key]) {
                keystate[key] = true;
            }
        }

        socket.emit('keystate updated', keystate);
    }

    p5.keyReleased = function () {
        for (var key in keybind) {
            if (p5.keyCode == keybind[key]) {
                keystate[key] = false;
            }
        }

        socket.emit('keystate updated', keystate);

    }
    */


    p5.draw = function () {
        p5.background(0);
        p5.angleMode(p5.DEGREES);

        for(var star in stars){
            stars[star].update(p5);
            if(stars[star].pos.x < -100){
                stars[star].pos.x = p5.windowWidth + 100;

            }
            if(stars[star].pos.x > p5.windowWidth + 100){
                stars[star].pos.x = -100;
            }
            if(stars[star].pos.y < -100){
                stars[star].pos.y = p5.windowHeight + 100;

            }
            if(stars[star].pos.y > p5.windowHeight + 100){
                stars[star].pos.y = -100;
            }
        }

            moon.update(p5);

            console.log(stars[0].center);
    };

    // Calculate angle of rotation
    p5.keyPressed = function(){
        if(p5.keyCode == 68){//left
            center = [p5.windowWidth / 2, p5.windowHeight + 100];
        }
        if(p5.keyCode == 65){//right
            center = [p5.windowWidth / 2, -100];
        }
        for(var i = 0; i < starAmount; i++){
            stars[i].center = center;
        }
    };
});