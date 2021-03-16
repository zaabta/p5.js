class Bird{
  constructor(){
    this.x = width / 5;
    this.y = height / 2;
    this.size = 30; //the size of bird
    this.velY = 0; // the velocity of Y
    this.velX = 0;  // the velocity of X => panSpeed
    this.gravity = 0.6; // the gravity of bird
    this.lift = -14; // flying rate
    this.fallRotation = -PI / 6;
    this.source = 0;
  }

  show(){
    /*
    fill(255);
    ellipse(this.x ,this.y, this.size, this.size - 10);
    */
    push();
    translate(this.x - this.size / 2 - 8 + birdSprite.width  / 2, this.y - this.size / 2 + birdSprite.height / 2);
    if (this.velY < 2) { // TO UP
      rotate(-PI / 6);
      this.fallRotation = -PI / 6;
    } else if (this.velY > 0 && this.velY < 5.32) { // TO DOWN
      this.fallRotation += PI / 8.0;
      this.fallRotation = constrain(this.fallRotation, -PI / 6, PI / 3);
      rotate(this.fallRotation);
      //rotate(map(this.velY, 0, 4, -PI / 6, PI / 2));
    } else { // FELL
      rotate(PI / 2);
    }
      image(birdSprite, -birdSprite.width / 2, -birdSprite.height / 2);
    pop();
  }

  update(){
    this.velY += this.gravity;
    this.velY *= 0.9;
    this.y += this.velY;

    if(ground.collided(this)){ // fell to the ground
      this.y = ground.topPixelCoord - this.size / 2 ;
      this.velY = 0;
    }

    if(this.y + this.size <= 0){ // out of the canvas
      this.y = 0;
      this.velY = 0;
    }
  }

  up(){ // (FLY) GO UP
    this.velY += this.lift;
  }

  Source(pipes){
      if(floor(pipes[0].x) === floor(this.x)){  // passed the pipes
          bird_point.play();
        if(pipes[0].top + pipeHead.height < this.y && (height - pipes[0].bottom) - pipeHead.height + 10 > this.y){
            this.source += 1;
            if(!(mute.checked()))
              bird_point.play();
          }
        }
    return this.source;
  }


}
