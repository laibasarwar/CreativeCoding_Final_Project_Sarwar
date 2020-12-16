
//references for map: https://www.youtube.com/watch?v=Ae73YY_GAU8&ab_channel=TheCodingTrain, https://mappa.js.org/docs/using-data.html

let dix=50;
let diy=50;
let pos;

let scene=0; //declaring scene to be 1

var button;//button to toggle song

var dadatextfile; //declaring text file
let font; //declaring font variable
let fonttitle;
fontsize=20; //declaring size of font
let lines = []; //declared lines array
let phrase = 0; //declared first phrase of lines

let word=0;

var song; //song variable
var amp; //declare amplitude variable for song
var volhistory = []; //declare an array to hold the amplitude

let imgparagraph=[];//array for the image paragraphs

let pintable;
let destinations=[]; //easier to put all pins in one list
let pin;
let pinlabel;
let mapimage;
let box;
let r=255;
let g=0;
let b=0;
let ximg,yimg,ximg1,ximg2;
let squareWidth,squareWidth1,squareWidth2,squareWidth3,squareWidth4,squareWidth5,transwidth, transwidth2;
let v,vx,vy;

const mappa = new Mappa('Leaflet');//creates new map class with the leaflet library
let pakistanmap;//declared variable for my map
let canvas;//declares canvas variable to declare the overall canvas

let train;
let pindi_home;
let pindix=0;
let pindiy=0;

let series0,series1,series2,series3,series4,dadaimage;

const options = {//options for initial position of map
  lat: 30.9119721,//initial latitude
  lng: 75.8495208,//initial longitude 
  zoom: 5.5,//initial zoom position
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
  pintable = loadTable('saved_places.csv', 'header');//loads my csv file of the destinations

  song = loadSound('DadaUrdu6.mp3'); //load voiceover in song variable

  dadatextfile=loadStrings('dada_english.txt',doText); //import strings from text file into the doText function to transfer into data
  font = loadFont('lust_slim.ttf');//load selected font
  fonttitle=loadFont('partner.otf');
  cormorant=loadFont('CormorantGaramond-Medium.ttf');
  comforta=loadFont('Comfortaa-VariableFont_wght.ttf');
  


  
  // dadalocations=loadJSON('Saved_Places.json');

  //did try to make this into a for loop when  doing it, it did not process while I was running it. 
  imgparagraph[0]=loadImage('Artboard0.png');//load images in the array
  imgparagraph[1]=loadImage('Artboard1.png');
  imgparagraph[2] = loadImage('Artboard2.png');
  pin=loadImage("https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png");
  partitiontrain=loadImage('train.png');
  mapimage=loadImage('mapimage.png');
  pindi_home=loadImage('pindi_home.png');
  orangegreen=loadImage('orange_green_4.png');
  series0=loadImage('series0.jpg');
  series1=loadImage('series1.jpg');
  series2=loadImage('series2.jpg');
  series3=loadImage('series3.jpg');
  series4=loadImage('series4.jpg');
  dadaimage=loadImage('dada2.jpg');
}


function setup() {
  canvas = createCanvas(windowWidth, windowHeight);//variable for canvas

  pakistanmap = mappa.tileMap(options);//initializes the map with the initial options variable
  pakistanmap.overlay(canvas);//overlays the canvas == very important
  // destination1=createVector(latitude,logitude);
  const pin_data = pintable.getRows();
  // The size of the array of Bubble objects is determined by the total number of rows in the CSV
  const length = pintable.getRowCount();

  for (let i = 0; i < length; i++) {
    // Get position, diameter, name,
    let x = pin_data[i].getNum("geometry/coordinates/1");
    let y = pin_data[i].getNum("geometry/coordinates/0");
    let diameter =100 //pos.x-25,pos.y-25
    let name = pin_data[i].getString("properties/Title");

    // Put object in array
    destinations.push(new Destination(x, y, diameter, name));
  }
  
    // button = createButton('on/off');//button to pause and play song
    // button.position(windowWidth/2-25,100);//position to be in top middle
    // button.mousePressed(toggleSong);//enable by mousePress
    song.play();//play song function
    amp = new p5.Amplitude();//creat new amplitude class from built in p5 sound library    
    setInterval(movingPhrases,5000);

    ximg=windowWidth-100;
    ximg1=windowWidth-100;
    ximg2=windowWidth-100;
    yimg=height/2;
    squareWidth=0;
    squareWidth1=0;
    squareWidth2=0;
    squareWidth3=0;
    squareWidth4=0;
    squareWidth5=0;
    transwidth=0;
    transwidth2=0;
    v=0;
    vx=0;
    vy=0;
    train=new Train(windowWidth-510,windowHeight-100);
}

