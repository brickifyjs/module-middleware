'use strict';

module.exports = function (method, mw) {
  var middleware = method.__middlewares.map(function (opts) {
    return opts.next;
  }).indexOf(mw);


  if (middleware > -1) {
    method.__middlewares[middleware].disabled = !method.__middlewares[middleware].disabled;
  }


  return middleware;
};
