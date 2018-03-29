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
  rect(posToPlaceTheBlockX,posToPlaceTheBlockY,blockWidth,blockWidth);
}

function drawTrucs(){
  for(var i=0;i<trucs.length;i++){
    fill(color(255,255,25));
    rect(trucs[i].posX,trucs[i].posY,blockWidth,blockWidth);
    triangle(x1,y1,x2,y2,x3,y3)
  }
}

function keyPressed() {
  switch (keyCode) {
    case 82:
      var posX = Math.trunc(mouseX/blockWidth);
      var posY = Math.trunc(mouseY/blockWidth);
      //mouseX-(blockWidth/2), mouseY-(blockWidth/2),blockWidth, blockWidth
      var posToPlaceTheBlockX = (posX*blockWidth); 
      var posToPlaceTheBlockY = (posY*blockWidth); 
      var truc = new Truc(posToPlaceTheBlockX,posToPlaceTheBlockY);
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