/* jslint esversion: 6 */
import Star from "./star.js";

var stars = [];
var starAmount = 50;

function setup(){
    createCanvas(1400,500);
    for (var i = 0; i < starAmount; i++) {
        stars.push(new Star(p5.random(0, width), p5.random(0, height)));
    }
    
    for (let star in stars) {
        //stars[star].update();
    }
}


function draw(){
    background(0);
    fill(100);
    ellipse(20,20,10);
}