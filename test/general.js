var assert = require('assert');
var xconf = require(__dirname + '/../lib/xconf')();

describe('General structure testing', function(){
    describe('instanceof', function(){
        it('xconf should be an instance of itself', function(){
            assert.ok(xconf instanceof xconf.constructor);
        });
    });

    describe('.get', function(){
        it('should be a function', function(){
            assert.equal(typeof xconf.get, 'function');
        });
    });

    describe('.set', function(){
        it('should be a function', function(){
            assert.equal(typeof xconf.set, 'function');
        });
    });

    describe('.file', function(){
        it('should be a function', function(){
            assert.equal(typeof xconf.file, 'function');
        });
    });

    describe('.dir', function(){
        it('should be a function', function(){
            assert.equal(typeof xconf.dir, 'function');
        });
    });
});
