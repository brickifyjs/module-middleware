'use strict';

var getObjectByPath = require('@brickify/m-gobp');
var TYPE_STRING = 'string';

function applyMiddlewares(scope, callBack) {
  var queueIndex = -1;
  var args = Array.prototype.slice.call(arguments);
  var previous = null;

  args.splice(0, 2);

  function next() {
    queueIndex++;

    var argsNext = Array.prototype.slice.call(arguments);

    if (scope[queueIndex] && scope[queueIndex].disabled) {
      queueIndex++;
    }

    if (scope.length === queueIndex) {
      return typeof callBack === 'function' && callBack.apply(null, argsNext);
    }

    argsNext.unshift(next);

    return previous = scope[queueIndex] && scope[queueIndex].next.apply(null, argsNext) || previous;
  }

  return next.apply(null, args);
}

function createParams(mw, opts) {
  return {
    next: mw,
    disabled: opts.disabled
  };
}

function registerMiddleware(method, mw, opts) {
  opts = opts || {};

  method.__middlewares = method.__middlewares || [];

  if (method.__middlewares[opts.index] && opts.override) { // override
    method.__middlewares[opts.index] = createParams(mw, opts);
  } else if (opts.index && opts.index < method.__middlewares.length) {  // Add it first
    method.__middlewares.unshift(createParams(mw, opts));
  } else if (opts.index && opts.index > method.__middlewares.length) { // Add it end
    method.__middlewares.push(createParams(mw, opts));
  } else { // Add to specific index
    method.__middlewares.splice(opts.index || method.__middlewares.length, 0, createParams(mw, opts));
  }
}

var middleware = function (NS, mw, opts) {
  opts = opts || {};

  if (typeof NS === TYPE_STRING) {
    // Get the function by path
    var objbp = getObjectByPath(NS, opts.context);
    if (!objbp) {
      return;
    }

    var path = objbp.object.parent;
    var methodName = objbp.paths.last;
  }

  var method = (path && path[methodName] || NS);

  registerMiddleware(method, mw, opts);

  method.__origin = method.__origin || method;

  var middlewares = method.__middlewares;
  var origin = method.__origin;

  if (path && path[methodName]) {
    path[methodName] = applyMiddlewares.bind(null, path[methodName].__middlewares, origin);
  } else {
    NS = function () {
      return applyMiddlewares.bind(null, NS.__middlewares, origin).apply(null, Array.prototype.slice.call(arguments));
    }

    method = NS;

  }

  method.__middlewares = middlewares;
  method.__origin = origin;

  return method;
};

module.exports = middleware;
