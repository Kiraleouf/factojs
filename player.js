var Player = function() {
    this.drawPlayer = function(winWidth, winHeight, cols, rows){
        var posX = Math.trunc(mouseX/blockWidth);
        var posY = Math.trunc(mouseY/blockWidth);
        var posToPlaceTheBlockX = (posX*blockWidth); 
        var posToPlaceTheBlockY = (posY*blockWidth); 

        if(((posToPlaceTheBlockX + blockWidth) < winWidth) && ((posToPlaceTheBlockY + blockWidth) < winHeight)){
          drawPlayerObjects(posX,posY,posToPlaceTheBlockX,posToPlaceTheBlockY,currentDir)
        }
    }

    function drawPlayerObjects(x,y,xDraw,yDraw,direction){
        fill(color(192, 57, 43,120)); 
        rect(xDraw,yDraw,blockWidth,blockWidth);
        switch(direction){
          case 0: 
            var baseX =xDraw+(blockWidth/2);
            var baseY = yDraw-(blockWidth/2)+10
            triangle(baseX, baseY, baseX-5, baseY+5, baseX+5, baseY+5);
          break;
          case 1: 
            var baseX =xDraw+(blockWidth)+10;
            var baseY = yDraw+(blockWidth/2)
            triangle(baseX, baseY-5, baseX, baseY+5, baseX+5, baseY);
          break;
          case 2: 
          var baseX =xDraw+(blockWidth/2);
          var baseY = yDraw+(blockWidth)+5
          triangle(baseX, baseY+10, baseX-5, baseY+5, baseX+5, baseY+5);
          break;
          case 3: 
          var baseX =xDraw-10;
          var baseY = yDraw+(blockWidth/2)
          triangle(baseX, baseY-5, baseX, baseY+5, baseX-5, baseY);
          break;
        }
      }
}