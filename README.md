## Module Middleware

Apply middleware to any methods/functions

## Statistics

[![Github All Releases](https://img.shields.io/github/downloads/brickifyjs/module-middleware/total.svg?style=flat-square)](https://github.com/brickifyjs/module-middleware)
[![npm](https://img.shields.io/npm/dt/@brickify/m-middleware.svg?style=flat-square)](https://www.npmjs.com/package/@brickify/m-middleware)

## Social
[![GitHub forks](https://img.shields.io/github/forks/brickifyjs/module-middleware.svg?label=Fork&style=flat-square)](https://github.com/brickifyjs/module-middleware)
[![GitHub stars](https://img.shields.io/github/stars/brickifyjs/module-middleware.svg?label=Stars&style=flat-square)](https://github.com/brickifyjs/module-middleware)
[![GitHub watchers](https://img.shields.io/github/watchers/brickifyjs/module-middleware.svg?label=Watch&style=flat-square)](https://github.com/brickifyjs/module-middleware)
[![Gitter](https://img.shields.io/gitter/room/brickifyjs/module-middleware.svg?style=flat-square)](https://gitter.im/brickifyjs/module-middleware)

## Project Health

[![Travis branch](https://img.shields.io/travis/brickifyjs/module-middleware/master.svg?style=flat-square)](https://travis-ci.org/brickifyjs/module-middleware)
[![Codecov](https://img.shields.io/codecov/c/github/brickifyjs/module-middleware.svg?style=flat-square)](https://codecov.io/gh/brickifyjs/module-middleware)
[![bitHound](https://img.shields.io/bithound/dependencies/github/brickifyjs/module-middleware.svg?style=flat-square)](https://www.bithound.io/github/brickifyjs/module-middleware/master/dependencies/npm)
[![bitHound](https://img.shields.io/bithound/devDependencies/github/brickifyjs/module-middleware.svg?style=flat-square)](https://www.bithound.io/github/brickifyjs/module-middleware/master/dependencies/npm)
[![Website](https://img.shields.io/website/https/m-middleware.js.brickify.io.svg?label=website&style=flat-square)](https://m-middleware.js.brickify.io)

## Install

```bash
$ npm install @brickify/m-middleware
```

## Usage

```js

'use strict';

// Import lib
var lib = require('../lib');

// Assign methods
var mw = lib.middleware;
var disable = lib.disable;
var enable = lib.enable;
var toggle = lib.toggle;
var remove = lib.remove;

// Namespace method
var ns = {
  foo: function (arg0) {
    return arg0 + 1;
  }
};

// First middleware
function foo(next, arg0) {
  return next(arg0 + 1);
}

// Attach NS to process for later
process.ns = ns;


// Attach middleware, Can be attached by an object path without context
mw('ns.foo', foo);
// Run method
ns.foo(1);
// output: 3

// Attach middleware, Can be attached by an object path with context
mw('ns.foo', foo, {
   context: ns
});
// Run method
ns.foo(1);
// output: 4  

// Attach middleware, Can be a attached to a method
ns.foo = mw(ns.foo, foo);
// Run method
ns.foo(1);
// output: 5  

// Attach middleware, Can have a specific index
ns.foo = mw(ns.foo, foo, {
   index: 6
});
// Run method
ns.foo(1);
// output: 6

// Attach middleware, Can have a fewer index to be at first
ns.foo = mw(ns.foo, foo, {
   index: -1
});
// Run method
ns.foo(1);
// output: 7

// Attach middleware, Can have a bigger index to be at last
ns.foo = mw(ns.foo, foo, {
   index: 20
});
// Run method
ns.foo(1);
// output: 8 

// Attach middleware, Can be overrided if already exist
ns.foo = mw(ns.foo, foo, {
   index: 0,
   override: true
});
// Run method
ns.foo(1);
// output: 8 

// Attach middleware, Can be disabled on attached
ns.foo = mw(ns.foo, foo, {
   disabled: true
});
// Run method
ns.foo(1);
// output: 8 

// Attached middleware, Can be programmatically disabled
disable(ns.foo, foo);
// Run method
ns.foo(1);
// output: 7 

// Attached middleware, Can be programmatically enabled
enable(ns.foo, foo);
// Run method
ns.foo(1);
// output: 8

// Attached middleware, Can be programmatically toggled
toggle(ns.foo, foo);
// Run method
ns.foo(1);
// output: 7 

// Attached middleware, Can be programmatically removed
remove(ns.foo, foo); // Remove disabled one... because of same function assigned previously
remove(ns.foo, foo);
// Run method
ns.foo(1);
// output: 6 

```

## Imports

```js
// Import all methods
var lib = require('@brickify/m-middleware');

// Import enable method
var enable = require('@brickify/m-middleware/enable');

// Import disable method
var disable = require('@brickify/m-middleware/disable');

// Import toggle method
var toggle = require('@brickify/m-middleware/toggle');

// Import remove method
var remove = require('@brickify/m-middleware/remove');
```

## TODO
* Add JSDoc, comment and Code Signature
