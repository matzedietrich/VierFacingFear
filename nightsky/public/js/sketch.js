/* jslint esversion: 6 */

import Star from "./classStar.js";

let stars = {};
let starAmount = 100;
let direction = "straight";
var center;

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

        // erstellt eine festgelegte Anzahl an Sternen mit zufälligen Positionen
        for(var i = 0; i < starAmount; i++){
            stars[i] = new Star(p5.random(-100, p5.windowWidth + 100), p5.random(-100, p5.windowHeight + 100), p5.random(1, 3), center, direction);
            stars[i].createVector(p5);
        }



    };

    p5.windowResized = function () {
        p5.resizeCanvas(p5.windowWidth, p5.windowHeight);   
    };

    p5.preload = function () {

    };

    p5.draw = function () {
        p5.background(0);
        p5.angleMode(p5.DEGREES);

        for(var star in stars){
            stars[star].update(p5);

            // lässt einen Stern, der auf einer Seite den Canvas verlässt, auf der gegenüberliegenden Seite wieder eintreten
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
    };

    // legt fest, auf welcher Seite der Mittelpunkt der Rotation liegen soll
    p5.keyPressed = function(){
        if(p5.keyCode == 68){ // links
            center = [p5.windowWidth / 2, p5.windowHeight + 100];
        }
        if(p5.keyCode == 65){ // rechts
            center = [p5.windowWidth / 2, -100];
        }
        for(var i = 0; i < starAmount; i++){ // übergibt den Sternen den neuen Mittelpunkt
            stars[i].center = center;
        }
    };
});