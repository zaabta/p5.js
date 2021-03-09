class Food{
  constructor(){
    this.x = (floor(random(width)) % 10) * 10;
    this.y = (floor(random(height)) % 10) * 10;
    this.pos = createVector(this.x, this.y);
  }

  display(){
    fill(255, 0, 0, 200);
    noStroke();
    rect(this.pos.x, this.pos.y, scl, scl);
  }


}
