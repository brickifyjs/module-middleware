'use strict';

var middleware = require('./middleware');
var disable = require('./disable');
var enable = require('./enable');
var toggle = require('./toggle');
var remove = require('./remove');

module.exports = {
  middleware: middleware,
  disable: disable,
  enable: enable,
  toggle: toggle,
  remove: remove
};

