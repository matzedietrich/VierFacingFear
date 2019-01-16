new p5();

width = windowWidth;
height = windowHeight;

function setup() {
    createCanvas(windowWidth, windowHeight);
    frameRate(30);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    clear();
}
  