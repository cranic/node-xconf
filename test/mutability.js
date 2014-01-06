var assert = require('assert');
var xconf1 = require(__dirname + '/../lib/xconf')();
var xconf2 = require(__dirname + '/../lib/xconf')();

describe('General mutability tests', function(){
    before(function(){
        xconf1.file(__dirname + '/dummy/default.json');
        xconf2.file(__dirname + '/dummy/production.json');
    });

    describe('Instance 1', function(){
        it('Should not be overrided by instance 2', function(){
            assert.equal(xconf1.get('port'), 8080);
            assert.deepEqual(xconf1.get('deep.key'), [1, 2, 3]);
        });
    });

    describe('Instance 2', function(){
        it('Should not be overrided by instance 1', function(){
            assert.equal(xconf2.get('port'), 80);
            assert.deepEqual(xconf2.get('deep.key'), [4, 5, 6]);
        });
    });
});
