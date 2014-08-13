'use strict';
var onetime = require('onetime');

module.exports = function (arr, next, cb) {
	var failed = false;
	var count = 0;

	cb = cb || function () {};

	if (!Array.isArray(arr)) {
		throw new TypeError('First argument must be an array');
	}

	if (typeof next !== 'function') {
		throw new TypeError('Second argument must be a function');
	}

	var len = arr.length;

	if (!len) {
		return cb();
	}

	function callback(err) {
		if (failed) {
			return;
		}

		if (err !== undefined && err !== null) {
			failed = true;
			return cb(err);
		}

		if (++count === len) {
			return cb();
		}
	}

	for (var i = 0; i < len; i++) {
		next(arr[i], i, onetime(callback, true));
	}
};