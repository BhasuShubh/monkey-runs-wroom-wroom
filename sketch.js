var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score;
var ground;


function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  
createCanvas(600, 300);

  
  
  monkey = createSprite(50,275,20,50);
  monkey.addAnimation("running",monkey_running);
 
 

  monkey.scale = 0.08;
  
  ground = createSprite(100,290,800,20);
  
 ground.x = ground.width /3;
  
  invisibleGround = createSprite(300,290,600,20);
  invisibleGround.visible = false;
  
  obstaclesGroup = createGroup();
  FoodGroup = createGroup();
  
  monkey.setCollider("rectangle",0,0,monkey.width,monkey.height);
  monkey.debug = false;
  
  score = 0;
  
}


function draw() {

  background(180);
  text.size = 60;
  text("Survival Time "+ score, 250,50);
  
  
  
  if(gameState === PLAY){

    ground.velocityX = -(6 +score/100)
    
    score = score + Math.round(getFrameRate()/61);
    
    
    if (ground.x < 200){
      ground.x = ground.width/2;
    }
   
    if(keyDown("space") && monkey.y>= 200) {
        monkey.velocityY = -15;
    }
    
    //add gravity
    monkey.velocityY = monkey.velocityY + 0.8
    bananaSpawn();
    spawnObstacles();
  
    spawnObstacles();
    
    if(obstaclesGroup.isTouching(monkey)){
        gameState = END;
      
    }
  }
   else if (gameState === END) { 
     
      ground.velocityX = 0;
      monkey.velocityY = 0.6;
      
     
    obstaclesGroup.setLifetimeEach(-1);
    

     
     obstaclesGroup.setVelocityXEach(0);  
     FoodGroup.setVelocityXEach(0);
   }
  
 
  //stop trex from falling down
  monkey.collide(invisibleGround);
  
  

  
  drawSprites();
}

function spawnObstacles(){
 
 if (frameCount % 100 === 0){
   obstacle = createSprite(600,250,10,40);
   obstacle.velocityX = -(6 + score/100);
   
   obstacle.addImage("obstaclestotakle",obstacleImage);
   obstacle.scale = 0.15;
             
    
    obstacle.lifetime = 300;
    
   
   //add each obstacle to the group
    obstaclesGroup.add(obstacle);
 }
} 


function bananaSpawn() {
  if (frameCount % 80 === 0) {
    banana = createSprite(600,150,20,20);
    banana.velocityX = -8;
    banana.y = Math.round(random(150,200));
    
    banana.addImage("banana incoming",bananaImage);
    banana.scale = 0.1;
    
    
    banana.lifetime = 300;
    FoodGroup.add(banana);
  }
}


