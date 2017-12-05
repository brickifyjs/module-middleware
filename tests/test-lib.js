'use strict';

var o = require('ospec');
var lib = require('../lib');
var mw = lib.middleware;
var disable = lib.disable;
var enable = lib.enable;
var toggle = lib.toggle;
var remove = lib.remove;

var ns = {
  foo: function (arg0) {
    return arg0 + 1;
  }
};

function foo(next, arg0) {
  return next(arg0 + 1);
}

function bar(next, arg0) {
  return next(arg0 + 1);
}

process.ns = ns;

o.spec('Middlewares', function () {

  o('Can be applyed by an object path without context', function () {
    mw('ns.foo', foo);

    o(ns.foo(1)).equals(3);
  });

  o('Can be applyed by an object path with context', function () {
    mw('ns.foo', foo, {
      context: ns
    });

    o(ns.foo(1)).equals(4);
  });

  o('Can be a applyed to a function', function () {
    ns.foo = mw(ns.foo, foo);

    o(ns.foo(1)).equals(5);
  });

  o('Can have an index', function () {
    ns.foo = mw(ns.foo, foo, {
      index: 6
    });

    o(ns.foo(1)).equals(6);
  });

  o('Can have a fewer index', function () {
    ns.foo = mw(ns.foo, foo, {
      index: -1
    });

    o(ns.foo(1)).equals(7);
  });

  o('Can have a bigger index', function () {
    ns.foo = mw(ns.foo, foo, {
      index: 20
    });

    o(ns.foo(1)).equals(8);
  });

  o('Can be overrided', function () {
    ns.foo = mw(ns.foo, foo, {
      index: 0,
      override: true
    });

    o(ns.foo(1)).equals(8);
  });

  o('Can be disabled', function () {
    ns.foo = mw(ns.foo, foo, {
      disabled: true
    });

    o(ns.foo(1)).equals(8);
  });

  o('Should not applyed when not found', function () {
    mw('ns.bar');

    o(ns.foo(1)).equals(8);
  });

  o('Can be programmatically disabled', function () {
    disable(ns.foo, foo);
    disable(ns.foo, bar);

    o(ns.foo(1)).equals(7);
  });

  o('Can be programmatically enabled', function () {
    enable(ns.foo, foo);
    enable(ns.foo, bar);

    o(ns.foo(1)).equals(8);
  });

  o('Can be programmatically toggled', function () {
    toggle(ns.foo, foo);
    toggle(ns.foo, bar);

    o(ns.foo(1)).equals(7);
  });

  o('Can be programmatically removed', function () {
    remove(ns.foo, foo); // Remove disabled one... because of same function assigned previously
    remove(ns.foo, foo);
    remove(ns.foo, bar);

    o(ns.foo(1)).equals(6);
  });
});
