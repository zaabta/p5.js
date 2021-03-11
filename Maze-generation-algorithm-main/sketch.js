var cell;
var cols, rows;
var w = 20;
let gird = [];
var current ;
var stack;

function index(i, j){
  if(i < 0|| j < 0|| i > cols-1|| j > rows-1)
    return -1;
  return i+ j * cols;
}

function setup() {
  createCanvas(400, 400);
  background(0);

  cols = floor(width / w);
  rows = floor(height / w);
  stack = [];

  for(var j = 0; j < rows; j++){
    for(var i = 0; i < cols; i++){
      cell = new Cell(i,j);
      gird.push(cell);
    }
  }
  current = gird[index(cols/2,rows/2)];

}

function draw() {
  frameRate(100);
  background(0);
  // STEP 1
  for(var i = 0; i < gird.length; i++){
    gird[i].show();
  }
  current.visited = true;
  current.heightLight();
  var next = current.checkNeighbors();
  if(next){
    next.visited = true;
  // STEP 2

  stack.push(current);


  // STEP 3
    removeWals(current, next);




    // STEP 4
    current = next;
    // STEP 2
  }else if(stack.length > 0){
    current =  stack.pop();
  }

}

function Cell(i, j){
  this.i = i;
  this.j = j;
  this.walls = [true, true, true, true];
  this.visited = false;

  this.heightLight = function(){
    var x = i * w;
    var y = j * w;
    fill(0, 0, 255, 100);
    rect(x, y, w, w);
  }

  this.show = function () {
    var x = i * w;
    var y = j * w;
    stroke(255);
    strokeWeight(1);

    if(this.walls[0]){
      line(x  ,  y,  x+w,  y);
    }if(this.walls[1]){
      line(x+w,  y,  x+w,  y+w);
    }if(this.walls[2]){
      line(x+w,y+w,    x,   y+w);
    }if(this.walls[3]){
      line(x , y+w,    x,  y);
    }
    if(this.visited){
      noStroke();
      fill(0, 0, 255, 100);
      rect(x, y, w, w);
    }
  }
  this.checkNeighbors = function(){
    var neighbors = [];
    var right =  gird[index(i+1, j)];
    var left =  gird[index(i-1, j)];
    var top =  gird[index(i,j+1)];
    var bottom =  gird[index(i,j-1)];

    if(right && !right.visited){
      neighbors.push(right);
    }
    if(left && !left.visited){
      neighbors.push(left);
    }
    if(top && !top.visited){
      neighbors.push(top);
    }
    if(bottom && !bottom.visited){
      neighbors.push(bottom);
    }

    if(neighbors.length > 0){
      var rnd = neighbors[floor(random(0, neighbors.length))];
      return rnd;
    }else{
      return undefined;
    }
  }
}

function removeWals(current, next){

  var x = current.i - next.i;
  if(x == 1){
    current.walls[3] = false;
    next.walls[1] = false;

  }else if(x == -1){
    current.walls[1] = false;
    next.walls[3] = false;
  }
  var y = current.j - next.j;
  if(y == 1){
    current.walls[0] = false;
    next.walls[2] = false;
  }else if(y == -1){
    current.walls[2] = false;
    next.walls[0] = false;
  }
}
