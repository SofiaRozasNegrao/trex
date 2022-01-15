var trex, trexCorrendo, trexMorrido
var chao, chaoImagem
var invisibleChao
var nuvemImg
var cacto1,cacto2,cacto3,cacto4,cacto5,cacto6
var pontuacao=0;
var estadoDoJogo="jogando";
var gameOver, gameOverImg
var restart, restartImg
var grupoCacto, grupoNuvem
var somDaMorte, somDoCheckpoint, somPulo
var larguraTela= window.innerWidth

function criaNuvem(){

  if(frameCount % 100 ===0){
    var nuvem=createSprite(larguraTela,50,50,10)
    nuvem.velocityX=-2
    nuvem.y= Math.round(random(10,90))
    nuvem.addImage(nuvemImg);
    nuvem.lifetime=larguraTela
    nuvem.depth=trex.depth
    trex.depth=trex.depth+1
    grupoNuvem.add(nuvem)
  }
}

function criaCactos(){
  if(frameCount % 120=== 0){
    var cacto=createSprite(larguraTela,160,10,50)
    cacto.velocityX=-(2+pontuacao/100);
    cacto.lifetime=larguraTela;
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

function reset(){
  estadoDoJogo="jogando"
  grupoCacto.destroyEach()
  grupoNuvem.destroyEach()
  pontuacao=0
  gameOver.visible=false
  restart.visible=false
  trex.changeAnimation('correndo', trexCorrendo)
  
}

function preload(){
  trexCorrendo = loadAnimation('trex1.png', 'trex3.png', 'trex4.png')
  trexMorrido= loadAnimation('trex_collided.png')
  chaoImagem=loadImage('ground2.png')
  nuvemImg=loadImage('cloud.png')
  cacto1=loadImage('obstacle1.png')
  cacto2=loadImage('obstacle2.png')
  cacto3=loadImage('obstacle3.png')
  cacto4=loadImage('obstacle4.png')
  cacto5=loadImage('obstacle5.png')
  cacto6=loadImage('obstacle6.png')
  gameOverImg=loadImage('gameOver.png')
 restartImg=loadImage('restart.png')
 somPulo=loadSound('jump.mp3')
 somDaMorte=loadSound('die.mp3')
 somDoCheckpoint=loadSound('checkpoint.mp3')
}

function setup(){
  createCanvas(larguraTela,200)
  
  trex = createSprite(50, 150, 20, 40)
  trex.addAnimation('correndo', trexCorrendo)
  trex.addAnimation('Morrido', trexMorrido)

  chao=createSprite(larguraTela/2,190,larguraTela,20);
  chao.addImage(chaoImagem);
  invisibleChao=createSprite(larguraTela/2,199,larguraTela,18);
  invisibleChao.visible=false;

  grupoCacto=new Group()
  grupoNuvem=new Group()

  gameOver=createSprite(larguraTela/2,50,50,50)
  gameOver.addImage(gameOverImg)
  gameOver.visible=false

  restart=createSprite(larguraTela/2,100,50,50)
  restart.addImage(restartImg)
  restart.scale=0.6
  restart.visible=false
  restart.depth=trex.depth
  restart.depth=restart.depth+1
}

function draw(){
  background("white")

  if(estadoDoJogo==="jogando"){
    pontuacao=pontuacao+Math.round(frameRate()/60)
    if (pontuacao>0 && pontuacao %100 === 0){
      somDoCheckpoint.play()
    }

    if(chao.x<0){
      chao.x=chao.width/2;
    }
    criaNuvem()
    criaCactos()

    chao.velocityX=-(2+pontuacao/100);

    if(trex.isTouching(grupoCacto)){
      estadoDoJogo="final";
      somDaMorte.play()
    }
  } else if(estadoDoJogo==="final"){
    chao.velocityX=0;
    grupoNuvem.setVelocityXEach(0);
    grupoCacto.setVelocityXEach(0);

    grupoNuvem.setLifetimeEach(-1);
    grupoCacto.setLifetimeEach(-1);

    trex.changeAnimation('Morrido',trexMorrido)

    gameOver.visible=true
    restart.visible=true

    if(mousePressedOver(restart) || touches.length>0){
      reset()
      touches=[]
    }
  }

  text("Pontuação: "+pontuacao,50,20)

  trex.velocityY = trex.velocityY + 0.5;
  if ((keyDown('space') &&trex.y>140) || touches.length>0){
    trex.velocityY = -10
    somPulo.play()
    touches=[]
  }

  trex.collide(invisibleChao);

  drawSprites()
}