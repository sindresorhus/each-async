/*!
	each-async
	Async parallel iterator
	https://github.com/sindresorhus/each-async
	by Sindre Sorhus
	MIT License
*/
(function () {
	'use strict';

	function once(fn) {
		var called = false;

		if (typeof fn !== 'function') {
			throw new TypeError;
		}

		return function () {
			if (called) {
				throw new Error('Callback already called.');
			}
			called = true;
			fn.apply(this, arguments);
		}
	}

	function each(arr, next, cb) {
		var failed = false;

		cb = cb || function () {};

		if (!Array.isArray(arr)) {
			throw new TypeError('First argument must be an array');
		}

		if (typeof next !== 'function') {
			throw new TypeError('Second argument must be a function');
		}

		if (!arr.length) {
			return cb();
		}

		for (var i = 0, l = arr.length; i < l; i++) {
			next(arr[i], i, once(function (err) {
				if (failed) {
					return;
				}

				if (err !== undefined && err !== null) {
					failed = true;
					return cb(err);
				}

				if (i === l) {
					return cb();
				}
			}));
		}
	}

	if (typeof module !== 'undefined' && module.exports) {
		module.exports = each;
	} else {
		window.eachAsync = each;
	}
})();
