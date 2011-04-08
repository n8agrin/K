A simple set of helpers to sooth the pains of Javascript inheritance.

Old way:

    var Dog = function() {
      this.noise = 'woof';
    }
    
    Dog.prototype = new Animal;
    Dog.prototype.constructor = Dog;
    
    Dog.prototype.bark = function() {
      console.log(this.noise);
    }

With K:

    var Dog = K(function() {
      this.noise = 'woof';
    })
    .proto(Animal)
    .mixin({
      bark: function() {
        console.log(this.noise);
      }
    });

# But wait, why?

There are a ton of great Javascript inheritance libraries out there. Here's a short list:

* http://ejohn.org/blog/simple-javascript-inheritance/
* http://mootools.net/docs/core/Class/Class
* http://www.danwebb.net/2008/1/31/low-pro-for-jquery
* http://api.prototypejs.org/language/Class/
* https://github.com/ded/klass
* https://github.com/shinyplasticbag/MojoClass

They all have their merits. But I find that they all attempt to do one thing, build an OOP system on top of Javascript's prototype inheritance. One can do this, and rather successfully. In fact this small lib initially started as an OOP-on-top-of-JS as well, until I found all of my ideas codified in @ded's klass library and @shinypb's mojoclass. So I thought, "Why not start anew and strip everything back?" How often do I call super anyway?

The conclusion I came to was, "Not often."

So I took what I had and peeled everything away until I had effectively the following features:

* A guard against calling the constructor without the new keyword.
* A simple way to express a parent prototype object which preserves the constructor.
* A simple syntax for adding methods from an object onto the prototype object of a constructor. 

Please provide suggestions and feedback. Better yet, fork away and hack! By no means do I think this lib definitive and finalized. And by no means do I think it is the "right way" to do inheritance. It's just another option.
