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
    var speed = 1;

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
        console.log(this.items.length);
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
        console.log(angleDeg);
        console.log("robot pos : "+posX +" "+posY);
        console.log("target pos : "+posX +" "+posY);
        
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

    }
}