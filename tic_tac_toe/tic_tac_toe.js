let board = [
  ['', '', ''],
  ['', '', ''],
  ['', '', '']
];
let currentPlayer;
let human = 'X';
let ai = 'O';
let w ,h;
let resultP;


function keyPressed(){
  board = [
  ['', '', ''],
  ['', '', ''],
  ['', '', '']
];
  clear();
  loop();
  resultP.html(``);
  print('keyPressed !');
}

function mousePressed(){
  let j = int(mouseX / w);
  let i = int(mouseY / h);
  if(board[i][j] == ''){
    if (currentPlayer == human){
      board[i][j] = 'X';
      currentPlayer = ai;
    }else if (currentPlayer == ai){
      board[i][j] = 'O';
      currentPlayer = human;
    }
  }
  print(i,j);
}
function equals3(a, b, c) {
  return a == b && b == c && a != '';
}

function checkWinner() {
  let winner = null;

  // horizontal
  for (let i = 0; i < 3; i++) {
    if (equals3(board[i][0], board[i][1], board[i][2])) {
      winner = board[i][0];
    }
  }

  // Vertical
  for (let i = 0; i < 3; i++) {
    if (equals3(board[0][i], board[1][i], board[2][i])) {
      winner = board[0][i];
    }
  }

  // Diagonal
  if (equals3(board[0][0], board[1][1], board[2][2])) {
    winner = board[0][0];
  }
  if (equals3(board[2][0], board[1][1], board[0][2])) {
    winner = board[2][0];
  }

  let openSpots = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] == '') {
        openSpots++;
      }
    }
  }

  if (winner == null && openSpots == 0) {
    return 'tie';
  } else {
    return winner;
  }
}

function setup() {
  createCanvas(400, 400);
  w = width / 3;
  h = height / 3;
  currentPlayer = human;
  background(250);
  resultP = createP('');
}

function draw() {
  strokeWeight(3);
  fill(0);
  
  // the lines of bored
  line (w, 0, w, height);
  line (w*2, 0, w*2, height);
  line (0, w, width, w);
  line (0, w*2, width, w*2);
  line (w*2, 0, w*2, height);
  
  
  
  for (let i = 0; i < board.length; i++ ){
    for (let j = 0; j < board[i].length; j++){
      let x = h * j + h / 2;
      let y = w * i + w / 2;
      let spot = board[i][j];
      let r = w / 4;
      if (spot == human) {
        stroke(0);
        line(x - r, y - r, x + r, y + r);
        line(x + r, y - r, x - r, y + r);
      } else if (spot == ai) {
        stroke(0);
        noFill();
        ellipse(x, y, r * 2);
        }
      }
    }
  
    let result = checkWinner();
  if (result != null) {
    noLoop();    
    resultP.style('font-size', '32pt');
    if (result == 'tie') {
      resultP.html('Tie!');
    } else {
      resultP.html(`${result} wins!`);
    }
  }
}
