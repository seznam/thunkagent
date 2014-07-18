var request = require('./index');
var assert = require('assert');
var co = require('co');
var fs = require('fs');
var express = require('express');

app = express();

describe('thunkagent thunk()', function() {
    app.post('/post', function(req, res) {
        res.writeHead(200, {'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            headers: { 'User-Agent': 'Mozilla/1.0' },
            json: { lorem: 'ipsum' }
        }));
    });

    var img = fs.readFileSync(__dirname + '/test.jpg');

    app.get('/image', function(req, res) {
        res.writeHead(200, {'Content-Type': 'image/jpeg' });
        res.end(img, 'binary');
    });

    app.listen(9999);


    it('should return a valid thunk', co(function*(){
        var ua = 'Mozilla/1.0';
        var res = yield request
            .post('http://localhost:9999/post')
            .send({lorem: 'ipsum'})
            .set('User-Agent', ua)
            .thunk();

        assert.equal(res.status, 200);
        assert.equal(res.body.headers['User-Agent'], ua);
        assert.equal(res.body.json.lorem, 'ipsum');
    }));

    it('should parse image as binary', co(function*(){
        var res = yield request
            .get('http://localhost:9999/image')
            .thunk();

        assert.equal(res.status, 200);
        var body = new Buffer(res.body, 'binary');
        for (var i = 0; i < img.length; ++i) {
            assert.equal(img[i], body[i]);
        }
    }));
});
