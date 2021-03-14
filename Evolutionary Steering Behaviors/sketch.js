
let goodFoods = [];
let poisonFoods = []
let vehicles = [];
const TOTALOFFOODS = 60;
const TOTALOFVEHICLES = 30;
let showWeights;

function setup() {
  createCanvas(windowWidth, windowHeight);
  for(var i = 0; i < TOTALOFFOODS; i++){
    goodFoods[i] = new Target();
    poisonFoods[i] = new Target();
  }

  for(var j = 0; j < TOTALOFVEHICLES; j++){
    vehicles[j] = new Vehicle(random(width),random(height));
  }
  showWeights = createCheckbox();
}

function draw() {
  background(0);
  if(random(1) < 0.001){
      goodFoods.push(new Target());
      poisonFoods.push(new Target());
  }
  for(let food of goodFoods){
    food.display(color(0, 255, 0));
  }

  for(let poisonFood of poisonFoods){
    poisonFood.display(color(255, 0, 0));
  }

  for(var i = vehicles.length -1 ; i >= 0; i--){
    vehicles[i].behaviors(goodFoods, poisonFoods);
    vehicles[i].update();
    vehicles[i].display();
    vehicles[i].boundaries();

    if(random(1) < 0.0005){
      vehicles.push(vehicles[i].clone());
    }

    if(vehicles[i].death()){
      goodFoods.push(new Target(vehicles[i].pos.x,vehicles[i].pos.y));
      vehicles.splice(i, 1);
    }

  }

}

function mousePressed(){
  vehicles.push(new Vehicle(mouseX, mouseY));
  console.log('mouse pressed !');
}
