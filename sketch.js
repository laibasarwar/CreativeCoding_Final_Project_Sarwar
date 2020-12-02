//working prototype - need help with maps api for third screen, will add title page in the first scene. I
// took too much time on the content, but understanding the maps api was really hard since I had to use 
//css and becuase of that it overlayed and did not play so I deleted it and are starting new. Sorry!

let scene=1; //declaring scene to be 1

var dadatextfile; //declaring text file
let font; //declaring font variable
fontsize=20; //declaring size of font
let lines = []; //declared lines array
let phrase = 0; //declared first phrase of lines

var song; //song variable
var amp; //declare amplitude variable for song
var volhistory = []; //declare an array to hold the amplitude

let imgparagraph=[];//array for the image paragraphs

let key="AIzaSyCzG8Az3ajKty4V5_nByQ7WGImz91CFa4I";
let dadalocations;

const mappa = new Mappa('Google',key);
let pakistanMap;
let mapcanvas;
let dadadestinations;

let data = [];

const options = {
  lat: 30.3753,
  lng: 69.3451,
  zoom: 8,
  style: "http://{s}.tile.osm.org/{z}/{x}/{y}.png"
}


var button;//button to toggle song

function toggleSong() { //function to stop song through the button
  if (song.isPlaying()) { 
    song.pause();
  } else {
    song.loop();
  }
}

function preload() { 
  song = loadSound('DadaUrdu3.mp3'); //load voiceover in song variable

  dadatextfile=loadStrings('dada_english.txt',doText); //import strings from text file into the doText function to transfer into data
  font = loadFont('CormorantGaramond-Medium.ttf');//load selected font

  // dadalocations=loadJSON('Saved_Places.json');

  //did try to make this into a for loop when  doing it, it did not process while I was running it. 
  imgparagraph[0]=loadImage('Journal0.png');//load images in the array
  imgparagraph[1]=loadImage('Journal1.png');
  imgparagraph[2] = loadImage('Journal2.png');
  // imgparagraph[3] = loadImage('Journal3.png');
  // imgparagraph[4] = loadImage('Journal4.png');
  // imgparagraph[5] = loadImage('Journal5.png');
  // imgparagraph[6] = loadImage('Journal6.png');
  // imgparagraph[7] = loadImage('Journal7.png');
  // imgparagraph[8] = loadImage('Journal8.png');
  // imgparagraph[9] = loadImage('Journal9.png');
  // imgparagraph[10] = loadImage('Journal10.png');
  // imgparagraph[11] = loadImage('Journal11.png');
  // imgparagraph[12] = loadImage('Journal12.png');
  // imgparagraph[13] = loadImage('Journal13.png');
  // imgparagraph[14] = loadImage('Journal14.png');
  // imgparagraph[15] = loadImage('Journal5.png');
  // imgparagraph[16] = loadImage('Journal6.png');
  // imgparagraph[17] = loadImage('Journal7.png');
  // imgparagraph[18] = loadImage('Journal8.png');
  // imgparagraph[19] = loadImage('Journal9.png');
  // imgparagraph[20] = loadImage('Journa20.png');
  // imgparagraph[21] = loadImage('Journal21.png');
  // imgparagraph[22] = loadImage('Journal22.png');
  // imgparagraph[23] = loadImage('Journal23.png');
  // imgparagraph[24] = loadImage('Journal24.png');
  // imgparagraph[25] = loadImage('Journal25.png');
}

function setup() {
  
  if (scene==1){
    createCanvas(windowWidth, windowHeight);//full screen
    button = createButton('press to on and off the song');//button to pause and play song
    button.position(windowWidth/2-20,100);//position to be in top middle
    button.mousePressed(toggleSong);//enable by mousePress
    song.play();//play song function
    amp = new p5.Amplitude();//creat new amplitude class from built in p5 sound library

  } else if (scene==3){
    mapcanvas = createCanvas(windowWidth, windowHeight).parent('canvasContainer');;
    pakistanMap = mappa.tileMap(options);
    pakistanMap.overlay(mapcanvas);

    dadadestinations = loadTable('Saved_Places.csv', 'csv', 'header');

    pakistanMap.onChange(drawDestinations);

    fill(207, 204, 0);
    noStroke();
  }
}

