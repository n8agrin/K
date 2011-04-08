A simple set of helpers to sooth the pains of Javascript inheritance.

Old way:

var Dog = function() {
  this.noise = 'woof';
}

Dog.prototype = new Animal;
Dog.prototype.bark = function() {
  console.log(this.noise);
}

With lib X:

var Dog = K(function() {
  this.noise = 'woof';
})
.proto(Animal)
.mixin({
  bark: function() {
    console.log(this.noise);
  }
});


