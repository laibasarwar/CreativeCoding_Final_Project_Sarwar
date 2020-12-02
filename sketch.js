let scene=1;

var dadatextfile;
let font;
fontsize=20;
let lines = [];
let phrase = 0;

var song;
var amp;
var volhistory = [];

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
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  button = createButton('toggle');
  button.position(windowWidth/2-20,100);
  button.mousePressed(toggleSong);
  song.play();
  amp = new p5.Amplitude();
}

function draw() {
  background(161,191,157,75);
  drawSquare();  
  textprocessed();
  // soundWave();
  writing();
  reading();

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
  var options = {
    zoom:8,
    center:8,
    center:{lat:42.3601,lng:-71.0580}
  }
}

function keyPressed(){
  if (keyCode==32){
    scene++;
    if (choice>3){}
    scene=1;
  }
}