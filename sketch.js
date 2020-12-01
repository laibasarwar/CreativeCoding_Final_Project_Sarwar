var dadatextfile;
let font;
fontsize=20;
let lines = [];
let phrase = 0;

function setup() {  
  createCanvas(windowWidth, windowHeight);  
}  

function preload(){
  dadatextfile=loadStrings('dada_english.txt',doText);
  font = loadFont('CormorantGaramond-Medium.ttf');
}
function draw() {  
  background(0); 
  textprocessed();
}

// Text Formatting //
function doText(data) {
  lines = data;
}
function textprocessed(){
  for (var i = 0; i < lines.length; i++) {
    fill(255); //textcolor white
    textFont(font);
    textSize(fontsize);
    textAlign(CENTER);
  // text(momwedding[i], 350, 25+i*12.5);
    text(lines[phrase], windowWidth/2, windowHeight-50);
  }
}
function mousePressed() {
  phrase++;
}
// End of Text Formatting //