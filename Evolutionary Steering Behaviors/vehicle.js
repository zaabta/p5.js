
class Vehicle{
  constructor(x, y, dna){
    this.pos = createVector(x, y);
    this.vel = createVector(0, -2);
    this.acc = createVector(0, 0);
    this.size = 4;
    this.maxSpeed = 4;
    this.maxforce = 0.1;
    this.health = 1;
    this.dna = [];
    if(dna){
       this.dna = dna;
      // Mutation with mutateRate 0.01
      if(random(1) < 0.01) this.dna[0] = random(-0.1, 0.1);
      if(random(1) < 0.01) this.dna[1] = random(-0.1, 0.1);
      if(random(1) < 0.01) this.dna[2] = random(-10, 10);
      if(random(1) < 0.01) this.dna[3] = random(-10, 10);
    }else{
        this.dna = [];
        // the weights food
        this.dna[0] = random(-2, 2);
        // the weights poison
        this.dna[1] = random(-2, 2);
        // food perception
        this.dna[2] = random(0, 100);
        // poison perception
        this.dna[3] = random(0, 100);
    }
  }

  update(){
    this.health -= 0.001;
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  applayForce(force){
    this.acc.add(force);
  }

  seek(target){
    let targetV = new createVector(target.x, target.y)
    var desired = p5.Vector.sub(targetV, this.pos);
    var d = desired.mag();
    if(d < 50){
      var m = map(d, 0, 50, 0, this.maxspeed);
      desired.setMag(m);
    }else {
      desired.setMag(this.maxSpeed);
    }

    var steer = p5.Vector.sub(desired, this.vel);
    steer.limit(this.maxforce);

    //this.applayForce(steer);

    return steer;
  }

  clone(){
    return new Vehicle(this.pos.x, this.pos.y, this.dna);
  }

  eat(foods, nutrition, perception){
    var record = Infinity;
    var closest = null;
    for(var i = foods.length -1; i >=0; i--) {
      var d = dist(this.pos.x , this.pos.y , foods[i].x, foods[i].y);
      // this is the moment of eat
      if(d < this.maxSpeed){
        foods.splice(i, 1);
        this.health += nutrition;
      }else{
      if(d < record && d < perception){
        record = d;
        closest = foods[i];
      }
    }
  }


    if(closest){
      return this.seek(closest);
    }

    return createVector(0,0);
  }

  behaviors(good , bad){
    var steerGood = this.eat(good, 0.1, this.dna[2]);
    var steerBad = this.eat(bad, -0.2, this.dna[3]);

    steerGood.mult(this.dna[0]);
    steerBad.mult(this.dna[1]);

    this.applayForce(steerGood);
    this.applayForce(steerBad);
  }

  display(){
    var theta = this.vel.heading() + PI / 2;
    push();

    translate(this.pos.x, this.pos.y);
    rotate(theta);

    if(showWeights.checked()){
      noFill();
      stroke(0, 255, 0);
      line(0, 0, 0, -this.dna[0]*25);
      ellipse(0, 0, this.dna[2] * 2);

      stroke(255, 0, 0);
      line(0, 0, 0, -this.dna[1] * 25);
      ellipse(0, 0, this.dna[3] * 2);
    }

    const gr = color(0, 255, 0);
    const rd = color(255, 0, 0);
    const col = lerpColor(rd, gr, this.health);

    fill(col);
    stroke(col);
    strokeWeight(1);
    beginShape();
    vertex(0, -this.size * 2);
    vertex(-this.size, this.size * 2);
    vertex(this.size, this.size * 2);
    endShape(CLOSE);

    pop();
  }

  boundaries(){
    var desired = null;
    var d = 35;

    if(this.pos.x < d){
      desired = createVector(this.maxSpeed, this.vel.y);
    }else if(this.pos.x > width - d){
      desired = createVector(-this.maxSpeed, this.vel.y)
    }

    if(this.pos.y < d){
      desired = createVector(this.vel.x , this.maxSpeed);
    }else if(this.pos.y > height - d){
      desired = createVector(this.vel.x , -this.maxSpeed)
    }

    if(desired !== null){
      desired.normalize();
      desired.mult(this.maxSpeed);
      var steer = p5.Vector.sub(desired, this.vel);
      steer.limit(this.maxforce);
      this.applayForce(steer);
    }
  }

  death(){
    return (this.health < 0)
  }


}


p5.Vector.prototype.mult = function (n) {
  if (Number.isNaN(n)) return;
    this.x *= n;
    this.y *= n;
    this.z *= n;
    return this;
};
