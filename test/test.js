(function() {
  module('K is for Klass');
  
	test('K should return a function', function() {
	  var k   = K();
	  var k1  = K(function() {});
    var k2  = K(function() {}, {});
    var k3  = K(k2, function() {}, {});
    var k4  = K({}, function() {});
    var k5  = K({}, function() {}, {});
    var k6  = K({});
    equal(typeof k, 'function', 'return type should be a function');
    equal(typeof k1, 'function', 'return type should be a function');
    equal(typeof k2, 'function', 'return type should be a function');
    equal(typeof k3, 'function', 'return type should be a function');  
    equal(typeof k4, 'function', 'return type should be a function');
    equal(typeof k5, 'function', 'return type should be a function');
    equal(typeof k6, 'function', 'return type should be a function');
	});
	
	test('calling constructors returned from K without the new keyword should throw an exception', function() {
	  var k = K();
	  raises(function() {
	    k();
	  }, 'should have raised an exception when calling a constructor without the new keyword');
	  
	  var ns = {a:{b:K()}};
	  raises(function() {
	    ns.a.b();
	  }, 'should have raised an exception when calling a namespaced constructor');
	  
    var unns = ns.a.b;
	  raises(function() {
	    unns();
	  }, 'should have raised an exception when calling a namespaced constructor that is dereferenced');
	  
	});
	
	test('K should do some kind of sane, yet javascripty inheritance', function() {
	  var k1 = K(function() {});
	  var k2 = K(function() {}).proto(k1);
	  var k1inst = new k1;
	  var k2inst = new k2;
	  
	  ok(k1inst instanceof k1, 'k1 should be an instance of its constructor');
	  ok(k2inst instanceof k2, 'k2 should be an instance of its constructor');
	  ok(k2inst instanceof k1, 'k2 should be an instance of k1');
	});
	
	test('K should "fix" the constructor', function() {
	  var k1 = K();
	  var k1inst = new k1;
	  equal(k1inst.constructor, k1, 'constructors should be the same');
	  
	  var k2 = K().proto(k1);
	  var k2inst = new k2;
	  equal(k2inst.constructor, k2, 'constructors should be the same');
	  
	  ok((k2inst.constructor != k1), 'the child class\' constructor should not be the parent class\'');
	});
	
	test('initializers passed to K should assign properties to the created object', function() {
	  var k1 = K(function() {
	    this.bar = 'bar';
	  });
	  var k1inst = new k1;
	  equal(k1inst.bar, 'bar', 'k1inst should have properties from the initializer');
	});
	
	test('passing methods in should assign them to the constructor\'s prototype', function() {
	  var k1 = K(function() {
	    this.foo = 'foo';
	  }, {
	    getFoo: function() {return this.foo}
	  });
	  
	  var k1inst = new k1;
	  equal(k1inst.getFoo(), 'foo', 'method should be attached to the prototype and have access to this');
	  equal(k1inst.getFoo, k1.prototype.getFoo, 'the methods should be the same');
	});
	
})();