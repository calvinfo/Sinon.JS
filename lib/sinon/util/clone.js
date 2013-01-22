/*jslint eqeqeq: false, onevar: false*/
/*global sinon, module, require, ActiveXObject, XMLHttpRequest, DOMParser*/
/**
 * Simple clone utility
 *
 * Original implementation by Jeremy Ashkenas from [underscore.js](https://github.com/documentcloud/underscore)
 * Modifications by Calvin French-Owen
 *
 * @author Jeremy Ashkenas
 * @author Calvin French-Oen
 * @license BSD
 *
 * Copyright (c) 2013 Jeremy Ashkenas, Calvin French-Owen
 */
"use strict";

if (typeof sinon == "undefined") {
    this.sinon = {};
}

(function () {

    var breaker = {};

    var each = function(obj, iterator, context) {
      if (obj == null) return;
      if (Array.prototype.forEach && obj.forEach === Array.prototype.forEach) {
        obj.forEach(iterator, context);
      } else if (obj.length === +obj.length) {
        for (var i = 0, l = obj.length; i < l; i++) {
          if (iterator.call(context, obj[i], i, obj) === breaker) return;
        }
      } else {
        for (var key in obj) {
          if (obj.hasOwnProperty(key)) {
            if (iterator.call(context, obj[key], key, obj) === breaker) return;
          }
        }
      }
    };

    var extend = function(obj) {
      each(Array.prototype.slice.call(arguments, 1), function(source) {
        if (source) {
          for (var prop in source) {
            obj[prop] = source[prop];
          }
        }
      });
      return obj;
    };

    var isObject = function(obj) {
      return obj === Object(obj);
    };

    var isArray = Array.isArray || function(obj) {
      return obj.toString() == '[object Array]';
    };

    sinon.clone = function(obj) {
      if (!isObject(obj)) return obj;
      return isArray(obj) ? obj.slice() : extend({}, obj);
    };

    sinon.cloneArgs = function (args) {
      var clone = new Array(args.length);

      each(args, function (arg) {
        clone.push(sinon.clone(arg));
      });
    };
}());
