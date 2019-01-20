/* jslint esversion: 6 */
export default class Moon{
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.pos;
        this.size = 50;
        this.luminance = 255;
    }

    createVector(p5){
        this.pos = p5.createVector(this.x,this.y);
    }
    
    update(p5){
    

    
        

        p5.translate(p5.windowWidth/2,p5.windowHeight/2);
        p5.rotate(this.degree);
        p5.strokeWeight(0);
        p5.fill(this.luminance);
        p5.ellipse(0,0,this.size);
        p5.fill(0);
        p5.ellipse(0-this.size/4,0,this.size);



    
    



}
}