function draw() {
  push();
  let partitiontitle=["THE","PARTITION","OF","INDIA","AND","PAKISTAN","IN","1947","WAS A","BRUTAL","AND","DEADLY","EVENT"];
  let partitionsum=["UP","TO","2","MILLION","PEOPLE DIED,","AND","ABOUT","14","MILLION","PEOPLE","WERE","DISPLACED"];
  let partitionsum2=["MY","GRANDFATHER","WAS","ONE","OF","THE","LUCKY","FEW","WHO","WAS","ABLE","TO","ESCAPE","INDIA","AND","GO","TO","PAKISTAN"];
  let partiotionsum3=["THIS","IS","HIS","STORY"];

  textFont(cormorant);
  textAlign(CENTER);
  if (millis()>= 0) {
    
    image(orangegreen,0,0,windowWidth,windowHeight);

    textFont(cormorant);
    textStyle(BOLD);
    textAlign(CENTER);
    textSize(50);
    fill(255);
    stroke(255);
    strokeWeight(5);
    
    text(partitiontitle[0],width/2,(height/2)-300);
    
  } 
  if (millis()>=2000){
    text(partitiontitle[1],width/2,height/2-250);
  }
  if (millis()>=3000){
    text(partitiontitle[2],width/2,height/2-200);
  }
  if (millis()>=4000){
    text(partitiontitle[3],width/2+150,height/2-150);
  }
  if (millis()>=5000){
    text(partitiontitle[4],width/2,height/2-100);
  }
  if (millis()>=6000){
    text(partitiontitle[5],width/2-150,height/2-150);
  }
  if (millis()>=7000){
    text(partitiontitle[6],width/2,height/2-50);
  }
  if (millis()>=8000){
    text(partitiontitle[7],width/2,height/2);
  }
  if (millis()>=9000){
    text(partitiontitle[8],width/2,height/2+50);
  }
  if (millis()>=10000){
    text(partitiontitle[9],width/2,height/2+100);
  }
  if (millis()>=11000){
    text(partitiontitle[10],width/2,height/2+150);
  }
  if (millis()>=12000){
    text(partitiontitle[11],width/2,height/2+200);
  }
  if (millis()>=13000){
    text(partitiontitle[12],width/2,height/2+250);
  }
  if (millis()>=14000){
    text(partitiontitle[13],width/2,height/2+300);
  }
  pop();
  push();
  
  if (millis()>=15000){
    fill(217,120,85);
    noStroke();
    rect(width/2,0,transwidth,height);
    // transwidth=transwidth+(200);
    transwidth=transwidth+10;
    if (transwidth>windowWidth/2){
      transwidth=windowWidth/2;
    }
    
    fill(161,191,157);
    rect(width/2,0,transwidth2,height);
    // transwidth=transwidth+(200);
    transwidth2=transwidth2-10;
    if (transwidth2<-(windowWidth/2)){
      transwidth2=-(windowWidth/2);
    }
  }
  pop();

  if (millis()>=18000){
    fill(217,120,85);
    noStroke();
    rect(width/2,0,width/2,height);
    fill(161,191,157);
    rect(0,0,width/2,height);

    push();
    
    noStroke(0);
    strokeWeight(1);
    fill(255);
    rectMode(CENTER);
    rect(width/3-200,height/3+100,400,400);
    imageMode(CENTER);
    image(series0,width/3-175,height/3+125,400,400);
    // pop();
    noStroke(0);

    textFont(cormorant);
    textStyle(BOLD);
    textAlign(CENTER);
    textSize(50);
    fill(255);
    stroke(255);

    fill(255);
    text(partitionsum[0],width/2+(width/4),height/2-250);
  }
  
  if (millis()>=19000){
    text(partitionsum[1],width/2+(width/4),height/2-200);
    
    
  }
  if (millis()>=20000){
    fill(255);
    text(partitionsum[2],width/2+(width/4),height/2-150);
  }
  if (millis()>=21000){
    fill(255);
    text(partitionsum[3],width/2+(width/4),height/2-100);
    image(series1,width/3-175,height/3+125,400,400);
  }
  if (millis()>=22000){
    fill(255);
    text(partitionsum[4],width/2+(width/4),height/2-50);
  }
  if (millis()>=23000){
    fill(255);
    text(partitionsum[5],width/2+(width/4),height/2);
    image(series2,width/3-175,height/3+125,400,400);
  }
  if (millis()>=24000){
    fill(255);
    text(partitionsum[6],width/2+(width/4),height/2+50);
  }
  if (millis()>=25000){
    fill(255);
    text(partitionsum[7],width/2+(width/4),height/2+100);
    image(series3,width/3-175,height/3+125,400,400);
  }
  if (millis()>=26000){
    fill(255);
    text(partitionsum[8],width/2+(width/4),height/2+150);
  }
  if (millis()>=27000){
    fill(255);
    text(partitionsum[9],width/2+(width/4),height/2+200);
    image(series4,width/3-175,height/3+125,400,400);
  }
  if (millis()>=28000){
    fill(255);
    text(partitionsum[10],width/2+(width/4),height/2+250);
  }
  if (millis()>=29000){
    fill(255);
    // text(partitionsum[11],width/2+(width/4),300);
    text(partitionsum[11],random(width/2,width),random(0,height));
  }
  pop();
  push();
  if (millis()>=30000){

    fill(217,120,85);
    noStroke();
    rect(width/2,0,width/2,height);
    fill(161,191,157);
    rect(0,0,width/2,height);

    push();
    noStroke(0);
    strokeWeight(1);
    fill(255);
    rectMode(CENTER);
    rect(width/2+width/4,height/2,400,400);
    imageMode(CENTER);
    image(dadaimage,width/2+width/4-25,height/2-25,400,400);
    textFont(cormorant);
    textStyle(BOLD);
    textAlign(CENTER);
    textSize(50);
    fill(255);
    stroke(255);
    // pop();
    noStroke(0);

    fill(255);
    // text(partitionsum[11],width/2+(width/4),300);
    text(partitionsum2[0],width/2-(width/4),height/2-250);
  }

  if (millis()>=30000){
    text(partitionsum2[1],width/2-(width/4),height/2-200);
  }
  if (millis()>=31000){
    text(partitionsum2[2],width/2-(width/4),height/2-150);
  }
  if (millis()>=32000){
    text(partitionsum2[3],width/2-(width/4)-100,height/2-100);
    text(partitionsum2[4],width/2-(width/4),height/2-100);
    text(partitionsum2[5],width/2-(width/4)+100,height/2-100);
  }
  if (millis()>=33000){
    text(partitionsum2[6],width/2-(width/4),height/2-50);
  }
  if (millis()>=34000){
    text(partitionsum2[7],width/2-(width/4),height/2);
  }
  if (millis()>=35000){
    text(partitionsum2[8],width/2-(width/4)-150,height/2+50);
    text(partitionsum2[9],width/2-(width/4),height/2+50);
    text(partitionsum2[10],width/2-(width/4)+150,height/2+50);
  }
  if (millis()>=36000){
    text(partitionsum2[11],width/2-(width/4)-50,height/2+100);
    text(partitionsum2[12],width/2-(width/4)+50,height/2+100);
  }
  if (millis()>=37000){
    text(partitionsum2[13],width/2-(width/4),height/2+150);
  }
  if (millis()>=38000){
    text(partitionsum2[14],width/2-(width/4)-1,height/2+200);
    text(partitionsum2[15],width/2-(width/4),height/2+200);
    text(partitionsum2[16],width/2-(width/4)+150,height/2+200);
  }
  if (millis()>=39000){
    text(partitionsum2[17],width/2-(width/4),height/2+250);
  }
  
  if (millis()>=40000){
    text(partitionsum2[17],width/2-(width/4),height/2+250);
  }
  pop();
  
  strokeWeight(0);

  if (scene==1){
    background(255);//green background
    //position to be in top middle
    // song.play();
    drawSquare(); //function to make frame
    textprocessed();//function for text
    soundWave(); //function for sound wave
    // button.position(windowWidth/2-25,100);
    
  }else if (scene==2){
    background(255);//green background
    
    song.pause();
    // button.position(windowWidth/2,windowHeight); //take out button from view
    textFont(fonttitle);
    textAlign(CENTER);
    textSize(35);
    let title2="Journal Entries of My Grandfather's Train Journey";
    text(title2,windowWidth/2,150);
    imgChange();//call to function for images array 
    drawSquare();  

  } else if (scene==3){
    song.pause();
    background(255);
    clear();//basically new background, but for map specifically
    pakistanmap.overlay(canvas);//overlays the canvas with the map

    for (let i = 0; i < destinations.length; i++) {
      destinations[i].display();
    }  
    
    let train0=pakistanmap.latLngToPixel(28.5885595,77.2549491); //Hazrat Station
    let t0=createVector(train0.x,train0.y);
    
    let train1=pakistanmap.latLngToPixel(28.6428915,77.2190894); //New Delhi Station
    let t1=createVector(train1.x,train1.y);
    stroke(0);
    drawTrain(t0,t1);

    let train2=pakistanmap.latLngToPixel(30.9119721,75.8495208); //Ludhiana Station
    let t2=createVector(train2.x,train2.y); 
    stroke(0);
    drawTrain(t1,t2);

    let train3=pakistanmap.latLngToPixel(31.6332336,74.8672281); //Amritsar Station
    let t3=createVector(train3.x,train3.y); 
    stroke(0);
    drawTrain(t2,t3);

    let train4=pakistanmap.latLngToPixel(31.6047570,74.5741360); //Wagah Border
    let t4=createVector(train4.x,train4.y);
    stroke(0);
    drawTrain(t3,t4);

    noStroke();

    if ((mouseX>train0.x-(dix/2))&& (mouseX<train0.x+(dix/2)) && (mouseY>train0.y-(diy/2)) && (mouseY<train0.y+(diy/2))){//boolean if mousex and mousey is in each cardd
      fill(217,120,85);
      rect((train0.x+20),train0.y,290,150,25);
      stroke(0);
      fill(0);

      let station0="Hazrat Nizamuddin Railway Station\n- India -\nSeptember 19, 2020\nInitial Boarding Station For Pakistan\n- found a small spot cabin space to sit in\n- with a friend and his family\n- constantly searched for weaponry";
      textAlign(CENTER);
      textFont(comforta);
      textLeading(20);
      text(station0,train0.x+165,train0.y+20);
    }
    
    if ((mouseX>train1.x-(dix/2))&& (mouseX<train1.x+(dix/2)) && (mouseY>train1.y-(diy/2)) && (mouseY<train1.y+(diy/2))){//boolean if mousex and mousey is in each cardd
      fill(217,120,85);
      rect((train1.x+20),train1.y,290,140,25);
      stroke(0);
      fill(0);

      let station1="- New Delhi Railway Station -\n- India -\nSeptember 19, 1947,\nFirst Train Stop\n- saw armed Hindus and Sikhs\n- heard gunfire from the City";
      textAlign(CENTER);
      textFont(comforta);
      textLeading(20);
      text(station1,train1.x+165,train1.y+20);
    }


    if ((mouseX>train2.x-(dix/2))&& (mouseX<train2.x+(dix/2)) && (mouseY>train2.y-(diy/2)) && (mouseY<train2.y+(diy/2))){//boolean if mousex and mousey is in each cardd
      fill(217,120,85);
      rect((train2.x+20),train2.y,290,175,25);
      stroke(0);
      fill(0);

      let station2="- Ludhiana Railway Station -\n- India -\nSeptember 20, 1947\nSecond Train Stop\n- carts filled with holes\n- about 100 people martyred\n- women and children missing\n- about 40-50 people survived";
      textAlign(CENTER);
      textFont(comforta);
      textLeading(20);
      text(station2,train2.x+165,train2.y+20);
    }



    if ((mouseX>train3.x-(dix/2))&& (mouseX<train3.x+(dix/2)) && (mouseY>train3.y-(diy/2)) && (mouseY<train3.y+(diy/2))){//boolean if mousex and mousey is in each cardd
      fill(217,120,85);
      rect((train3.x+20),train3.y,290,100,25);
      stroke(0);
      fill(0);

      let station3="- Amritsar Junction -\n- India -\nSeptember 20, 1947\nThird Train Stop";
      textAlign(CENTER);
      textFont(comforta);
      textLeading(20);
      text(station3,train3.x+165,train3.y+20);
    }


    if ((mouseX>train4.x-(dix/2))&& (mouseX<train4.x+(dix/2)) && (mouseY>train4.y-(diy/2)) && (mouseY<train4.y+(diy/2))){//boolean if mousex and mousey is in each cardd
      fill(161,191,157);
      rect((train4.x+20),train4.y,290,140,25);
      stroke(0);
      fill(0);

      let station4="- Wagah Border -\n- Pakistan -\nSeptember 20, 1947\nLast Train Stop\n- finally reached Lahore\n- immediately felt a sense of peace";
      textAlign(CENTER);
      textFont(comforta);
      textLeading(20);
      text(station4,train4.x+165,train4.y+20);
    }


    noStroke();
    let train5=pakistanmap.latLngToPixel(28.6561592,77.2410203); //Red Fort
    if ((mouseX>train5.x-(dix/2))&& (mouseX<train5.x+(dix/2)) && (mouseY>train5.y-(diy/2)) && (mouseY<train5.y+(diy/2))){//boolean if mousex and mousey is in each cardd
      fill(217,120,85);
      rect((train5.x+20),train5.y,290,100,25);
      stroke(0);
      fill(0);

      let station5="- Red Fort -\n- India -\nSeptember 19, 1947\n-seen on the way to New Delhi Station";
      textAlign(CENTER);
      textFont(comforta);
      textLeading(20);
      text(station5,train5.x+165,train5.y+20);
    }
    let train6=pakistanmap.latLngToPixel(28.6506792,77.2334421); //Jama Masjid

    if ((mouseX>train6.x-(dix/2))&& (mouseX<train6.x+(dix/2)) && (mouseY>train6.y-(diy/2)) && (mouseY<train6.y+(diy/2))){//boolean if mousex and mousey is in each cardd
      fill(217,120,85);
      rect((train6.x+20),train6.y,290,100,25);
      stroke(0);
      fill(0);

      let station6="- Jama Masjid -\n- India -\nSeptember 19, 1947\n-seen on the way to New Delhi Station";
      textAlign(CENTER);
      textFont(comforta);
      textLeading(20);
      text(station6,train6.x+165,train6.y+20);
    }

    drawSquare();  

  } else if (scene==4){
    background(0);
    song.pause();
    backgroundMap();
    train.update();
    train.show();
    
    // drawSquare();  
  }  
}

