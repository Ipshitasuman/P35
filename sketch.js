var balloon, ballpos;
var database, position;

function preload(){
  bg = loadImage("Hot Air Ballon-01.png");
  bImg1 = loadAnimation("Hot Air Ballon-02.png","Hot Air Ballon-03.png","Hot Air Ballon-04.png");
  bImg2 = loadAnimation("Hot Air Ballon-03.png");
  // bImg3 = loadAnimation("Hot Air Ballon-04.png");
}

function setup() {
  database = firebase.database();

  createCanvas(1550,750);
   balloon = createSprite(400, 200);
   balloon.addAnimation("balloonImg",bImg2);
   balloon.scale = 0.7;

  ballpos = database.ref('balloon/position');
  ballpos.on("value",readPosition,showError);
}

function draw() {
  background(bg); 

  strokeWeight(1);
  stroke(0);
  fill(0);
  textSize(20);
  text("Use arrow keys to move the Hot Air Balloon!",55,45);

  if(keyDown(LEFT_ARROW)){
    writePosition(-10,0)
}
else if(keyDown(RIGHT_ARROW)){
  writePosition(10,0)
}
else if(keyDown(UP_ARROW)){
  writePosition(0,-10);
  balloon.addAnimation("balloonImg",bImg1);
  balloon.scale = balloon.scale-0.01;
}
else if(keyDown(DOWN_ARROW)){
  writePosition(0,10);
  balloon.addAnimation("balloonImg",bImg1);
  balloon.scale = balloon.scale+0.01;
} 
  drawSprites();
}

function writePosition(x,y){
  database.ref('balloon/position').set({
      'x': position.x + x,
      'y': position.y + y
  })
}

function readPosition(data){
  position = data.val();
  balloon.x = position.x;
  balloon.y = position.y;
}

function showError(){
  console.log("Error in writing to the database");
}