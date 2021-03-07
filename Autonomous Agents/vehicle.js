class Vehicle{
  constructor(x, y){
    this.pos = createVector(0, 0);
    this.vel = createVector(0, -2);
    this.acc = createVector(x, y);
    this.size = 6;
    this.maxSpeed = 8;
    this.maxforce = 0.2;
  }

  update(){
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  applayForce(force){
    this.acc.add(force);
  }

  seek(target){
    var desired = p5.Vector.sub(new createVector(target.x, target.y), this.pos);
    var d = desired.mag();
    if(d < 100){
      var m = map(d, 0, 100, 0, this.maxspeed);
      desired.setMag(m);
    }else {
      desired.setMag(this.maxSpeed);
    }

    var steer = p5.Vector.sub(desired, this.vel);
    steer.limit(this.maxforce);

    this.applayForce(steer);
  }

  display(){
    var theta = this.vel.heading() + PI / 2;
    fill(127);
    stroke(300);
    strokeWeight(1);
    push();
    translate(this.pos.x, this.pos.y);
    rotate(theta);
    beginShape();
    vertex(0, -this.size * 2);
    vertex(-this.size, this.size * 2);
    vertex(this.size, this.size * 2);
    endShape(CLOSE);
    pop();
  }


}
