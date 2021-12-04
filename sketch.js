var trex, trexCorrendo
var chao, chaoImagem
var invisibleChao
var nuvemImg
var cacto1,cacto2,cacto3,cacto4,cacto5,cacto6
var pontuacao=0;
var estadoDoJogo="jogando";
var grupoCacto, grupoNuvem

function criaNuvem(){

  if(frameCount % 100 ===0){
    var nuvem=createSprite(600,50,50,10)
    nuvem.velocityX=-2
    nuvem.y= Math.round(random(10,90))
    nuvem.addImage(nuvemImg);
    nuvem.lifetime=325
    nuvem.depth=trex.depth
    trex.depth=trex.depth+1
    grupoNuvem.add(nuvem)
  }
}

function criaCactos(){
  if(frameCount % 120=== 0){
    var cacto=createSprite(600,160,10,50)
    cacto.velocityX=-2
    cacto.lifetime=350;
    var tipo=Math.round(random(1,6))
    switch(tipo){
      case 1: cacto.addImage(cacto1)
      break
      case 2: cacto.addImage(cacto2)
      break
      case 3: cacto.addImage(cacto3)
      break
      case 4: cacto.addImage(cacto4)
      break
      case 5: cacto.addImage(cacto5)
      break
      case 6: cacto.addImage(cacto6)
      break
    }
    grupoCacto.add(cacto)
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

  grupoCacto=new Group()
  grupoNuvem=new Group()
}

function draw(){
  background("white")

  if(estadoDoJogo==="jogando"){
    pontuacao=pontuacao+Math.round(frameRate()/60)
    if(chao.x<0){
      chao.x=chao.width/2;
    }
    criaNuvem()
    criaCactos()

    chao.velocityX=-2;

    if(trex.isTouching(grupoCacto)){
      estadoDoJogo="final";
    }
  } else if(estadoDoJogo==="final"){
    chao.velocityX=0;
    grupoNuvem.setVelocityXEach(0);
    grupoCacto.setVelocityXEach(0)
  }

  text("Pontuação: "+pontuacao,50,20)

  trex.velocityY = trex.velocityY + 0.5;
  if (keyDown('space') &&trex.y>140){
    trex.velocityY = -10
  }

  trex.collide(invisibleChao);

  drawSprites()
}