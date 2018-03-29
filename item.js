var Item = function(posX, posY) {
    this.positionX = posX;
    this.positionY = posY;

    this.itemPop = function(){
        console.log("POPPED");
    }

    this.draw = function(size){
        rect(this.positionX, this.positionY, size, size);
    }
};