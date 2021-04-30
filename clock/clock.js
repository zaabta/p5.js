
var second, minute, hour;

function setup() {
  createCanvas(600, 600);
  angleMode(DEGREES);
}


function draw() {
  background(0);
  sec = second();
  min = minute();
  h = floor(map(hour(), 0, 24, 1, 12));
  push();
  translate(width/2, height/2);
  rotate(-90);
  noFill();
  // secound
  strokeWeight(20);
  stroke(200, 100, 200, 200);
  arc(0, 0, width - 200, height -200, 0, map(sec, 0, 60, 0, 360));
  push();
  strokeWeight(10);
  rotate(map(sec, 0, 60, 0, 360));
  line(0, 0, 200 -50, 0);
  pop();
  // minute
  stroke(0, 200, 0, 200);
  strokeWeight(20);
  arc(0, 0, width - 150, height -150, 0, map(min, 0, 60, 0, 360));
  push();
  rotate(map(min, 0, 60, 0, 360));
  strokeWeight(10);
  line(0, 0, 100 -50, 0);
  pop();
  // hour
  stroke(255);
  strokeWeight(20);
  arc(0, 0, width - 100, height - 100, 0, map(h, 0, 12, 0, 360));
  push();
  rotate(map(h, 0, 12, 0, 360));
  strokeWeight(10);
  line(0, 0, 150 -50, 0);
  pop();
  stroke(0);
  point(0,0);
  pop();
  
  fill(255);
  textSize(32);
  text(h+":"+min+":"+sec, 10, height - 20);
}
