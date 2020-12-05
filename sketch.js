
//references for map: https://www.youtube.com/watch?v=Ae73YY_GAU8&ab_channel=TheCodingTrain, https://mappa.js.org/docs/using-data.html


class Destination {
  constructor(x, y, diameter, name) {
    this.x = x;
    this.y = y;
    this.diameter = diameter;
    this.radius = diameter / 2;
    this.name = name;

    this.over = false;
  }

  // Check if mouse is over the destination
  rollover(px, py) {
    let d = dist(px, py, this.x, this.y);
    this.over = d < this.radius;
  }

  // Display the destination
  display() {
    stroke(0);
    strokeWeight(0.8);
    noFill();
    imageMode(CENTER);
    image(pin,this.x,this.y,20,30);
    if (this.over) {
      fill(0);
      textAlign(CENTER);
      text(this.name+" "+this.x+" "+this.y, this.x, this.y + this.radius + 20);
    }
  }
}

let scene=1; //declaring scene to be 1

var button;//button to toggle song

var dadatextfile; //declaring text file
let font; //declaring font variable
fontsize=20; //declaring size of font
let lines = []; //declared lines array
let phrase = 0; //declared first phrase of lines

var song; //song variable
var amp; //declare amplitude variable for song
var volhistory = []; //declare an array to hold the amplitude

let imgparagraph=[];//array for the image paragraphs

let dadadestinationsdata; //

let destination1;
let velocity;
let destination2;

const mappa = new Mappa('Leaflet');//creates new map class with the leaflet library
let pakistanmap;//declared variable for my map
let canvas;//declares canvas variable to declare the overall canvas

let latitude;
let longitude;

const options = {//options for initial position of map
  lat: 30.3753,//initial latitude
  lng: 69.3451,//initial longitude
  zoom: 4.5,//initial zoom position
  style: "http://{s}.tile.osm.org/{z}/{x}/{y}.png"//have to put this in order to show the map image
}

function toggleSong() { //function to stop song through the button
  if (song.isPlaying()) { 
    song.pause();
  } else {
    song.loop();
    // song.play();//play song function
  }
}

function preload() {
  dadadestinationsdata = loadTable('saved_places.csv', 'header');//loads my csv file of the destinations

  song = loadSound('DadaUrdu5.mp3'); //load voiceover in song variable

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
  pin=loadImage("https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png");
  partitiontrain=loadImage('train.png');
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);//variable for canvas
  pakistanmap = mappa.tileMap(options);//initializes the map with the initial options variable
  pakistanmap.overlay(canvas);//overlays the canvas == very important
  let latitude;
  let longitude;
  // destination1=createVector(latitude,logitude);


  
    button = createButton('press to on and off the song');//button to pause and play song
    button.position(windowWidth/2-20,100);//position to be in top middle
    button.mousePressed(toggleSong);//enable by mousePress
    song.play();//play song function
    amp = new p5.Amplitude();//creat new amplitude class from built in p5 sound library
}

function draw() {
  if (scene==1){
    background(161,191,157,75);//green background
    // button.position(windowWidth/2-20,100);//position to be in top middle
    drawSquare(); //function to make frame
    textprocessed();//function for text
    soundWave(); //function for sound wave
    writing(); //wanted to make a person writing on paper to illusterate grandfather, the rectangle is a desk for now -- i might not do this because I am more focusing on the map api now
    reading();//do the same for person reading the journal(my brother)
    
  }else if (scene==2){
    background(161,191,157,75);//green background
    button.position(windowWidth/2,windowHeight); //take out button from view
    drawSquare();  
    textprocessed();
    soundWave();
    imgChange();//call to function for images array 
  }else if (scene==3){
    clear();//basically new background, but for map specifically
    pakistanmap.overlay(canvas);//overlays the canvas with the map
    for (let i = 0; i < dadadestinationsdata.getRowCount(); i++) {//goes through each row in the csv file
      
      latitude = Number(dadadestinationsdata.getString(i, 'geometry/coordinates/1'));//lat string from csv into the number
      longitude = Number(dadadestinationsdata.getString(i, 'geometry/coordinates/0'));//long string from csv into #

      let pos = pakistanmap.latLngToPixel(latitude, longitude);//puts the latitude and longitude in the pos variable 
      // ellipse(pos.x, pos.y, 25);//ellipse for each destination -- will turn into maps pin png
      // var marker = L.marker([pos.x, pos.y]).addTo(mymap); == doesnt work
      // ellipse(pos.x[0],pos.y[0],200);
      destination1=pos
      image(mappin,pos.x,pos.y,30,53);

      const train=pakistanmap.latLngToPixel(31.604757,74.574136);//for the train == 
      // ellipse(train.x,train.y,50);//will change to train png
      image(partitiontrain, train.x,train.y,80,72);
      
      
      // destination1=createVector(train.x,train.y);
      // velocity=createVector(0,1);
      // destination1.add(velocity);
      // ellipse(destination.x, destination.y, 32);
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
  translate(width/2, y);//translates it to y 

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
    if (scene>4){
      scene=1;//repositions to 1rst scene if space exaceeds the number of scenes
    }
    
  }
}