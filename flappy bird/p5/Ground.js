class Ground {
  constructor() {
    this.height = 40; // height of the ground
    this.topPixelCoord = height - this.height;  // be in buttom
    this.pixelOffset = 0;
  }

  show() { // display the ground
    fill(0);
    rect(0, this.topPixelCoord, width, this.height);
    for (var i = this.pixelOffset; i < width; i += groundSprite.width) {
      image(groundSprite, i, this.topPixelCoord, groundSprite.width, this.height);
    }
  }



  update() {
    this.pixelOffset -= speedGame;
    if (this.pixelOffset <= -groundSprite.width) {
      this.pixelOffset += groundSprite.width;
    }
  }

  collided(p) {
    return bird.y + birdSprite.height / 2 >= this.topPixelCoord;
  }
}
