let len=150;
let angle=0;
var slider;

function setup() {
  createCanvas(600,500);
  slider=createSlider(0,TWO_PI,PI/4);
}

function draw() {
  background(51);
  angle=slider.value();
  stroke(255);
  translate(300,height);
  //console.log("angle:"+slider);
  branch(150);
}
 
function branch(len) {
  line(0, 0, 0, -len);
  translate(0, -len);
  if (len >6){
    push();
    rotate(angle);
    branch(len * 0.67);
    pop();
    push();
    rotate(-(angle));
    branch(len * 0.67);
    pop();
  }
}