function drawTrain(initial, target){
  // push();
  let myheading=initial.heading(target);
  console.log(myheading);
  // rotate(target.heading());
  line(initial.x, initial.y, target.x, target.y);


  // image(partitiontrain, initial.x,initial.y,80,72);
  // image(partitiontrain, target.x,target.y,80,72);

  
    v = p5.Vector.fromAngle(radians(myheading), 30);
    vx = v.x;
    vy = v.y;
    
    initial.x=initial.x+vx;
    initial.y=initial.y+vy;
    
    // image(partitiontrain, initial.x,initial.y,80,72);
    initial.add(v);
  // pop();
}



function doText(data) {
  lines = data;//puts the lines array to the data to use as the text
}

function drawSquare(){
  push();
  noStroke();//white squares to make a frame on each side of the window
  fill(217,120,85);
  rect(windowWidth/2,0,squareWidth,100);//I am using windowWidth to make it more responsive and not having to completely hardcode
  squareWidth=squareWidth+17;
  // console.log(squareWidth);
  if (squareWidth > windowWidth/2) {
    squareWidth = windowWidth/2;
    // console.log(squareWidth);
  }
  // rect(0,0,windowWidth,100);
  // rect(0,0,100,windowHeight);
  if (squareWidth==windowWidth/2){
    rect(windowWidth-100,0,100,squareWidth1);
    squareWidth1=squareWidth1+17;
    // console.log(squareWidth1);
    if (squareWidth1 > windowHeight) {
      squareWidth1 = windowHeight;
      // console.log(squareWidth);
    }
  }
  if (squareWidth1==windowHeight){
    rect(windowWidth,windowHeight-100,squareWidth2,100);
    squareWidth2=squareWidth2-17;
    console.log(squareWidth2);
    if (squareWidth2<-(width/2)) {//-720
      squareWidth2 = -(width/2);
    }
  }
  fill(161,191,157);
  if (squareWidth2==-(width/2)){
    rect(windowWidth/2,windowHeight-100,squareWidth3,100);
    squareWidth3=squareWidth3-17;
    console.log(squareWidth3);
    if (squareWidth3<-(width/2)) {
      squareWidth3 = -(width/2);
    }
  }
  if (squareWidth3==-(width/2)){
    rect(0,windowHeight,100,squareWidth4);
    squareWidth4=squareWidth4-17;
    console.log(squareWidth4);
    if (squareWidth4<-windowHeight) {
      squareWidth4 = -windowHeight;
    }
  }
  if (squareWidth4==-windowHeight){
    rect(0,0,squareWidth5,100);
    squareWidth5=squareWidth5+17;
    console.log(squareWidth5);
    if (squareWidth5> windowWidth/2) {
      squareWidth5 = windowWidth/2;
    }
  }
  pop();
}
function textprocessed(){
  stroke(0);
  fill(0);
  textFont(fonttitle);
  textSize(35);
  textAlign(CENTER);
  title="My Grandfather's Train Journey to Independence";
  
  for (word in title){
    text(title,windowWidth/2,200);
  }
  for (var i = 0; i < lines.length; i++) {//processed the text file line by line to add as subtitles
    stroke(i,0,0);
    fill(i,0,0); //textcolor white
    textFont(font);
    textSize(fontsize);
    textAlign(CENTER);
    text(lines[phrase], windowWidth/2, windowHeight-150);
  }
}
// function mousePressed() {//when mouse is pressed, the phrase will go up -- I will chnage this to a set time using millis later
//   phrase++;
// }
function movingPhrases(){
  if (phrase==lines.length-1){
  phrase=0;
  song.pause();

  } else {
      phrase++;
  }
  if (phrase==1){
    // song.play();
  }
}

