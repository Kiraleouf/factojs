var Item = function(posX, posY) {
    this.posX = posX;
    this.posY = posY;
    this.isBusy = false;


    this.itemPop = function(){
        console.log("POPPED");
    }

    this.draw = function(size){
        stroke(255);
        fill(color(249, 202, 36))
        rect(this.posX, this.posY, size, size);
    }
};