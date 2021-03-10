var cities = [];
var totalofcities = 10;
var recordDist;
var best;

function setup() {
  createCanvas(600, 400);
  for (var i = 0; i < totalofcities; i++){
    cities[i] = createVector(random(width), random(height));
  }
  recordDist = calDistance(cities);
  best = cities.slice();
}

function draw() {
  background(0);
  fill(255);
  for (var i = 0; i < totalofcities; i++){
    ellipse(cities[i].x, cities[i].y,10,10);
  }

  stroke(255);
  strokeWeight(1);
  noFill();
  beginShape();
  for (var i = 0; i < totalofcities; i++){
    vertex(cities[i].x, cities[i].y);
  }
  endShape();

  var i = floor(random(cities.length));
  var j = floor(random(cities.length));

  swap(cities, i, j);

  var d = calDistance(cities);
  if(d < recordDist){
    recordDist = d;
    console.log(recordDist);
    best = cities.slice();
  }

  stroke(255, 100, 255, 255);
  strokeWeight(2);
  noFill();
  beginShape();
  for (var i = 0; i < totalofcities; i++){
    vertex(best[i].x, best[i].y);
  }
  endShape();


}

function swap(arr, i, j){
  var temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

function calDistance(points){
  var sum = 0;
  for (var i = 0; i < points.length -1; i++){
       var d = dist(points[i].x, points[i].y, points[i+1].x, points[i+1].y);
       sum += d;
    }

  return sum;
}