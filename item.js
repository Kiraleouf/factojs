var Item = function(posX, posY,itemSize) {
    this.posX = posX;
    this.posY = posY;
    this.isBusy = false;
    this.color = color(249, 202, 36);
    this.size = itemSize;


    this.itemPop = function(){
        console.log("POPPED");
    }

    this.draw = function(){
        stroke(255);
        fill(this.color)
        rect(this.posX, this.posY, this.size, this.size);
    }
};