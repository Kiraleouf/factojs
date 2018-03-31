var Robot = function(roboportPosX,roboportPosY,width, blockSize,mainChest) {
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
    var searchChest = false;
    var items = new Array();
    var speed = 3;
    var chest = mainChest;

    this.draw = function(){
        if(active) {
            fill(color(0, 151, 230))
            stroke(0)
            ellipse(posX+(blockWidth/2), posY+(blockWidth/2), blockWidth, blockWidth);
        }
        if(!active){
            this.findTarget();
        }else{
            this.goToObject();
        }
    }

    this.findTarget = function(){
        for(var i=0;i<this.items.length;i++){
            if(!this.items[i].isBusy){
                target = this.items[i];
                this.items[i].isBusy = true;
                active = true;
                this.items[i].color = color(0,255,0);
                return;
            }
        }
    }

    this.goToObject = function(){
        fill(color(255,0,0,120))
        line(target.posX+(target.size/2), target.posY +(target.size/2), posX+(blockWidth/2), posY+(blockWidth/2))
        var angleDeg = Math.atan2(target.posY - posY, target.posX - posX) * 180 / Math.PI;
        
        if(posX < target.posX){
            var dist = target.posX - posX;
            if(dist < 10) posX += dist
            else posX += speed;
        }else if(posX > target.posX){
            var dist = posX - target.posX ; 
            if(dist < 10) posX -= dist;
            else posX -= speed;
        }
        if(posY < target.posY){
            var dist = target.posY - posY; 
            if(dist < 10) posY += dist;
            else posY += speed;
        }else if(posY > target.posY){
            var dist = posY - target.posY; 
            if(dist < 10) posY -= dist
            else posY -= speed;
        }
        if(posX == target.posX && posY == target.posY){
            searchChest = true;
        }
        if(searchChest) this.goToChest();
    }

    this.goToChest = function(){
        fill(color(255,0,0,120))
        line(chest.posX+(baseBlockWidth/2), chest.posY +(baseBlockWidth/2), posX+(blockWidth/2), posY+(blockWidth/2))
        var angleDeg = Math.atan2(target.posY - posY, target.posX - posX) * 180 / Math.PI;
        
        if(posX < chest.posX+(chest.size/2)){
            var dist = chest.posX+(chest.size/2) - posX;
            if(dist < 10) {
                posX += dist;
                target.posX +=dist;
            }else {
                posX += speed;
                target.posX += speed;
            }
        }else if(posX > chest.posX+(chest.size/2)){
            var dist = posX - chest.posX+(chest.size/2) ; 
            if(dist < 10) {
                posX -= dist;
                target.posX -= dist;
            } else {
                posX -= speed;
                target.posX -= speed;
            }
        }
        if(posY < chest.posY+(chest.size/2)){
            var dist = chest.posY+(chest.size/2) - posY; 
            if(dist < 10) {
                posY += dist;
                target.posY += dist;
            } else {
                posY += speed;
                target.posY += speed;
            }
        }else if(posY > chest.posY+(chest.size/2)){
            var dist = chest.posX+(chest.size/2) - chest.posY; 
            if(dist < 10) {
                posY -= dist;
                target.posY -= dist;
            } else {
                posY -= speed;
                target.posY -= speed;
            }
        }
        if(posY == chest.posY+(chest.size/2) && posX == chest.posX+(chest.size/2)){
            active =false;
            searchChest = false;
            chest.gold ++;
            target = null;
        }
    }
}