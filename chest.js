var Chest = function(posX, posY,itemSize, parentBlockWidth,img) {
    this.posX = posX*parentBlockWidth;
    this.posY = posY*parentBlockWidth;
    this.size = itemSize;
    this.blockWidth = parentBlockWidth;
    this.golds =0;
    this.image = img

    this.draw = function(){
        image(this.image,this.posX+(this.blockWidth/2)-(this.size/2),this.posY+(this.blockWidth/2)-(this.size/2),this.size,this.size)
    }
};