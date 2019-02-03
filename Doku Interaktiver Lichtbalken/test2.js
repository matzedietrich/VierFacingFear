/* jslint esversion: 6 */


class Lichtbalken{
    constructor(x, y, backWidth, backHeight){
        this.x = x;
        this.y = y;
        this.backWidth = backWidth;
        this.backHeight = backHeight;
        this.frontWidth = 60;
        this.frontHeight = backHeight;
        this.mouseDistance = 0;
    }

    show(){ // malt den Hintergrund des Balkens auf den Canvas
        fill(0);
        rect(this.x, this.y, this.backWidth, this.backHeight);
    }

    update(){ // malt den leuchtenden Teil des Balkens auf dessen Hintergrund und updated seine Position

        // brerechnet die Position die Helligkeit des leuchtenden Teils
        if(mouseY < this.x){
            this.mouseDistance = this.y - mouseY;
        }
        else{
           this.mouseDistance = mouseY - this.y;
        }
        if(this.backHeight.mouseDistance > 255){
            this.mouseDistance = 255;
        }

        // berechnet die Position des leuchtenden Teils
        for(var i = this.frontWidth; i >= 0; i -= 5){ // die Schleife sorgt für einen Farbverlauf
            fill(0, 0, 255 - this.mouseDistance, 255 - i * 6);
            rect(mouseX - (i / 2), this.y, i + 5, this.frontHeight);
        }
    }
}

let balken = new Lichtbalken(50, 50, 500, 50);

function draw(){
    clear();
    noStroke();

    balken.show();    
    balken.update();
}