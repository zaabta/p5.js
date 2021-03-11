
function Stack(){
  this.array = [];
  this.top = -1;

  this.isEmpty = function(){
    return (this.top == -1);
  }

  this.push =function(val){
    this.top += 1;
    this.array.push(val);
  }
  this.pop =function(val){
    if(!this.isEmpty()){
      var item = this.array[this.top];
      this.top -= 1;
      return item;
    }
    return null;
  }
}
