var trex, trexCorrendo
var chao, chaoImagem

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
}

function draw(){
  background("white")

  trex.velocityY = trex.velocityY + 0.5;
  if (keyDown('space')) {
    trex.velocityY = -10
  }

  chao.velocityX=-2;
  console.log(chao.x);
  if(chao.x<0){
    chao.x=chao.width/2;
  }
  trex.collide(chao);
  

  
  drawSprites()
}
