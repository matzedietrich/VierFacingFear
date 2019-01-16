
/* jslint esversion: 6 */

var picture = loadImage('stars.png');
var x = width;
var speed = 1;



function draw(){
    clear();
    background(255);
    image(picture, x, 0, width, height);
    image(picture, x-width, 0, width, height);
    x = x - speed;
    if(x <= 0){
        x = width;
    }
}