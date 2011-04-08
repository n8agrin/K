(function(global) {

global.K = function() {

  var args = arguments,
      init,
      methods,
      noop = function() {},
      initializing = false;

  var isFn = function(obj) {
    return (typeof obj == 'function');
  }

  var konstructor = function() {
    if (this === global || this.toString().match(/native/) || typeof this.constructor === 'object') {
      throw new Error('Must use the new keyword to instantiate this class.');
    }
    if (!initializing && this._init) {
      this._init.apply(this, arguments);
    }
  };

  // Provide basic mixin functionality
  konstructor.mixin = function(obj) {
    for (var fnname in obj) {
      if (obj.hasOwnProperty(fnname)) {
        this.prototype[fnname] = obj[fnname];
      }
    }
    return this;
  };

  konstructor.proto = function(o) {
    if (typeof o == 'object') {
      this.prototype = o;
    } else {
      initializing = true;
      this.prototype = new o;
      initializing = false;
    }
    this.prototype.constructor = this;
    return this;
  }

  if (args.length > 1) {
    init = args[0];
    konstructor.mixin(methods);
  } else if (args.length == 1) {
    isFn(args[0]) ? (init = args[0]) : (konstructor.mixin(args[0]) && init = noop);
  }

  konstructor.prototype._init = init;

  return konstructor;
};

})(this);
