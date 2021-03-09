class Snake{
  constructor(){
    this.body = [];
    this.body[0] = createVector(0,0);
    this.xdir = 1;
    this.ydir = 0;
    this.len = 1;
  }

  display(){
    for(var i = 0; i < this.len; i++){
    fill(0);
    rect(this.body[i].x,this.body[i].y, scl, scl);
    }
  }

  update(){
    let head = this.body[this.body.length - 1].copy();
    this.body.shift();
    head.x += floor(this.xdir * scl);
    head.y += floor(this.ydir * scl)
    this.body.push(head);



    if(this.body[this.len-1].x >= width){
      this.body[this.len-1].x = 0;
    }else if (this.body[this.len-1].x < 0){
      this.body[this.len-1].x = width;
    }

    else if(this.body[this.len-1].y >= height){
      this.body[this.len-1].y = 0;
    }else if (this.body[this.len-1].y < 0){
      this.body[this.len-1].y = height;
    }
  }

  IsEating(food){
    var d = dist(this.body[this.len-1].x, this.body[this.len-1].y, food.pos.x, food.pos.y);
    if(d == 0){
      console.log('Yam !');
      return true;
    }
    return false;
  }


  setdir(x, y){
    this.xdir = x;
    this.ydir = y;
  }

  grow(){
    this.len++;
    this.body.push(this.body[this.body.length -1]);
  }

  isDeath(){
    for(var i = 0; i < this.body.length - 1; i++){
      var dis = dist(this.body[this.body.length -1].x, this.body[this.body.length -1].y, this.body[i].x, this.body[i].y);
      if(dis == 0 && this.body[this.body.length -1] != this.body[i]){
        console.log(dis);
        return true;
      }
    }
    return false;
  }

}
