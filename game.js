var direction = 'right';

var xStart = 0; //starting x coordinate for snake
var yStart = 250; //starting y coordinate for snake


var columns;
var blockWidth = 50;
var rows;
var currentDir = 0;

var trucs = new Array();

window.onload = function(){
    setup();
}

function setup() {
  createCanvas(1920, 1080);
  columns = floor(width/blockWidth);
  rows = floor(height/blockWidth);
  frameRate(60)
}

function draw() {
  drawGrid();
  drawPlayer();
  drawTrucs();
}

function mouseClicked() {
  var posX = Math.trunc(mouseX/blockWidth);
  var posY = Math.trunc(mouseY/blockWidth);
  //mouseX-(blockWidth/2), mouseY-(blockWidth/2),blockWidth, blockWidth
  var posToPlaceTheBlockX = (posX*blockWidth); 
  var posToPlaceTheBlockY = (posY*blockWidth); 
  var truc = new Truc(posToPlaceTheBlockX,posToPlaceTheBlockY,direction);
  if(!truc.present()){
    trucs.push(truc)
    console.log("pushed");
    
  }
}

function drawGrid(){
  for ( var i = 0; i < columns;i++) {
    for ( var j = 0; j < rows;j++) {
      fill(255); 
      stroke(0);
      rect(i*blockWidth, j*blockWidth,blockWidth, blockWidth);
    }
  }
}

function drawPlayer(){
  var posX = Math.trunc(mouseX/blockWidth);
  var posY = Math.trunc(mouseY/blockWidth);
  fill(color(255,0,0,120)); 
  var posToPlaceTheBlockX = (posX*blockWidth); 
  var posToPlaceTheBlockY = (posY*blockWidth); 
  drawPlayerObjects(posX,posY,posToPlaceTheBlockX,posToPlaceTheBlockY,currentDir)
}

function drawTrucs(){
  for(var i=0;i<trucs.length;i++){
    fill(color(255,255,25));
    rect(trucs[i].posX,trucs[i].posY,blockWidth,blockWidth);
  }
}

function drawPlayerObjects(x,y,xDraw,yDraw,direction){
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

function keyPressed() {
  console.log(keyCode);
  
  switch (keyCode) {
    case 82:
      console.log("worked");
      currentDir+=1;
      if(currentDir>3)currentDir=0;
      break;
  }
}



//=========================================================

var Truc = function(posX,posY,rotation) {
  this.name = "MAINTRUC";
  this.posX = posX ;
  this.posY = posY ;
  this.numBlockX = posX/blockWidth ;
  this.numBlockY = posY/blockWidth ;
  this.rotation = rotation;

  this.present = function(x,y){
    for(var i=0;i<trucs.length;i++){
      if(trucs[i].posX == this.posX && trucs[i].posY == this.posY){
        return true;
      }
    }
    return false;
  }
}