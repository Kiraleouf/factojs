var direction = 'right';

var xStart = 0; //starting x coordinate for snake
var yStart = 250; //starting y coordinate for snake


var columns;
var blockWidth = 30;
var rows;
var currentDir = 0;
var player = new Player();
var chest = new Chest(1,1,30,blockWidth);

var items = new Array();
var robots = new Array();
var machines = new Array();
var belts = new Array();

var ihmInv = new Array();

var handledItem;

var money = 0;
var baseRobotUnitCost = 50;


window.onload = function(){
    setup();
}

function setup() {
  createCanvas(windowWidth/2, windowHeight/2);
  columns = floor(width/blockWidth);
  rows = floor(height/blockWidth);
  frameRate(60)

  var col = color(223, 249, 251);
  var button = createButton('ADD ROBOT');
  button.style('background-color', col);
  button.position(width - (button.width/2), height + 10);
  button.mousePressed(addRobot);
}

function draw() {
  drawGrid();
  drawChest();
  drawMachines();
  drawBelts();
  getItems();
  getRobots()
  player.drawPlayer(width,height, columns, rows);
  drawScore();
}

function drawChest(){
  chest.draw();
}


function getItems(){
  items = new Array();
  for(var i =0;i< machines.length;i++){
    items = items.concat(machines[i].items)
  }
  for(j=0;j<items.length;j++){
    if(items[j].over){
      //TODO remove item
    }
  }
}
function getRobots(){
  for(var i =0;i< robots.length;i++){
    robots[i].items = items
    robots[i].draw()
  }
}

function drawMachines(){
  for(var i=0;i<machines.length;i++){
    machines[i].drawMachineObjects(0,0,machines[i].posX,machines[i].posY,machines[i].rotation);
    machines[i].drawInputs();
  }
}

function drawBelts(){
  for(var i = 0; i < belts.length; i++){
    belts[i].draw();
  }
}

function mouseClicked() {
  var posX = Math.trunc(mouseX/blockWidth);
  var posY = Math.trunc(mouseY/blockWidth);
  //mouseX-(blockWidth/2), mouseY-(blockWidth/2),blockWidth, blockWidth
  var posToPlaceTheBlockX = (posX*blockWidth); 
  var posToPlaceTheBlockY = (posY*blockWidth); 

  if(((posToPlaceTheBlockX + blockWidth) < width) && ((posToPlaceTheBlockY + blockWidth) < height)){
    var machine = new Machine(posToPlaceTheBlockX,posToPlaceTheBlockY,currentDir,machines,this.blockWidth,5000,10,10);
    if(!machine.present()) machines.push(machine)
  } 
}

function addRobot(){
  console.log("buy a robot");
  if(robots.length == 0 ){
    spawnRobot();
  }else{
    if(chest.getGolds() >= robots.length * baseRobotUnitCost){
      chest.setGolds(chest.getGolds() - (robots.length * baseRobotUnitCost));
      spawnRobot();
    }
  }
  return false;
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
  fill(0);
  stroke(0)
  text('MONEY: '+ this.chest.getGolds(), (width /2)-100 , height - 5);
  
  var count=0;
  for(var i=0;i< this.robots.length;i++){
    if(this.robots[i].isActive()){
      count++;
    }
  }

  text('ROBOTS ACTIVITY: '+ count +" / "+this.robots.length, (width /2)-30 , height - 5);
}

function keyPressed() {
  switch (keyCode) {
    case 49:
      console.log("1");
      handledItem = ihmInv[0];
      break;
    case 50:
      console.log("2");
      handledItem = ihmInv[1];
      break;
    case 51:
      console.log("3");
      handledItem = ihmInv[2];
      break;
    case 52:
      console.log("4");
      handledItem = ihmInv[3];
      break;
    case 53:
      console.log("5");
      handledItem = ihmInv[4];
      break;
    case 54:
      console.log("6");
      handledItem = ihmInv[5];
      break;
    case 55:
      console.log("7");
      handledItem = ihmInv[6];
      break;
    case 56:
      console.log("8");
      handledItem = ihmInv[7];
      break;
    case 57:
      console.log("9");
      handledItem = ihmInv[8];
      break;
    case 82:
      currentDir+=1;
      if(currentDir>3)currentDir=0;
      break;
    case 69:
      //spawnRobot()
      break;
  }
}

function spawnRobot(){
  var posX = Math.trunc(mouseX/blockWidth);
  var posY = Math.trunc(mouseY/blockWidth);
  //mouseX-(blockWidth/2), mouseY-(blockWidth/2),blockWidth, blockWidth
  var posToPlaceTheBlockX = (posX*blockWidth); 
  var posToPlaceTheBlockY = (posY*blockWidth); 
  var robot = new Robot(posToPlaceTheBlockX,posToPlaceTheBlockY,20,this.blockWidth,chest);
  robots.push(robot)
}