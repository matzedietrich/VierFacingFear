/* jslint esversion: 6 */

export default class Star {
    constructor(x, y){
        this.pos = createVector(x, y);
        this.size = 3;
        this.luminance = 255;
    }

    update(){
        fill(this.luminance);
        ellipse(this.pos.x, this.pos.y, this.size);
    }
}