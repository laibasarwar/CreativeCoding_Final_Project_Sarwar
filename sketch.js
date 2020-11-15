

function setup() {
    createCanvas(windowWidth, windowHeight); 
}

function draw() {
    background(0);
    rectMode(CORNER);
    fill(255);
    rect(width/2,height/2-350,600,700);
    fill(255,0,0);
    rect(width/2-600,height/2-350,600,700);
    rectMode(CENTER);
    fill(255,255,0);
    rect(width/2-300,height/2,550,650);
    fill(0);
    rect(width/2+300,height/2-175,550,300);
    fill(0,255,0);
    rect(width/2+300,height/2+175,550,300);

    for (let i=0; i<width; i+=50){
        for (let j=0; j<height; j+=50){
            stroke(0,0,255);
            line(i,0,i,width);
            line(0,j,1500,j);
        }
    }
}

