var items=new Array();
var heals = new Array();

var mobAtSpawn = 5;
var mobOnWave = 5;
var healOnWave = 10;

var maxMobByTeam = 10;
var maxHealOnMap = 1;

//Temps de spawn des monstres en ms
var timeToSpawnMs = 100
var timeToSpawnHealMs = 2000;
var lastHealSpawnTime = new Date().getTime();
var lastSpawnTime = new Date().getTime();
var healHeight = 0;
var healHeight = 0;
var spawnMoreSmallsMobs = true;
var maxLevel = 0;
var currentSpeed = 2;

var graph;

window.onload = function(){
}

function preload() {
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  var paragraphs = document.getElementsByTagName("p");
  for (var i = 0; i < paragraphs.length; i++) {
    var paragraph = paragraphs.item(i);
    paragraph.style.setProperty("color", "white", null);
  }
  rectMode(CENTER);
  frameRate(60)
  var col = color(223, 249, 251);
  //Array RED TEAM
  items[0] = new Array();
  //Array BLUE TEAM
  items[1] = new Array();
  
  for(var i =0 ; i < mobAtSpawn ; i++){
    createItem(0);
    createItem(1);
  }
  graph = new Graph();
  graph.init(); 
}

function draw() {
  rectMode(CORNER);
  getMaxLevel()
  if(items.length==1){
    //FIN DU GAME TU FE QUOI ?
  }
  background(244, 140, 66);
  
  fill(183, 60, 60);
  rect(0,0, width/10,height)
  fill(60, 107, 183);
  rect((width/10*9),0,(width/10) ,height)

  rectMode(CENTER);
  //DRAW HEALS
  heals.forEach(function(heal) {
    heal.draw()
  })

  //CRON TO SPAWN MONSTERS
  if(new Date().getTime() - lastSpawnTime > timeToSpawnMs){
    for(var i =0 ; i < mobOnWave ; i++){
      if(items[0].length < maxMobByTeam) createItem(0);
      if(items[1].length < maxMobByTeam) createItem(1);
      lastSpawnTime = new Date().getTime();
    }
    //mobOnWave++;
  }
  

  if(new Date().getTime() - lastHealSpawnTime > timeToSpawnHealMs && heals.length < 3){
    
    for(var i =0 ; i < healOnWave ; i++){
      createHeals();
    }
    if(heals.length < maxHealOnMap){
      healOnWave++;
    }
    lastHealSpawnTime = new Date().getTime();
  }
  //CLEAR Lists
  clearList(0)
  clearList(1)

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
    computeItems(0);
    computeItems(1);
  }

  //DRAW MONSTERS
  items[0].forEach(function(item) {
    item.draw(0)
  })

  items[1].forEach(function(item) {
    item.draw(1)
  })

  //DRAW LINK
  items[0].forEach(function(item) {
    //item.drawLinkTarget()
  })
  items[1].forEach(function(item) {
   // item.drawLinkTarget()
  })
  graph.drawScore();
}

function randomUUID(){
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

function createItem(team){
  item = new Item();
  var current = item.init(maxLevel,team)
  item.id = randomUUID();
  items[team].push(item);
  if(current.level < maxLevel && items[team].length < maxMobByTeam){
    for(var i=0; i< maxLevel/current.level;i++){
      item = new Item();
      item.initWithLevel(current.level,team)
      item.id = randomUUID();
      items[team].push(item);
    }
  }
}

function clearList(team){
  items[team].forEach(function(item) {
    if(item.currentLife <= 0){
      var i = items[team].indexOf(item);
      if(i != -1) {
        items[team].splice(i, 1);
        graph.addScore(team==0 ? 1 : 0)
      }
    }
  })
}
function createHeals(){
  heal = new Heal();
  heal.init()
  heal.id = randomUUID();
  heals.push(heal);
}

function computeItems(team){
  if(team==0) target = 1;
  else target = 0;
  items[team].forEach(function(item) {
    var targetHeal = item.target instanceof Heal
    if(item.target instanceof Item){
      if(item.target.currentLife <=0) item.target = undefined;
    }else if(targetHeal && (item.shouldHeal==false||item.target.isOver())){
      item.target = undefined;
    }
    if(item.target == undefined && items[target].length>0 && !item.shouldHeal){
      item.target = items[target][Math.floor(random(items.length))]
    }else if (item.shouldHeal){
      if(!targetHeal){
        item.target = getRandomHeal()
      }
    }
    item.moveToTarget();
    item.compute();
  })
}

function getMaxLevel(){
  items[0].forEach(item => {
    item.setSpeed(currentSpeed)
    if(item.level > maxLevel){
      maxLevel = item.level;
    }
  });
  items[1].forEach(item => {
    item.setSpeed(currentSpeed)
    if(item.level > maxLevel){
      maxLevel = item.level;
    }
  });
}

function keyPressed() {
  if(keyCode == UP_ARROW) {
      currentSpeed += 10;
  } else if (keyCode == DOWN_ARROW) {
    currentSpeed -= 10;
  }
  return 0;
}

function getRandomHeal(){
  return heals[Math.floor(random(heals.length))]
}
