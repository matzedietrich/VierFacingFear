/* jslint esversion: 6 */
export default class Star{
    constructor(x, y, distance){
        this.x = x;
        this.y = y;
        this.pos;
        this.luminance = 255;
        this.maxLuminance = 255;
        this.size = 3/distance;
        this.speed = 0;
        this.speedIncrease = 0.01/distance;
        this.speedDecrease = 0.005/distance;
        this.blurFactor = 20/distance;
        this.degree = 0;
        this.radians = 0;
        this.angleChange = 0.2;
        this.lines = [];
    }

    createVector(p5){
        this.pos = p5.createVector(this.x,this.y);
    }
    
    update(p5){


        this.luminance = this.maxLuminance/(this.speed/2);
        this.radians = this.degree * Math.PI / 180;
        var changeVector = p5.createVector(Math.cos(this.radians),Math.sin(this.radians)).mult(this.speed);
        this.pos.add(changeVector);
        p5.fill(this.luminance);
        p5.stroke(this.luminance);
        p5.strokeWeight(this.size);


        this.lines.push([this.pos.x,this.pos.y,this.pos.x - changeVector.x,this.pos.y - changeVector.y]);

        let linelength = 0;

        for(var line in this.lines){
            linelength += p5.dist(this.lines[line][0],this.lines[line][1],this.lines[line][2],this.lines[line][3]); 
            p5.stroke((this.lines.indexOf(this.lines[line])/this.lines.length)*this.luminance);  
            p5.line(this.lines[line][0],this.lines[line][1],this.lines[line][2],this.lines[line][3]);
            if(linelength > p5.abs(this.speed)*this.blurFactor){
                this.lines.shift();
            }
        }






        if(p5.keyIsDown(87)){//up
            this.speed += this.speedIncrease;
        }
        
        
        if(p5.keyIsDown(83)){//down
            this.speed -= this.speedIncrease;
        }

        if(p5.keyIsDown(68)){//right
            this.degree += this.angleChange;
        }
        
        
        if(p5.keyIsDown(65)){//left
            this.degree -= this.angleChange;
        }


        if(this.speed > 0){
            this.speed -= this.speedDecrease;
        }

        if(this.speed < 0){
            this.speed += this.speedDecrease;
        }

    }


}
