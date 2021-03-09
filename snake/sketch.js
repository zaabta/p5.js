var size = 400;
let snake;
var scl = 10;
var delay = 20;
var score = 0, level = 1;
var rows, clos;
let food;

function setup() {
  createCanvas(size, size);
  snake = new Snake();
  rows = floor(width / scl);
  cols = floor(height / scl);
  food = new Food();
  textSize(20);
}

function draw() {

  if(frameCount % delay == 0){
    background(220);
    snake.display();
    snake.update();
    food.display();
    if(snake.IsEating(food)){
      food = new Food(); // create new food ofr snake
      snake.grow();
      score++;
      if(score % 10 == 10){
        level++;
        if(delay != 0)
          delay -= 5;
        }
      }

      if(snake.isDeath()){
        console.log('dead !');
        score = 0;
        level = 1;
        snake = new Snake();
      }


/*for(var i = 0 ; i < rows; i++){
    for(var j = 0 ; j < cols; j++){
        noFill();
        stroke(0);
        strokeWeight(1);
        rect(i*scl , j*scl, scl, scl);
      }
    }*/
  }
  fill(0);
  text('LEVEL: ');
  text('Score: '+ score, width, 20);

}

function keyPressed() {
  if( keyCode == UP_ARROW){
    if(snake.ydir != 1)
      snake.setdir(0, -1);
  }
  else if( keyCode == DOWN_ARROW){
    if(snake.ydir != -1)
    snake.setdir(0, 1);
  }
  else if( keyCode == RIGHT_ARROW){
    if(snake.xdir != -1)
    snake.setdir(1, 0);
  }
  else if( keyCode == LEFT_ARROW){
    if(snake.xdir != 1)
    snake.setdir(-1, 0);
  }

}
