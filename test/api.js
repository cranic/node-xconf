var xconf = require(__dirname + '/../lib/xconf')();
var assert = require('assert');

describe('API methods testing', function(){
    beforeEach(function(){
        xconf = require(__dirname + '/../lib/xconf')();
    });

    describe('.file', function(){
        it('Should load one file without problems', function(){
            xconf.file(__dirname + '/dummy/default.json');
            assert.equal(xconf.get('port'), 8080);
        });

        it('Should merge two configurations', function(){
            xconf.file(__dirname + '/dummy/production.json').file(__dirname + '/dummy/production.json');
            assert.equal(xconf.get('port'), 80);
        });
    });

    describe('.get', function(){
        it('Should be able to get a simple key', function(){
            xconf.file(__dirname + '/dummy/default.json');
            assert.equal(xconf.get('port'), 8080);
        });

        it('Should be able to get a deep key', function(){
            xconf.file(__dirname + '/dummy/production.json');
            assert.ok(Array.isArray(xconf.get('deep.key')));
        });
    });

    describe('.set', function(){
        it('Should be able to set a simple key', function(){
            xconf.file(__dirname + '/dummy/default.json');
            xconf.set('port', 9999);

            assert.equal(xconf.get('port'), 9999);
        });

        it('Should be able to set a deep key', function(){
            xconf.file(__dirname + '/dummy/default.json');
            xconf.set('another.deep.key', true);

            assert.equal(xconf.get('another.deep.key'), true);
        });
    });

    describe('.dir', function(){
        it('Should merge all configs in one dir', function(){
            xconf.dir(__dirname + '/dummy');

            assert.equal(xconf.get('port'), 80);
            assert.deepEqual(xconf.get('deep.key'), [1, 2, 3, 4, 5, 6]);
        });
    });
});
