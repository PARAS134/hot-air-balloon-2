var bg, bgImg
var bottomGround
var topGround
var balloon, balloonImg
var obstacleTop
var obstacleTopImg
var gameState="play"
var score=0


function preload(){
bgImg = loadImage("assets/bg.png")

balloonImg = loadAnimation("assets/balloon1.png","assets/balloon2.png","assets/balloon3.png")
obsTop1=loadImage("assets/obsTop1.png")
obsTop2=loadImage("assets/obsTop2.png")
obsbottom1=loadImage("assets/obsBottom1.png")
obsbottom2=loadImage("assets/obsBottom2.png")
obsbottom3=loadImage("assets/obsBottom3.png")
gameOverImage=loadImage("assets/gameOver.png")
restartImage=loadImage("assets/restart.png")
}


function setup(){
  console.log(height)

//background image
bg = createSprite(165,485,1,1);
bg.addImage(bgImg);
bg.scale = 1.3

//creating top and bottom grounds
bottomGround = createSprite(200,390,800,20);
bottomGround.visible = false;

topGround = createSprite(200,10,800,20);
topGround.visible = false;
      
//creating balloon     
balloon = createSprite(100,200,20,50);
balloon.addAnimation("balloon",balloonImg);
balloon.scale = 0.2;

tog=new Group()
bog=new Group()
barGroup=new Group()


gameOver=createSprite(200,200);
restart=createSprite(200,150);
gameOver.addImage(gameOverImage)
restart.addImage(restartImage)
restart.visible = false;
gameOver.visible = false;
}


function draw() {
  
  background("black");
  console.log(balloon.y)
  if (gameState=="play"){

    if(balloon.isTouching(barGroup)){
      score = score+1
    }
  
        
          //making the hot air balloon jump
          if(keyDown("space")) {
            balloon.velocityY = -6 ;
     
          }

          //adding gravity
           balloon.velocityY = balloon.velocityY + 2;
   
        
        spawnobstaclestop ();
   spawnbottomobstacles  ();
   bar()
  if (bog.isTouching(balloon)||tog.isTouching(balloon)||balloon.isTouching(bottomGround)){
  
    gameState="end"
  }

}
if (gameState=="end"){
  balloon.velocityX=0
  balloon.velocityY=0
  tog.setVelocityXEach(0)
  bog.setVelocityXEach(0)
  tog.setLifetimeEach(-1)
  bog.setLifetimeEach(-1)
  gameOver.visible=true
  restart.visible=true
  balloon.x=200;
  balloon.y=200;
  if(mousePressedOver(restart)){
    reset()

  }

}
drawSprites();
text("score"+score,300,50)
}
function spawnobstaclestop(){
if (frameCount%60===0){
  obstacleTop=createSprite(400,50,40,50)
obstacleTop.velocityX= -4  
obstacleTop.y=Math.round(random(10,100));
var r = Math.round(random(1,2));
switch(r)
 { case 1: obstacleTop.addImage(obsTop1);
  obstacleTop.scale= 0.1;
   break;
    case 2: obstacleTop.addImage(obsTop2);
    obstacleTop.scale= 0.1;
    break; 
    default: break;
   }
    obstacleTop.lifetime = 100;
balloon.depth+=1
tog.add(obstacleTop)


}
}
function spawnbottomobstacles(){
  if (frameCount%60===0){
    obstaclebottom=createSprite(400,350,40,50)
  obstaclebottom.velocityX= -4 
  var r = Math.round(random(1,3));
  switch(r)
   { case 1: obstaclebottom.addImage(obsbottom1);
    obstaclebottom.scale= 0.1;
     break;
      case 2: obstaclebottom.addImage(obsbottom2);
      obstaclebottom.scale= 0.1;
      break; 
      case 3 : obstaclebottom.addImage(obsbottom3);
      obstaclebottom.scale= 0.1;
      default: break;

     
     }
      obstaclebottom.lifetime = 100;
  balloon.depth+=1
  bog.add(obstaclebottom)
  
  }
  
}
function bar(){
  if(frameCount%60===0){
    var bar1 = createSprite (400,200,10,800)
    bar1.velocityX = -4
    bar1.visible=false
    barGroup.add(bar1)
  }
}
function reset (){
  gameState="play"
  restart.visible=false
  gameOver.visible=false
  tog.destroyEach()
  bog.destroyEach()
  score=0
}