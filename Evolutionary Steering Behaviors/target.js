class Target{
  constructor(x ,y){
    this.radius = 8;
    if(x && y){
      this.x = x;
      this.y = y;
    }else {
      this.x = random(this.radius, width - this.radius);
      this.y = random(this.radius, height - this.radius);
    }
  }

  moveAccordingTo(x, y){
    if(x < width && x > 0)
      this.x = x;
    if(y < height && y > 0)
      this.y = y;
  }

  display(color){
    fill(color);
    noStroke();
    ellipse(this.x, this.y, this.radius, this.radius);
  }
}
