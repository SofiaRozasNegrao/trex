var trex, trexCorrendo
var chao, chaoImagem
var invisibleChao
var nuvemImg
var cacto1,cacto2,cacto3,cacto4,cacto5,cacto6

function criaNuvem(){

  if(frameCount % 100 ===0){
    var nuvem=createSprite(600,50,50,10)
    nuvem.velocityX=-2
    nuvem.y= Math.round(random(10,90))
    nuvem.addImage(nuvemImg);
    nuvem.depth=trex.depth
    trex.depth=trex.depth+1
    console.log(trex.depth)  
    console.log(nuvem.depth)
  }
}

function criaCactos(){
  if(frameCount % 70=== 0){
    var cacto=createSprite(600,150,10,50)
    cacto.velocityX=-2
  }
}

function preload(){
  trexCorrendo = loadAnimation('trex1.png', 'trex3.png', 'trex4.png')
  chaoImagem=loadImage('ground2.png')
  nuvemImg=loadImage('cloud.png')
  cacto1=loadImage('obstacle1.png')
  cacto2=loadImage('obstacle2.png')
  cacto3=loadImage('obstacle3.png')
  cacto4=loadImage('obstacle4.png')
  cacto5=loadImage('obstacle5.png')
  cacto6=loadImage('obstacle6.png')
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

  criaNuvem()
  criaCactos()

  drawSprites()
}
