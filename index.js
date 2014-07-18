var request = require('superagent');

request.Request.prototype.thunk = function() {
    var self = this;
    return function(fn) {
        self.end(function(err, res) {
            fn(err, res);
        });
    };
};

request.parse.image = function(res, fn) {
    var data = '';
    res.setEncoding('binary');
    res.on('data', function(chunk){
        data += chunk;
    });
    res.on('end', function () {
        fn(null, data);
    });
};

module.exports = request;
