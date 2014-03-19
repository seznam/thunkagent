var request = require('./index');
var assert = require('assert');
var co = require('co');

describe('thunkagent thunk()', function() {
    it('should return a valid thunk', co(function*(){
        var ua = 'Mozilla/1.0';
        var res = yield request
            .post('http://httpbin.org/post')
            .send({lorem: 'ipsum'})
            .set('User-Agent', ua)
            .thunk();

        assert.equal(res.status, 200);
        assert.equal(res.body.headers['User-Agent'], ua);
        assert.equal(res.body.json['lorem'], 'ipsum');
    }));
});
