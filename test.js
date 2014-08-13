'use strict';
var assert = require('assert');
var each = require('./');

it('async tasks will run parallelly', function (done) {
	var fixture = [1,2,3,4,5,6,7,8,9,10];
	var actual = [];
	each(fixture, function (el, i, next) {
		setTimeout(function () {
			actual.push(el);
			next();
		}, Math.random() * 2000);
	}, function () {
		assert.equal(actual.length, fixture.length);
		assert.notDeepEqual(actual, fixture);
		done();
	});
});

it('sync tasks will still run serially', function (done) {
	var fixture = [1,2,3,4,5,6,7,8,9,10];
	var actual = [];
	each(fixture, function (el, i, next) {
		var i = Math.floor(Math.random() * 10000);
		while(i--) {}
		actual.push(el);
		next();
	}, function () {
		assert.equal(actual.length, fixture.length);
		assert.deepEqual(actual, fixture);
		done();
	});
});

it('stop iteration on first error', function (done) {
	var j = 0;
	each([1,2,3], function (el, i, next) {
		j++;
		next(true);
	}, function () {
		assert.strictEqual(j, 1);
		done();
	});
});
