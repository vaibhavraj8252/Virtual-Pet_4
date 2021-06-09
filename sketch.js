var dog, dogI, happyDogI, boneI;
var database;
var foodS, foodStock;
var lastFed;
var feed, addFood,play,playG,sleep,bath;
var bedroomI,gardenI,livingI,washroomI;
var gameState=1;
var milkI,milk;

function preload() {
  dogI = loadImage("dog.png");
  happyDogI = loadImage("happydog.png");
  boneI = loadImage("bone.png");
  bedroomI=loadImage("Bed Room.png");
  gardenI=loadImage("Garden.png");
  livingI=loadImage("Living Room.png");
  washroomI=loadImage("washroom.png");
  milkI=loadImage("milk.png");
}

function setup() {
  createCanvas(490, 800);
  dog = createSprite(245, 400);
  dog.scale = 1;

  database = firebase.database();
  foodStock = database.ref("Food");
  foodStock.on("value", readStock);

  milk=createSprite(90,510)
  milk.addImage(milkI)
  milk.scale=0.1;

  feed = createButton("Feed the pet");
  feed.position(250, 80); 

  addFood = createButton("Add Food");
  addFood.position(250, 110); 

  bath = createButton("Give a bath to the pet");
  bath.position(250, 140); 

  sleep = createButton("Let you pet sleep");
  sleep.position(250, 170); 

  play = createButton("Have fun with the pet");
  play.position(250, 200); 

  playG = createButton("Play with it in garden");
  playG.position(250, 230); 
}

function draw() {
  background(46, 139, 87);
  drawSprites();

  textFont("audiowide");
  textSize(50);
  stroke ("cyan")
  fill("white");
  text("Food left = "+foodS,50,80);

  feed.mousePressed(() => {
    gameState=2
    writeGameState(gameState)
    writeStock1(foodS);
    milk.visible=true;
  });

  addFood.mousePressed(() => {
    gameState=1
    writeGameState(gameState)
    writeStock(foodS);
  }); 

  play.mousePressed(() => {
    gameState=5;
    writeGameState(gameState)
    milk.visible=false;
  }); 

  playG.mousePressed(() => {
    gameState=6;
    writeGameState(gameState)
    milk.visible=false;
  }); 

  bath.mousePressed(() => {
    gameState=3;
    writeGameState(gameState)
    milk.visible=false;
  }); 

  sleep.mousePressed(() => {
    gameState=4;
    writeGameState(gameState)
    milk.visible=false;
  }); 

  /*   var x = 80,
    y = 100;
  imageMode(CENTER);

  if (foodS != 0) {
    for (var i = 0; i < foodS; i++) {
      if (i % 10 == 0) {
        x = 80;
        y = y + 50;
      }
      image(boneI, x, y, 60, 30);
      x = x + 70;
    }
  } */

  textSize(25);
  text("VAIBHAV RAJ", 50, 30);

   fedTime = database.ref("FeedTime");
  fedTime.on("value", function (data) {
    lastFed = data.val();
  });

/*   fill(255, 255, 254);
  textSize(15);
  if (lastFed >= 12) {
    text("Last Feed : " + (lastFed % 12) + " PM", 350, 30);
  } else if (lastFed == 0) {
    text("Last Feed : 12 AM", 350, 30);
  } else {
    text("Last Feed : " + lastFed + " AM", 350, 30);
  } */

  if(gameState==1){
    dog.addImage(dogI)
    dog.scale=0.5;
    milk.visible=false;
  }
  
  if(gameState==2){
    dog.addImage(happyDogI)
    dog.scale=0.5;
  
  }

  if(gameState==3){
    dog.addImage(washroomI)
    dog.scale=1;
  }

  if(gameState==4){
    dog.addImage(bedroomI)
    dog.scale=1;
  }

  if(gameState==5){
    dog.addImage(livingI)
    dog.scale=1;
  }

  if(gameState==6){
    dog.addImage(gardenI)
    dog.scale=1;
  }
}

function readStock(data) {
  foodS = data.val();
}

function writeStock1(x) {
  x = x - 1;
  database.ref("/").update({
    Food: x,
  });
}

function writeStock(x) {
  x = x + 1;
  database.ref("/").update({
    Food: x,
  });
}

 function readGameState(){
  var gameStateValue= database.ref("gameState")
  gameStateValue.on("value",function(data){
      gameState=data.val()
  })
}

  function  writeGameState(x){
   database.ref("/").update({
    gameState:x
   })}