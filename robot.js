var Robot = function(roboportPosX,roboportPosY,width, blockSize) {
    // Targer is an Item object type 
    // if null robot is innactive
    var target;
    var spawnPosX = roboportPosX;
    var spawnPosY = roboportPosY;
    var posX = roboportPosX;
    var posY = roboportPosY;
    var blockWidth = width;
    var baseBlockWidth = blockSize;
    var active = false;
    var items = new Array();

    this.draw = function(){
        if(active) {
            fill(color(0, 151, 230))
            stroke(0)
            ellipse(posX+(baseBlockWidth/2), posY+(baseBlockWidth/2), blockWidth, blockWidth);
        }
        if(!active){
            this.findTarget();
        }else{
            this.goToObject();
        }
    }

    this.findTarget = function(){
        console.log(this.items.length);
        for(var i=0;i<this.items.length;i++){
            if(!this.items[i].isBusy){
                target = this.items[i];
                this.items[i].isBusy = true;
                active = true;
                return;
            }
        }
    }

    this.goToObject = function(){
        var angleDeg = Math.atan2(target.posY - posY, target.posX - posX) * 180 / Math.PI;
        console.log(angleDeg);
        
    }
}