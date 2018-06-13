var items = new Array();
var heals = new Array();

var mobAtSpawn = 15;
var mobOnWave = 5;

//Temps de spawn des monstres en ms
var timeToSpawnMs = 5000;
//Temps de spawn des heals en ms
var timeToSpawnHealMs = 2000;
var lastHealSpawnTime = new Date().getTime();
var lastSpawnTime = new Date().getTime();
var healHeight = 0;
var healHeight = 0;

window.onload = function(){
}

function preload() {
}

function setup() {
  createCanvas(1000, 600);
  columns = floor(width/50);
  rows = floor(height/50);
  rectMode(CENTER);
  frameRate(60)
  var col = color(223, 249, 251);

  createHealArea()
  
  for(var i =0 ; i < mobAtSpawn ; i++){
    createItem();
  }
}

function draw() {
  if(items.length==1){
    //FIN DU GAME TU FE QUOI ?
  }
  background(0,0,0)
  //CRON TO SPAWN MONSTERS

  if(new Date().getTime() - lastSpawnTime > timeToSpawnMs && items.length < 20){
    for(var i =0 ; i < mobOnWave ; i++){
      createItem();
    }
    lastSpawnTime = new Date().getTime();
  }

  if(new Date().getTime() - lastHealSpawnTime > timeToSpawnHealMs && heals.length < 3){
    heal = new Heal();
    heal.init()
    heal.id = randomUUID();
    heals.push(heal);
    lastHealSpawnTime = new Date().getTime();
  }
  //CLEAR Lists
  items.forEach(function(item) {
    if(item.currentLife <= 0){
      var i = items.indexOf(item);
      if(i != -1) {
        items.splice(i, 1);
      }
    }
  })
  heals.forEach(function(heal) {
    if(heal.isOver()){
      var i = heals.indexOf(heal);
      if(i != -1) {
        heals.splice(i, 1);
      }
    }
  })

  //MOVE MONSTERS 
  if(items.length > 1 || heals.length > 1){
    computeItems();
  }

  //DRAW MONSTERS
  items.forEach(function(item) {
    item.draw()
  })

  //DRAW HEALS
  heals.forEach(function(heal) {
    heal.draw()
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

function createHealArea(){
  healWidth = width/10;
  healHeight = height/10;
  fill(255,0,0);
  rect(0,0,healWidth,healHeight);
}

function createItem(){
  item = new Item();
  item.init()
  item.id = randomUUID();
  items.push(item);
}


function createHeals(){
  item = new Item();
  item.init()
  item.id = randomUUID();
  items.push(item);
}

function computeItems(){
  items.forEach(function(item) {
    var targetHeal = item.target instanceof Heal
    if(item.target == undefined){
      if(items.length>1){
        item.target = items[Math.floor(random(items.length))]
        while(item.target.id == item.id){
          item.target = items[Math.floor(random(items.length))]
        }
      }
    }else if (item.shouldHeal){
      if(!targetHeal){
        item.target = getRandomHeal()
      }
    }
    item.moveToTarget();
    item.compute();
  })
}

function getRandomHeal(){
  return heals[Math.floor(random(heals.length))]
}
