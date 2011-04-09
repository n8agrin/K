/*
  K is for Klass.
  A simplified syntax for dealing with common
  Javascript class annoyances.
  
  Copyright (c) <2011> <Nathan Agrin>

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in
  all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
  THE SOFTWARE.
*/

!function(context) {
  var K = function() {

    var args = arguments,
        init = function() {},
        methods,
        initializing = false;

    if (args.length > 1) {
      init = args[0], methods = args[1];
    } else if (args.length == 1) {
      (typeof args[0] == 'function') ? (init = args[0]) : (methods = args[0]);
    }

    var konstructor = function() {
      if (this === context || this.toString().match(/native/)) {
        throw new Error('Must use the new keyword to instantiate this class.');
      }
      if (!initializing && init) {
        this._init.apply(this, arguments);
      }
    }

    konstructor.mixin = function(obj) {
      for (var fnname in obj) {
        this.prototype[fnname] = obj[fnname];
      }
      return this;
    }

    konstructor.proto = function(o) {
      if (typeof o == 'object') {
        this.prototype = o;
      } else {
        initializing = true;
        this.prototype = new o;
        initializing = false;
      }
      this.prototype.constructor = this;
      this.prototype._init = init;
      return this;
    }
  
    if (methods) konstructor.mixin(methods);
    konstructor.prototype._init = init;
  
    return konstructor;
  }
  
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = K;
  } else {
    var old = context.K;
    K.noConflict = function() {
      context.K = old;
      return this;
    }
    context.K = K;
  }
}(this);