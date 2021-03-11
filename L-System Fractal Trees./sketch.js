var Axiom="F";
var sentence=Axiom;
var len =50;
var angle =0;



var rules = [];
rules[0] = {
  a: 'F',
  b: 'FF+[+F-F-F]-[-F+F+F]'
};

function Generate(){
  len*=0.75;
  var nextsentence="";
  for(var i=0; i<sentence.length; i++){
    var current=sentence.charAt(i);
    var found =false;
    for( var j=0;j<rules.length;j++){
    if(current==rules[j].a){
      found=true;
      nextsentence+=rules[j].b;
      break;
     }
   }
    if(!found)
      nextsentence+=current;
  }
  sentence=nextsentence;
  createP(sentence);
  if(len = 5.801453125){
    stop();
  }
  branch();
}

function branch(){
  background(0);
  resetMatrix();
   translate(width/2,height);
  stroke(255);
  for(var i=0;i<sentence.length;i++){
     var current=sentence.charAt(i);
     
     if(current == "F" ){
       line(0,0,0,-len);
       translate(0,-len);
      }else if(current == "+" ){
      rotate(angle);
    }else if(current == "-" ){
      rotate(-angle);
    }else if(current == "[" ){
      push();
    }else if(current == "]" ){
      pop();
    }
 }
}
  

function setup() {
  createCanvas(600,700);
  background(0);
  angle=radians(25);
  createP(Axiom);
  branch();
  var button=createButton("Generate");
  button.mousePressed(Generate);
  
}


function draw() {

}