function soundWave(){//adapted from https://www.youtube.com/watch?v=jEwAMgcCgOA
  var vol = amp.getLevel();//gets amp level and stors it to vol
  volhistory.push(vol);//puts that vol level into the array
  // var currentY = map(vol, 1, 0, height/2, 1);//make it so that it is positioned on to top portion of the screen, I want to find a way to make it more colourful though
  // translate(width/2, y);//translates it to y 

  beginShape();
  strokeWeight(5);
  noFill();
  for (var i = 0; i < volhistory.length; i++) {//accessing each amp volume in song file and array
    stroke(r-i*1.5,g,b);
    var y = map(volhistory[i]*2, 0, 1, height/2+50, 0);//puts it into each amp level and positions it on top using height
    vertex(i+(width/2)-150, y);//each vertex from the translation of y
    // fill(vol,0);//fill the level from vol variable
  }
  endShape();
  // if (volhistory.length > width-100) {//to make sure that when the track goes to the end of the screen, the line moves
  //   volhistory.splice(0, 1);//removes the first value from the array
  // // line(width-1,0,width-1,1);//creates the line overall and positioned on top 
  // }
}

function backgroundMap(){
  // imageMode(CENTER);//centers positioon
  image(mapimage, 0, 0, windowWidth,windowHeight);

  fill(217,120,85);
  rect((windowWidth-545+100),windowHeight-150,290,150,15);
  stroke(0);
  fill(0);

  let station0="Hazrat Nizamuddin Railway Station\n- India -\nSeptember 19, 2020\nInitial Boarding Station For Pakistan\n- found a small spot cabin space to sit in\n- with a friend and his family\n- constantly searched for weaponry";
  textAlign(CENTER);
  textFont(comforta);
  textLeading(20);
  text(station0,windowWidth-545+245,windowHeight-150+20);
  

  fill(217,120,85);
  rect((windowWidth-875+20),windowHeight-175,290,140,25);
  stroke(0);
  fill(0);

  let station1="- New Delhi Railway Station -\n- India -\nSeptember 19, 1947,\nFirst Train Stop\n- saw armed Hindus and Sikhs\n- heard gunfire from the City";
  textAlign(CENTER);
  textFont(comforta);
  textLeading(20);
  text(station1,windowWidth-875+165,windowHeight-175+20);

  fill(217,120,85);
  rect((windowWidth-700+20),windowHeight-603,290,175,25);
  stroke(0);
  fill(0);

  let station2="- Ludhiana Railway Station -\n- India -\nSeptember 20, 1947\nSecond Train Stop\n- carts filled with holes\n- about 100 people martyred\n- women and children missing\n- about 40-50 people survived";
  textAlign(CENTER);
  textFont(comforta);
  textLeading(20);
  text(station2,windowWidth-700+165,windowHeight-603+20);

  fill(217,120,85);
  rect((windowWidth-900+20),windowHeight-775,290,100,25);
  stroke(0);
  fill(0);

  let station3="- Amritsar Junction -\n- India -\nSeptember 20, 1947\nThird Train Stop";
  textAlign(CENTER);
  textFont(comforta);
  textLeading(20);
  text(station3,windowWidth-900+165,windowHeight-775+20);

  fill(161,191,157);
  rect((windowWidth-1350+20),windowHeight-746,290,140,25);
  stroke(0);
  fill(0);

  let station4="- Wagah Border -\n- Pakistan -\nSeptember 20, 1947\nLast Train Stop\n- finally reached Lahore\n- immediately felt a sense of peace";
  textAlign(CENTER);
  textFont(comforta);
  textLeading(20);
  text(station4,windowWidth-1350+165,windowHeight-746+20);
}

