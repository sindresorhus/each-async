# each-async

> Async concurrent iterator (async forEach)

Like [async.each()](https://github.com/caolan/async#eacharr-iterator-callback), but tiny.

I often use `async.each()` for doing async operations when iterating, but I almost never use the other gadzillion methods in `async`.

Async iteration is one of the most used async control flow patterns.

**I would strongly recommend using promises instead. You could then use the built-in [`Promise.all()`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise/all), or [`p-map`](https://github.com/sindresorhus/p-map) if you need concurrency control.**


## Install

```
$ npm install --save each-async
```


## Usage

```js
const eachAsync = require('each-async');

eachAsync(['foo','bar','baz'], (item, index, done) => {
	console.log(item, index);
	done();
}, error => {
	console.log('finished');
});
//=> 'foo 0'
//=> 'bar 1'
//=> 'baz 2'
//=> 'finished'
```


## API

### eachAsync(input, callback, [finishedCallback])

#### input

Type: `Array`

Array you want to iterate.

#### callback(item, index, done)

Type: `Function`

Called for each item in the array with the following arguments:

- `item`: the current item in the array
- `index`: the current index
- `done([error])`: call this when you're done with an optional error. Supplying anything other than `undefined`/`null` will stop the iteration.

Note that order is not guaranteed since each item is handled concurrently.

#### finishedCallback(error)

Type: `Function`

Called when the iteration is finished or on the first error. First argument is the error passed from `done()` in the `callback`.


## License

MIT © [Sindre Sorhus](https://sindresorhus.com)
