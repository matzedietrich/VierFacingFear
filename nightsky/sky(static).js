
/* jslint esversion: 6 */

import star from "star.js";

var stars = [];
var starAmount = 100;


for(var i = 0; i < starAmount; i++){
    stars.push(new star(random(0, width), random(0, height)));
}

for(let star in stars){
    star.update();
}