[![Build Status](https://travis-ci.org/cranic/node-xconf.png)](https://travis-ci.org/cranic/node-xconf) ![Dependencies Status](https://david-dm.org/cranic/node-xconf.png) [![Gittip](http://img.shields.io/gittip/cranic.png)](https://www.gittip.com/cranic)

[![NPM Status](https://nodei.co/npm/xconf.png?downloads=true)](http://npmjs.org/package/xconf)


## XConf

Load and access multiple configuration files in one simple module.

### Usage

You first need to create your configuration files, just like this:

```
--> config/default.json

{
    "port" : 8080,
    "domain" : "localhost",
    "api_key" : "9af4d8381781baccb0f915e554f8798d"
}

--> config/production.json

{
    "port" : 80,
    "domain" : "mysuppaapp.com"
}
```

All done, all you need to do is load your configuration with an easy to use chainable
API.

```javascript
var config = require('xconf')();
config.file('./config/default.json').file('./config/production.json');

console.log(config.get('api_key'));
```

This command should output `9af4d8381781baccb0f915e554f8798d`. The config object
is merged in the chain order, so in this exemple the `port` configuration should
be `80` and *not* `8080`.

Be aware that XConf will merge arrays too.

### Getting and setting configs

You can access deep keys inside your config file using dot notation or arrays. As
example lets load this JSON:

```javascript
{
    "here" : {
        "is" : {
            "adeep" : {
                "example" : true
            }
        }
    }
}
```

It's easy to access those keys:

```javascript
var config = require('xconf')();
config.file('./config/default.json');

console.log(config.get('here.is.adeep.example'));

// or using arrays

console.log(config.get(['here']['is']['adeep']['example']));
```

To set a config value you use `.set` instead of `.get`:

```
config.set('here.is.adeep.example', false);
```

If the key isn't found it will be automatically created. Be aware that the `.set`
method won't write anything to your disk.

### Loading entire directories

You can load directories by using `.dir`, just like this:

```javascript
var config = require('xconf')();
config.dir('./config');

console.log(config.get('apikey'));
```

### Testing

```bash
git clone https://github.com/cranic/node-xconf ./xconf
cd ./xconf && npm install && make test
```

### License

(The MIT License)

Copyright (c) 2009-2013 Cranic Tecnologia e Informática LTDA <contato@cranic.com.br>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

