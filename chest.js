var Chest = function(posX, posY,itemSize, parentBlockWidth) {
    this.posX = posX*parentBlockWidth;
    this.posY = posY*parentBlockWidth;
    this.size = itemSize;
    this.blockWidth = parentBlockWidth;
    var golds = 0;

    this.draw = function(){
        stroke(color(240, 147, 43))
        fill(color(249, 202, 36))
        rect(this.posX+(this.blockWidth/2)-(this.size/2),this.posY+(this.blockWidth/2)-(this.size/2),this.size,this.size)
    }
};