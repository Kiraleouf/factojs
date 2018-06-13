var items = new Array();
var timeToSpawnMs = 200;
var lastSpawnTime = new Date().getTime();

window.onload = function(){
    setup();
}

function preload() {
}

function setup() {
  createCanvas(800, 600);
  columns = floor(width/50);
  rows = floor(height/50);
  rectMode(CENTER);
  frameRate(60)
  var col = color(223, 249, 251);
  
  for(var i =0 ; i < 100 ; i++){
   item = new Item();
   item.init()
   item.id = randomUUID();
   items.push(item);
  }
}

function draw() {
  background(0,0,0)
  //CRON TO SPAWN MONSTERS
  /*
  if(new Date().getTime() - lastSpawnTime > timeToSpawnMs && items.length < 20){
    item = new Item();
    item.init()
    item.id = randomUUID();
    items.push(item);
    lastSpawnTime = new Date().getTime();
  }
  */

  //CLEAR List
  items.forEach(function(item) {
    if(item.currentLife <= 0){
      var i = items.indexOf(item);
      if(i != -1) {
        console.log("Remove dead item");
        items.splice(i, 1);
      }
    }
  })

  //MOVE MONSTERS 
  if(items.length > 1){
    items.forEach(function(item) {
      if(item.target == undefined || item.target.currentLife==0){
        item.target = items[Math.floor(random(items.length))]
        while(item.target.id == item.id){
          console.log("can't focus myself search other target");
          item.target = items[Math.floor(random(items.length))]
        }
      }
      item.moveToTarget();
    })
  }

  //DRAW MONSTERS
  items.forEach(function(item) {
    item.draw()
  })

  //DRAW LINK
  items.forEach(function(item) {
    item.draw()
    item.drawLinkTarget()
  })
}

function findRandomTarget(){
  return items[random(items.length)]
}

function randomUUID(){
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};
