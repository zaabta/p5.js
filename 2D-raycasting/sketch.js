let walls;
let particle;
let xOFF, yOFF;

function setup() {
  cnv = createCanvas(800, 800);
  walls = [];

  for(var i = 0; i < 5; i++){
    let x1  = floor(random(height));
    let x2  = floor(random(width));
    let y1  = floor(random(height));
    let y2  = floor(random(width));
    walls.push(new Boundary(x1, y1, x2, y2));
  }

  walls.push(new Boundary(-1, -1, width, -1));
  walls.push(new Boundary(width, -1, width, height));
  walls.push(new Boundary(width, height, -1, height));
  walls.push(new Boundary(-1, height, -1, -1));
  particle = new Particle();

  xOFF = 0;
  yOFF = 10000;
}

function draw() {
  background(0);
  for(var i = 0; i < walls.length; i++){
    walls[i].show();
  }
  particle.look(walls);
  particle.show();
  particle.update(mouseX, mouseY);
  //particle.update(noise(xOFF) * width, noise(yOFF) * heigh);
  xOFF += 0.01;
  yOFF += 0.01;
}
