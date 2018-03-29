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

    this.drawMachineObjects = function(x,y,xDraw,yDraw,direction){
        fill(color(142, 68, 173));
        rect(xDraw,yDraw,blockWidth,blockWidth);
        fill(color(0,0,0));
        switch(direction){
          case 0: 
            var baseX =xDraw+(blockWidth/2);
            var baseY = yDraw + 10
            triangle(baseX, baseY, baseX-5, baseY+5, baseX+5, baseY+5);
          break;
          case 1: 
            var baseX =xDraw+(blockWidth)-15;
            var baseY = yDraw+(blockWidth/2)
            triangle(baseX, baseY-5, baseX, baseY+5, baseX+5, baseY);
          break;
          case 2: 
          var baseX =xDraw+(blockWidth/2);
          var baseY = yDraw+blockWidth -20
          triangle(baseX, baseY+10, baseX-5, baseY+5, baseX+5, baseY+5);
          break;
          case 3: 
          var baseX =xDraw+15;
          var baseY = yDraw+(blockWidth/2)
          triangle(baseX, baseY-5, baseX, baseY+5, baseX-5, baseY);
          break;
        }
      }
}