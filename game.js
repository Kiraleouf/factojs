var direction = 'right';

var xStart = 0; //starting x coordinate for snake
var yStart = 250; //starting y coordinate for snake


var columns;
var blockWidth = 50;
var rows;
var currentDir = 0;
var player = new Player();
var chest = new Chest(1,1,30,blockWidth);

var items = new Array();
var robots = new Array();
var machines = new Array();

var money = 0;


window.onload = function(){
    setup();
}

function setup() {
  createCanvas(1920, 1080);
  columns = floor(width/blockWidth);
  rows = floor(height/blockWidth);
  frameRate(60)

  var col = color(223, 249, 251);
  var button = createButton('ADD ROBOT');
  button.style('background-color', col);
  button.position(width- 200, 100);
  button.mousePressed(addRobot);
}

function draw() {
  drawGrid();
  drawChest();
  drawMachines();
  getItems();
  getRobots()
  player.drawPlayer();
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

function mouseClicked() {
  var posX = Math.trunc(mouseX/blockWidth);
  var posY = Math.trunc(mouseY/blockWidth);
  //mouseX-(blockWidth/2), mouseY-(blockWidth/2),blockWidth, blockWidth
  var posToPlaceTheBlockX = (posX*blockWidth); 
  var posToPlaceTheBlockY = (posY*blockWidth); 
  var machine = new Machine(posToPlaceTheBlockX,posToPlaceTheBlockY,currentDir,machines,this.blockWidth,5000,10,10);
  if(!machine.present()) machines.push(machine)
}

function addRobot(){
  console.log("buy a robot");
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
  text('MONEY :'+ this.chest.golds, (width /2)-50 , 60);
  var count=0;
  for(var i=0;i< this.robots.length;i++){
    if(this.robots[i].isActive()){
      count++;
    }
  }
  text('ROBOTS ACTIVITY:'+ count +"/"+this.robots.length, (width /2)-50 , 100);
}

function keyPressed() {
  switch (keyCode) {
    case 82:
      currentDir+=1;
      if(currentDir>3)currentDir=0;
      break;
    case 69:
      spawnRobot()
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