function draw() {
  if (scene==1){
    background(161,191,157,75);//green background
    drawSquare(); //function to make frame
    textprocessed();//function for text
    soundWave(); //function for sound wave
    writing(); //wanted to make a person writing on paper to illusterate grandfather, the rectangle is a desk for now -- i might not do this because I am more focusing on the map api now
    reading();//do the same for person reading the journal(my brother)
  } else if (scene==2){
    background(161,191,157,75);//green background
    button.position(windowWidth/2,windowHeight); //take out button from view
    drawSquare();  
    textprocessed();
    soundWave();
    imgChange();//call to function for images array 
  } else if (scene==3){
    // background(161,191,157,75);
    // button.position(windowWidth/2,windowHeight);
    // initMap();//google map api function but it was not working so I am trying to change it to the leaflet libray but it is giving me the same issue
    clear();
    // background(0);
    drawDestinations();
  }
}



function drawDestinations(){
  for (let i = 1; i < dadadestinations.getRowCount(); i += 1) {
    // Get the lat/lng of each meteorite 
    const latitude = Number(dadadestinations.getString(i, 'geometry/coordinates/0'));
    const longitude = Number(dadadestinations.getString(i, 'geometry/coordinates/1'));

    // Only draw them if the position is inside the current map bounds. We use a
    // Google Map method to check if the lat and lng are contain inside the current
    // map. This way we draw just what we are going to see and not everything. See
    // getBounds() in https://developers.google.com/maps/documentation/javascript/3.exp/reference
    if (pakistanMap.map.getBounds().contains({ lat: latitude, lng: longitude })) {
      // Transform lat/lng to pixel position
      const pos = pakistanMap.latLngToPixel(latitude, longitude);
      // Get the size of the meteorite and map it. 60000000 is the mass of the largest
      // meteorite (https://en.wikipedia.org/wiki/Hoba_meteorite)
      // let size = dadadestinations.getString(i, 'mass (g)');
      // size = map(size, 558, 60000000, 1, 25) + myMap.zoom();
      ellipse(pos.x, pos.y, 25, 25);
    }
  }
}
function doText(data) {
  lines = data;//puts the lines array to the data to use as the text
}

function drawSquare(){
  noStroke();//white squares to make a frame on each side of the window
  fill(255);
  rect(0,windowHeight-100,windowWidth,100);//I am using windowWidth to make it more responsive and not having to completely hardcode
  rect(0,0,windowWidth,100);
  rect(0,0,100,windowHeight);
  rect(windowWidth-100,0,100,windowHeight);
}
function textprocessed(){
  for (var i = 0; i < lines.length; i++) {//processed the text file line by line to add as subtitles
    stroke(0);
    fill(0); //textcolor white
    textFont(font);
    textSize(fontsize);
    textAlign(CENTER);
    text(lines[phrase], windowWidth/2, windowHeight-50);
  }
}
function mousePressed() {//when mouse is pressed, the phrase will go up -- I will chnage this to a set time using millis later
  phrase++;
}

function soundWave(){//adapted from https://www.youtube.com/watch?v=jEwAMgcCgOA
  var vol = amp.getLevel();//gets amp level and stors it to vol
  volhistory.push(vol);//puts that vol level into the array
  var currentY = map(vol, 1, 0, height, 1);//make it so that it is positioned on to top portion of the screen, I want to find a way to make it more colourful though
  translate(0, y);//translates it to y 

  beginShape();
  stroke(0);
  for (var i = 0; i < volhistory.length; i++) {//accessing each amp volume in song file and array
    var y = map(volhistory[i], 1, 0, height, 1);//puts it into each amp level and positions it on top using height
    vertex(i, y);//each vertex from the translation of y
    fill(vol,0);//fill the level from vol variable
  }
  endShape();
  if (volhistory.length > width) {//to make sure that when the track goes to the end of the screen, the line moves
    volhistory.splice(0, 1);//removes the value from the array
  line(width-1,0,width-1,1);//creates the line overall and positioned on top 
  }
}

function writing(){//may not include
  noFill();
  stroke(0);//make rectangle for writing table
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

  noFill();//make rectangle for reading the journal
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

function imgChange(){
  for(i = 0; i < imgparagraph.length; i++){//parses the imgparagraph array 
    imageMode(CENTER);//centers position
    image(imgparagraph[i], random(100,windowWidth-150), random(100,windowHeight-150), 200,100);//places the image in array in random placess inside the frame with size of 200,100
  }
}



function keyPressed(){
  if (keyCode==32){
    scene++;//spacebar moves scene
    if (choice>3){
      scene=1;//repositions to 1rst scene if space exaceeds the number of scenes
    }
    
  }
}