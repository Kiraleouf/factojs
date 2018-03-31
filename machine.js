var Machine = function(id, posX, posY, rotation, machines, blockWidth,delay,intemWidth,maxItems, globalItemsList, itemAnim) {

    this.id = id;
    this.posX = posX;
    this.posY = posY;
    this.itemWidth = 10;
    this.rotation = rotation;
    this.numBlockX = posX/blockWidth;  
    this.numBlockY = posY/blockWidth;
    this.items = globalItemsList;
    this.blockWidth = blockWidth;
    var lastInput = Date.now();
    var delay = delay;
    var maxItems = maxItems;
    var itemAnim = itemAnim;

    this.present = function(x,y){
        for(var i=0;i<machines.length;i++){
            if(machines[i].posX == this.posX && machines[i].posY == this.posY){
                return true;
            }
        }
        return false;
    }

    this.drawMachineObjects = function(x,y,xDraw,yDraw,direction){
        stroke(0);
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
        if(lastInput == 0 || Date.now() - lastInput > delay){
            lastInput = Date.now();
            this.createInput();
        }
      }

    this.createInput = function(){
        if(items.length < maxItems){
            blocCountX = this.posX/this.blockWidth;
            blocCountY = this.posY/this.blockWidth;
            switch(this.rotation){
                case 0:
                    blocCountY--;
                break;
                case 1:
                    blocCountX++;
                break;
                case 2:
                    blocCountY++;
                break;
                case 3:
                    blocCountX--;
                break
            }
            var rX = random(blockWidth-this.itemWidth);
            var rY = random(blockWidth-this.itemWidth);
            this.items.push(new Item(this.randomUUID(),(blocCountX*blockWidth)+rX, (blocCountY*blockWidth)+rY,20,"baseGreenItem",itemAnim));
        }
    }

    this.randomUUID = function(){
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
          });
    }
}