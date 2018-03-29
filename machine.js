var Machine = function(posX, posY, rotation, machines) {

    this.posX = posX;
    this.posY = posY;
    this.rotation = rotation;
    this.numBlockX = posX/blockWidth;  
    this.numBlockY = posY/blockWidth;

    this.present = function(x,y){
        for(var i=0;i<machines.length;i++){
            if(machines[i].posX == this.posX && machines[i].posY == this.posY){
                return true;
            }
        }
        return false;
    }

}