var trex, trexCorrendo
var chao, chaoImagem
var invisibleChao

function preload(){
  trexCorrendo = loadAnimation('trex1.png', 'trex3.png', 'trex4.png')
  chaoImagem=loadImage('ground2.png')
}

function setup(){
  createCanvas(600,200)
  
  trex = createSprite(50, 150, 20, 40)
  trex.addAnimation('correndo', trexCorrendo)

  chao=createSprite(300,190,600,20);
  chao.addImage(chaoImagem);
  invisibleChao=createSprite(300,199,600,18);
  invisibleChao.visible=false;
}

function draw(){
  background("white")

  trex.velocityY = trex.velocityY + 0.5;
  if (keyDown('space') &&trex.y>140){
    trex.velocityY = -10
  }

  chao.velocityX=-2;
  if(chao.x<0){
    chao.x=chao.width/2;
  }

  trex.collide(invisibleChao);

  drawSprites()
}
