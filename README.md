thunkagent
==========

Yieldable [SuperAgent](https://github.com/visionmedia/superagent) with a thunk() method.

_This module is a workaround for SuperAgent's issue [#230](https://github.com/visionmedia/superagent/issues/230)_.

## Install

```sh
$ npm install thunkagent --save
```

## Example

```js
var request = require('thunkagent');
var co = require('co');

co(function *(){
    var ua = 'Mozilla/1.0';
    var response = yield request
        .post('http://httpbin.org/post')
        .send({lorem: 'ipsum'})
        .set('User-Agent', ua)
        .thunk();

    console.log(response.body);
})();
```
