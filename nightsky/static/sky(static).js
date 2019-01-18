
/* jslint esversion: 6 */

import Star from "./star.js";

var stars = [];
var starAmount = 100;


for(var i = 0; i < starAmount; i++){
    stars.push(new Star(random(0, width), random(0, height)));
}

for(var star in stars){
    if(star != undefined){
    stars[star].update();
}}