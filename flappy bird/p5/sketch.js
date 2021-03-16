var groundSprite, birdSprite, background, topPipeSprite, bottomPipeSprite;
let ground, bird, pipes = [];
var counter = 0;
var font, bird_wing, bird_point, bird_hit;
var speedGame = 1;
var mute;
var size = 600;


function preload() {
  groundSprite = loadImage('./groundPiece.png');
  birdSprite = loadImage('./fatBird.png');
  bg = loadImage('./background.png');
  topPipeSprite = loadImage('./full pipe top.png');
  bottomPipeSprite = loadImage('./full pipe bottom.png');
  pipeHead = loadImage('./pipeHead0000.png');
  font = loadFont('./04B_19__.TTF');
  soundFormats('wav', 'ogg');
  bird_wing = loadSound('./sound/sfx_wing');
  bird_point = loadSound('./sound/sfx_point');
  bird_hit = loadSound('./sound/sfx_hit');
}

function setup() {
  createCanvas((floor(floor(windowHeight / 10)/10) * 10) * 10, (floor(floor(windowHeight / 10)/10) * 10) * 10);
  ground = new Ground();
  bird = new Bird();
  pipes.push(new Pipe());
  textFont(font);
  textSize(width / 10);
  textAlign(CENTER, CENTER);
  mute = createCheckbox(' Mute', false);
}

function draw() {
  background(bg);
  counter++;

  for (var i = pipes.length - 1; i >= 0; i--) {
    pipes[i].show();
    pipes[i].update();
    if (pipes[i].offscreen()) {
          pipes.splice(i, 1);
        }
    if (pipes[i].collided(bird) || ground.collided(bird)) {
      //console.log("HIT");
      if(!(mute.checked()))
        bird_hit.play();
      bird = new Bird();
      pipes = [];
      pipes.push(new Pipe());
      counter = 0;
      counter++;
    }
  }

  bird.update();
  bird.show();

  ground.show();
  ground.update();

  fill(255);
  text(bird.Source(pipes), width / 2, 40);

  if (counter % 75 == 0) {
    pipes.push(new Pipe());
  }
}


function mousePressed(){
  if(mouseX < width && mouseY < height)
    bird.up();
  if(!(mute.checked()))
    bird_wing.play();
}
