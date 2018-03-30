var Item = function(posX, posY) {
    this.positionX = posX;
    this.positionY = posY;

    this.itemPop = function(){
        console.log("POPPED");
    }

    this.draw = function(size){
        stroke(255);
        fill(color(249, 202, 36))
        rect(this.positionX, this.positionY, size, size);
    }
};