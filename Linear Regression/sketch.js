var data = []; 
var m = 1;
var b = 0;

function setup() {
  createCanvas(400, 400); 
  background(51);
}

function linearRegression() {
  var xsum = 0;
  var ysum = 0;
  for (var i =0; i< data.length; i++){
    xsum += data[i].x;
    ysum += data[i].y; 
  }
  
  var xmean = xsum / data.length;
  var ymean = ysum / data.length;
  
  var num = 0;
  var dem = 0;
  
  for (var j =0 ;j < data.length ; j++){
    num += (data[j].x - xmean) * (data[j].y - ymean);
    dem += pow((data[j].x - xmean), 2);
  }
  
  m = num / dem ;
  b = ymean -  (m* xmean);
  

}


function drawLine() {
  var xmin = 0;
  var ymin = m * xmin + b;
  var xmax = 1;
  var ymax = m * xmax + b;
  
  xmin = map(xmin, 0, 1, 0, width);
  ymin = map(ymin, 0, 1, height, 0);
  
  xmax = map(xmax, 0,   1, 0, width);
  ymax = map(ymax, 0, 1, height, 0);
  
  stroke(255, 0, 255);
  line(xmin, ymin, xmax, ymax);
}


function draw() {
  background(51);
  
  for (var i = 0; i < data.length; i++ ){
    var x = map(data[i].x, 0, 1, 0, width);
    var y = map(data[i].y, 0, 1, height, 0);
    fill(255);
    noStroke();
    ellipse(x, y, 8, 8);
  }
  if (data.length > 1){
    linearRegression();
    drawLine();
  }
  
}

function mousePressed(){
  var x = map(mouseX, 0, width, 0, 1);
  var y = map(mouseY, 0, height, 1, 0);
  
  var point = createVector(x, y);
  data.push(point);
}