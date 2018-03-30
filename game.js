var direction = 'right';

var xStart = 0; //starting x coordinate for snake
var yStart = 250; //starting y coordinate for snake


var columns;
var blockWidth = 50;
var rows;
var currentDir = 0;
var player = new Player();
var items = new Array();

var money = 0;

var machines = new Array();

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
  player.drawPlayer();
  drawMachines();
  getItems();
  drawScore();
  drawGUI();
}

function drawGUI(){
  var col = color(223, 249, 251);
  var button = createButton('ADD ROBOT');
  button.style('background-color', col);
  button.position(width- 200, 100);
  button.mousePressed(addRobot);
}

function getItems(){
  items = new Array();
  for(var i =0;i< machines.length;i++){
    items = items.concat(machines[i].items)
  }
}

function drawMachines(){
  for(var i=0;i<machines.length;i++){
    machines[i].drawMachineObjects(0,0,machines[i].posX,machines[i].posY,machines[i].rotation);
    machines[i].drawInputs();
  }
}

function mouseClicked() {
  var posX = Math.trunc(mouseX/blockWidth);
  var posY = Math.trunc(mouseY/blockWidth);
  //mouseX-(blockWidth/2), mouseY-(blockWidth/2),blockWidth, blockWidth
  var posToPlaceTheBlockX = (posX*blockWidth); 
  var posToPlaceTheBlockY = (posY*blockWidth); 
  var machine = new Machine(posToPlaceTheBlockX,posToPlaceTheBlockY,currentDir,machines,this.blockWidth,1000,10);
  if(!machine.present()) machines.push(machine)
}

function addRobot(){
  console.log("add a robot");
  
}

function drawGrid(){
  for ( var i = 0; i < columns;i++) {
    for ( var j = 0; j < rows;j++) {
      fill(color(52, 73, 94)); 
      stroke(0);
      rect(i*blockWidth, j*blockWidth,blockWidth, blockWidth);
    }
  }
}

function drawScore(){
  fill(255, 255, 255);
  stroke(0)
  text('MONEY :'+ money, (width /2)-50 , 60);
  text('GOLDS FOUND :'+ this.items.length, (width /2)-50 , 80);
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