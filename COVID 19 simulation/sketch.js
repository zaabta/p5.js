class Orang{

  constructor(x,y,r,p){
    this.r = r;
    this.pos = createVector(x,y);
    this.vel = createVector((random(-1,1)),(random(-1,1)));
    this.vel.mult(4);
    this.status = 1;
    this.waktusakit=0;
    
    
    /*
      menentukan peluang sebuah objek WFH atau tetap beraktifitas
      true jika tetap beraktifias, false berarti WFH
      jika WFH makan tidak bisa tertular
      semakin kecil ambang batas, maka semakin banyak yang WFH
      
    */
    this.move=true;
    
    
    this.peluangbepergian=p;
    if(random()>this.peluangbepergian){
      this.move=false;
    }
  }
  
  tumbukan(lain){   
    var jarak = dist(this.pos.x, this.pos.y, lain.pos.x, lain.pos.y);
    
    return(jarak <= (this.r+lain.r));

  }

  tumbukan(lain){
    var jarak = dist(this.pos.x, this.pos.y, lain.pos.x, lain.pos.y)
    
    if(jarak <= this.r+ lain.r){
       return true;
    }else{
      return false;
    }
  }
  gantaiarah(lain){

       var tmp = lain.vel;
      lain.vel = this.vel;
      this.vel = tmp; 

   
  }
  penularan(lain,timestamp){
    if(this.status==2 && lain.status==1){
       lain.status=2;
        lain.waktusakit = timestamp;
    }
    
    if(lain.status==2 && this.status==1){
       this.status=2;
        this.waktusakit = timestamp;
    }
  }
  ceksembuh(waktunyata,masapenyembuhan){
    if (waktunyata >= this.waktusakit+masapenyembuhan){
        this.status=3;
    }
  }
  update(){
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    
    if(this.pos.y+this.vel.y-this.r <= 0 || this.pos.y+this.vel.y+this.r >= (height-100)){
       this.vel.y = this.vel.y*-1
    }
    
    if(this.pos.x+this.vel.x-this.r <= 0 || this.pos.x+this.vel.x+this.r >= width){
       this.vel.x = this.vel.x*-1
    }
  }
  
  show(){
    noStroke();
    ellipseMode(RADIUS);
    var col;
    
    switch(this.status){
      case 1: col = color(0,200,0); break;
      case 2: col = color(200,0,0); break;
      case 3: col = color(0,0,200); break;
    }
    fill(col);
    ellipse(this.pos.x, this.pos.y, this.r, this.r);
    
  }

}



//jumlah objek
var jum=10;

//peluang sebuah objek itu bepergian 0 sd 1
// nilai 1 berarti pasti bepergian, nilai 0 berarti diam
var peluangbepergian = 1;

//sebarapa lama kemampuan sistem kesehatan menyembuhkan pasien
//bisa dianalogikan seberapa bagus fasilitas kesehatan, semakin besar berarti semakin buruk faskes
var masapenyembuhan=150;

//ukuran wilayah persegi (sisi)
var sisi = 500;

//batas kemampuan penanganan kesehatan 0 sd 100
var faskes = 80;




var h= []

//besar dari objek
var radius = 5;

var waktunyata=0;

// kalkulasi populasi
// sh =  sehat, sk = sakit, sm = sembuh
var kalkulasi={sh:0, sk:0, sm:0, mt:0};

//pertumbuhan angka sakit perwaktu
var psakit=[];

var info;


function setup() {
  createCanvas(sisi, sisi);
  for(var i=0; i<jum;i++){
    var x = random(0+radius,width-radius);
    var y = random(0+radius,height-radius-100);
    h.push(new Orang(x,y,radius,peluangbepergian));
  }
  h[0].status=2;
  h[0].move=true;
  info = createElement("h1");  
}
kalkulasi.mt = 0;
function draw() {
  background(255);
 
  kalkulasi.sh = 0;
  kalkulasi.sk = 0;
  kalkulasi.sm = 0;

  
   for(var i=0; i<jum;i++){
     for(var j=i; j<jum;j++){
       var tumbukan = h[i].tumbukan(h[j]);
       if(j!=i & tumbukan){
          h[i].gantaiarah(h[j]);
         
           if((h[i].status==2 || h[j].status==2) & !(h[i].status==2 && h[j].status==2)){
              h[i].penularan(h[j],waktunyata);
          }
        }
     }
     switch(h[i].status){
      case 1: kalkulasi.sh++; break;
      case 2: kalkulasi.sk++; break;
      case 3: kalkulasi.sm++; break;
    }

    if(h[i].status==2){
        h[i].ceksembuh(waktunyata,masapenyembuhan);
    }
    if(h[i].move){
      h[i].update();
    }
    h[i].show();
  }
  
  
//   if(kalkulasi.sk>0 && sel>kalkulasi.mt && sel>0){
//      kalkulasi.mt=sel;
//     //kalkulasi.sm -= sel;
//      }
  
  if(kalkulasi.sk>faskes){
       kalkulasi.mt=kalkulasi.sk-faskes;
     }
  //menampilkan info angka
  var kal = kalkulasi.sm-kalkulasi.mt <0?0:kalkulasi.sm-kalkulasi.mt;
  info.html(`healty: ${kalkulasi.sh} <br> sick: ${kalkulasi.sk} <br> recovered: ${kal} <br> dead: ${kalkulasi.mt}`);
  
   if(kalkulasi.sk>0){
    psakit.push([kalkulasi.sh,kalkulasi.sk,kalkulasi.sm]);
   }
  
  //menggambar grafik pertumbukan data di bagian bawah
  stroke(0);
  line(0,height-100, width,height-100);
  
  //garis batas kemampuan fasilitas kesehatan
  stroke(125);
  line(0,height-faskes, width,height-faskes);
  
  
  for(var c =0; c<psakit.length; c++){
    
    
        var m0 = map(psakit[c][0], 0, jum, 0, 100);
        stroke(0,200,0,125);
        line(c, height-100, c,height-100+m0); 
    
    
        var m1 = map(psakit[c][1], 0, jum, 0, 100);
        stroke(200,0,0,125);
        line(c,height, c, height-m1); 
    
      
        var m2 = map(psakit[c][2], 0, jum, 0, 100);
        stroke(0,0,200,125);
        line(c, height-100, c,height-100+m2); 
    }

    
    
    //frame dihentikan saat sudah tidak ada yang sakit
    if(kalkulasi.sk==0){
      //noLoop();
 
      redraw();
    }
    
    waktunyata++;
  }
