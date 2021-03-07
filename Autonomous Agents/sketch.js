
let target;
let vehicle;

function setup() {
  createCanvas(600, 400);
  target = new Target();
  vehicle = new Vehicle();
}

function draw() {
  background(0);
  target.moveAccordingTo(mouseX, mouseY);
  target.display();

  vehicle.seek(target);
  vehicle.update();
  vehicle.display();

}
