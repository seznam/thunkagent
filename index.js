var request = require('superagent');

request.Request.prototype.thunk = function() {
    var self = this;
    return function(fn) {
        self.end(function(err, res) {
            fn(err, res);
        });
    };
};

module.exports = request;