function imgChange(){
  for(i = 0; i < imgparagraph.length; i++){//parses the imgparagraph array 
    imageMode(CENTER);//centers positioon
    image(imgparagraph[0], ximg, yimg, 350,400);//places the image in array in random placess inside the frame with size of 200,100
    //image(imgparagraph[1], ximg, yimg+50, 200,100);
    
    ximg=ximg-1;
    if (ximg < 300) {
      ximg = 300;
    }
    if (ximg==300){
      image(imgparagraph[1], ximg1, yimg, 350,400);
      ximg1=ximg1-1;
      if (ximg1<width/2){
        ximg1=width/2;
      }
    }
    if (ximg1==width/2){
      image(imgparagraph[2], ximg2, yimg, 350,400);
      ximg2=ximg2-1;
      if (ximg2<windowWidth-300){
        ximg2=windowWidth-300;
      }
    }

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

class Destination {
  constructor(x, y, diameter, name) {
    this.x = x;
    this.y = y;
    this.diameter = diameter;
    this.radius = diameter / 2;
    this.name = name;

    this.over = false;
  }

  // Display the destination
  display() {
    stroke(0);
    strokeWeight(0.8);
    noFill();
    imageMode(CENTER);
    pos = pakistanmap.latLngToPixel(this.x, this.y);
    pinlabel=pakistanmap.latLngToPixel(this.x,this.y);
    image(pin,pos.x,pos.y,dix,diy);
  }
}

class Train {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(-1, -1);
  }

  update() {    
    this.pos.add(this.vel);
  }

  show() {
    stroke(255);
    strokeWeight(2);
    fill(255, 100);
    // ellipse(this.pos.x, this.pos.y, 32);
    // rotate(PI / 3.0);
    image(partitiontrain, this.pos.x,this.pos.y,100,80);
    // console.log(this.pos.x,this.pos.y);
    if ((this.pos.x==windowWidth-545) && (this.pos.y==windowHeight-135)){
      this.vel=createVector(0, 0);
    }
    if ((this.pos.x==windowWidth-545) && (this.pos.y==windowHeight-135)){
      this.vel=createVector(-1, -2);
    }
    if ((this.pos.x==windowWidth-779) && (this.pos.y==windowHeight-603)){
      this.vel=createVector(0, 0);
    }
    if ((this.pos.x==windowWidth-779) && (this.pos.y==windowHeight-603)){
      this.vel=createVector(-2, -1.5);
    }
    if ((this.pos.x==windowWidth-975) && (this.pos.y==windowHeight-750)){
      this.vel=createVector(0,0);
    }
    if ((this.pos.x==windowWidth-975) && (this.pos.y==windowHeight-750)){
      this.vel=createVector(-0.625,0.0625);//0.50, 0.05
    }
    if ((this.pos.x==windowWidth-1015) && (this.pos.y==windowHeight-746)){
      this.vel=createVector(0,0);
      image(pindi_home,this.pos.x-35,this.pos.y,pindix,pindiy);
      pindix=pindix+1;
      pindiy=pindiy+1;
      console.log(pindix,pindiy);
      // stroke(0);
      fill(0);
      textFont(fonttitle);
      textSize(fontsize);
      textAlign(CENTER);
      let caption="Our Childhood Home"
      text(caption, windowWidth/2, windowHeight-755);
      if (pindix==700) {
        pindix=pindix+0;
        pindiy=pindiy+y;//glitch, wont work if i put +0
      }
    }

  }
}


