class Target{
  constructor(){
    this.x = width / 2;
    this.y = height / 2;
    this.radius = 30;
  }

  moveAccordingTo(x, y){
    if(x < width && x > 0)
      this.x = x;
    if(y < height && y > 0)
      this.y = y;
  }

  display(){
    fill(255, 150);
    ellipse(this.x, this.y, this.radius, this.radius);
  }
}
