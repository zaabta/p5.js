class Pipe {
  constructor(){
    this.spacing = 175;
    this.top = random(height / 3, 3 / 4 * height);
    this.bottom = height - (this.top + this.spacing);
    this.x = width;
    this.w = topPipeSprite.width - 30;
    this.speed = 5;
  }

  collided (bird) {
    if (bird.y - bird.size / 2 < this.top + pipeHead.height - 5  || bird.y + bird.size / 2 > (height - this.bottom) - pipeHead.height + 5) {
     if (bird.x + bird.size / 2 > this.x && bird.x + bird.size / 2 < this.x + this.w) {
       return true;
     }
   }
   return false;
  }

  show() {
    /*fill(255);
    rect(this.x, 0, this.w, this.top);
    rect(this.x, height - this.bottom, this.w, this.bottom);*/

    // The top pipe
    image(topPipeSprite, this.x, 0, this.w ,this.top);
    image(pipeHead, this.x, this.top - pipeHead.height - 5, this.w ,pipeHead.height + 5);

    // The buttom pipe
    image(bottomPipeSprite, this.x, height - this.bottom, this.w ,this.bottom);
    image(pipeHead, this.x, (height - this.bottom) - pipeHead.height + 10, this.w ,pipeHead.height + 5);


  }

  update() {
    this.x -= this.speed;
  }

  offscreen() {
    if (this.x < -this.w) {
      return true;
    } else {
      return false;
    }
  }


}
