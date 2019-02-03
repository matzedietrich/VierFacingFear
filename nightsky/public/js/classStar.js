/* jslint esversion: 6 */

export default class Star{
    constructor(x, y, distance, center){
        this.x = x;
        this.y = y;
        this.pos = 0;
        this.luminance = 255;
        this.maxLuminance = 255;
        this.size = 6/distance;
        this.speed = 0;
        this.speedIncrease = 0.1/distance;
        this.speedDecrease = 0.000/distance;
        this.blurFactor = 60/distance;
        this.degree = 0;
        this.radians = 0;
        this.angleChange = 1;
        this.lines = [];
        this.born = false;
        this.center = center;
        this.centerDistance = 0;
        this.xDistance = 0;
        this.yDistance = 0;
        this.direction = "straight";
    }

    createVector(p5){
        this.pos = p5.createVector(this.x, this.y);
    }
    
    update(p5){


        // berechnet die Distanz des Sterns zum gemeinsamen Mittelpunkt ("center")
        this.xDistance = this.center[0] - this.pos.x;
        this.yDistance = this.center[1] - this.pos.y;
        this.centerDistance = Math.sqrt(Math.pow(this.xDistance, 2) + Math.pow(this.yDistance, 2));  
        
        
        this.luminance = this.maxLuminance/(p5.abs(this.speed)/2);
        var changeVector = p5.createVector(Math.cos(this.radians), Math.sin(this.radians)).mult(this.speed);
        this.pos.add(changeVector);
        p5.fill(this.luminance);
        p5.stroke(this.luminance);
        p5.strokeWeight(this.size);


        this.lines.push([this.pos.x, this.pos.y, this.pos.x - changeVector.x, this.pos.y - changeVector.y]);

        let linelength = 0;

        for(var line in this.lines){
            linelength += p5.dist(this.lines[line][0], this.lines[line][1], this.lines[line][2], this.lines[line][3]); 
            p5.stroke((this.lines.indexOf(this.lines[line]) / this.lines.length) * this.luminance);  
            p5.line(this.lines[line][0], this.lines[line][1], this.lines[line][2], this.lines[line][3]);

            if(linelength > p5.abs(this.speed)*this.blurFactor){
                this.lines.shift();
            }
        }

        // Cberechnet die Geschwindigkeit des Sterns nach dem Tastendruck
        if(p5.keyIsDown(87)){// vorwärts
            this.speed += this.speedIncrease;
        }
        
        if(p5.keyIsDown(83)){// rückwärts
            this.speed -= this.speedIncrease;
        }


        // legt fest, in welche Richtung sich das Auto nach dem Tastendruck bewegt
        if(p5.keyIsDown(68)){ // rechts
            this.direction = "right";
        }
        else if(p5.keyIsDown(65)){ // links
            this.direction = "left";
        }
        else if(p5.keyIsDown(38)){ // geradeaus
            this.direction = "straight";
        }

        // berechnet den Winkel, in dem der Stern sich nun bewegen muss, um der Kurve zu folgen
        if(this.direction == "left"){
            this.radians = Math.asin((Math.sin(Math.PI/2) * this.xDistance) / this.centerDistance);
        }
        else if(this.direction == "right"){
            this.radians = (Math.asin((Math.sin(Math.PI/2) * this.xDistance / (this.centerDistance * (-1)))));
        }
        else{
            this.radians = 0;
        }   
    }
}
