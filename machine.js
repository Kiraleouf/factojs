var Machine = function(posX, posY, rotation, machines, blockWidth) {

    this.posX = posX;
    this.posY = posY;
    this.rotation = rotation;
    this.numBlockX = posX/blockWidth;  
    this.numBlockY = posY/blockWidth;
    this.timestamp = Math.floor(Date.now() / 1000);
    this.items = [];
    this.blockWidth = blockWidth;

    this.present = function(x,y){
        for(var i=0;i<machines.length;i++){
            if(machines[i].posX == this.posX && machines[i].posY == this.posY){
                return true;
            }
        }
        return false;
    }

    this.drawMachineObjects = function(x,y,xDraw,yDraw,direction){
        fill(color(142, 68, 173));
        rect(xDraw,yDraw,this.blockWidth,this.blockWidth);
        fill(color(0,0,0));
        switch(direction){
          case 0: 
            var baseX =xDraw+(this.blockWidth/2);
            var baseY = yDraw + 10
            triangle(baseX, baseY, baseX-5, baseY+5, baseX+5, baseY+5);
          break;
          case 1: 
            var baseX =xDraw+(this.blockWidth)-15;
            var baseY = yDraw+(this.blockWidth/2)
            triangle(baseX, baseY-5, baseX, baseY+5, baseX+5, baseY);
          break;
          case 2: 
          var baseX =xDraw+(this.blockWidth/2);
          var baseY = yDraw+this.blockWidth -20
          triangle(baseX, baseY+10, baseX-5, baseY+5, baseX+5, baseY+5);
          break;
          case 3: 
          var baseX =xDraw+15;
          var baseY = yDraw+(this.blockWidth/2)
          triangle(baseX, baseY-5, baseX, baseY+5, baseX-5, baseY);
          break;
        }
      }

    this.createInput = function(ts){
        if(ts - 3 > this.timestamp){
            switch(this.rotation){
                case 0:
                    this.items.push(new Item(this.posX + this.blockWidth, this.posY + this.blockWidth));
                break;
                case 1:
                    this.items.push(new Item(this.posX, this.posY + this.blockWidth));
                break;
                case 2:
                    this.items.push(new Item(this.posX, this.posY - this.blockWidth));
                break;
                case 3:
                    this.items.push(new Item(this.posX - this.blockWidth, this.posY - this.blockWidth));
                break
            }
            this.timestamp = ts;
        }
    }

    this.drawInputs = function(){
        for(var i = 0; i < this.items.length; i++){
            this.items[i].draw(this.blockWidth / 4);
        }    
    }
}