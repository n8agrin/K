!function (context) {
  var K = function () {

    var args = arguments,
        init = function () {},
        methods,
        initializing = false;

    if (args.length > 1) {
      init = args[0];
      methods = args[1];
    } else if (args.length == 1) {
      (typeof args[0] == 'function') ? (init = args[0]) : (methods = args[0]);
    }

    var konstructor = function () {
      if (this === context || this.toString().match(/native/)) {
        throw new Error('Must use the new keyword to instantiate this class.');
      }
      if (!initializing && init) {
        this._init.apply(this, arguments);
      }
    };

    konstructor.mixin = function (obj) {
      for (var fnname in obj) {
        if (obj.hasOwnPrototype(fname)) {
          this.prototype[fnname] = obj[fnname];
        }
      }
      return this;
    };

    konstructor.proto = function (o) {
      if (typeof o == 'object') {
        this.prototype = o;
      } else {
        initializing = true;
        this.prototype = new o();
        initializing = false;
      }
      this.prototype.constructor = this;
      this.prototype._init = init;
      return this;
    };
  
    if (methods) {
      konstructor.mixin(methods);
    }
    konstructor.prototype._init = init;
  
    return konstructor;
  };
  
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = K;
  } else {
    var old = context.K;
    K.noConflict = function () {
      context.K = old;
      return this;
    };
    context.K = K;
  }
}(this);