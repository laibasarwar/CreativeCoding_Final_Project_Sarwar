let scene=1;

var dadatextfile;
let font;
fontsize=20;
let lines = [];
let phrase = 0;

var song;
var amp;
var volhistory = [];

let imgparagraph=[];

var button;

function toggleSong() {
  if (song.isPlaying()) {
    song.pause();
  } else {
    song.loop();
  }
}

function preload() {
  song = loadSound('DadaUrdu3.mp3');

  dadatextfile=loadStrings('dada_english.txt',doText);
  font = loadFont('CormorantGaramond-Medium.ttf');

  imgparagraph[0]=loadImage('Journal1.jpg');
  imgparagraph[1] = loadImage('Journal2.jpg');
  imgparagraph[2] = loadImage('Journal3.jpg');

}

function setup() {
  createCanvas(windowWidth, windowHeight);
  if (scene==1){
    button = createButton('toggle');
    button.position(windowWidth/2-20,100);
    button.mousePressed(toggleSong);
    song.play();
    amp = new p5.Amplitude();
  }

}

function draw() {
  if (scene==1){
    background(161,191,157,75);
    drawSquare(); 
    textprocessed();
    soundWave(); 
    writing();
    reading();
  } else if (scene==2){
    background(161,191,157,75);
    button.position(windowWidth/2,windowHeight); 
    drawSquare();  
    textprocessed();
    soundWave();

    for(i = 0; i < imgparagraph.length; i++){
      image(imgparagraph[i], i*500, 0, windowWidth, windowHeight);
    }
  } else if (scene==3){
    background(161,191,157,75);
    button.position(windowWidth/2,windowHeight);
    initMap();
  }
  


}

function doText(data) {
  lines = data;
}

function drawSquare(){
  noStroke();
  fill(255);
  rect(0,windowHeight-100,windowWidth,100);
  rect(0,0,windowWidth,100);
  rect(0,0,100,windowHeight);
  rect(windowWidth-100,0,100,windowHeight);
}
function textprocessed(){
  for (var i = 0; i < lines.length; i++) {
    stroke(0);
    fill(0); //textcolor white
    textFont(font);
    textSize(fontsize);
    textAlign(CENTER);
    text(lines[phrase], windowWidth/2, windowHeight-50);
  }
}
function mousePressed() {
  phrase++;
}

function soundWave(){
  var vol = amp.getLevel();
  volhistory.push(vol);
  var currentY = map(vol, 1, 0, height, 1);
  translate(0, y);

  beginShape();
  stroke(0);
  for (var i = 0; i < volhistory.length; i++) {
    var y = map(volhistory[i], 1, 0, height, 1);
    vertex(i, y);
    fill(vol,0);
  }
  endShape();
  if (volhistory.length > width) {
    volhistory.splice(0, 1);
  line(width-1,0,width-1,1);
  }
}

function writing(){
  noFill();
  stroke(0);
  let centerx=windowWidth/2;
  let centery=windowHeight/2;
  console.log(centerx);
  console.log(centery);

  push();
  beginShape();

  rectMode(CENTER);
  rect(centerx+40,centery,80,100);
  
  endShape();
  pop();



}

function reading(){

  noFill();
  stroke(0);
  let centerx=windowWidth/2;
  let centery=windowHeight/2;
  console.log(centerx);
  console.log(centery);

  push();
  beginShape();

  rectMode(CENTER);
  rect(centerx-40,centery,80,100);

  endShape();
  pop();
}

function initMap(){
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 45.518, lng: -122.672 },
    zoom: 18,
  });
}

function keyPressed(){
  if (keyCode==32){
    scene++;
    if (choice>3){}
    scene=1;
  }
}