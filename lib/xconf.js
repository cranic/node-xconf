var merge = require('deepmerge');
var dotty = require('dotty');
var fs = require('fs');
var path = require('path');

/**
 * Main XConf class
 *
 * @class XConf
 * @constructor
 * @chainable
 */
var XConf = function(){

    if(!(this instanceof XConf))
        return new XConf();

    /**
     * This object holds all the configs from each instance
     *
     * @property __conf
     * @private
     * @type Object
     */
     this.__conf = {};
};

/**
 * Gets the value of a configuration
 *
 * @method Get
 * @public
 * @param {String | Array} name The key to get
 * @return {Mixed} The value of the key or undefined if not found
 */
XConf.prototype.get = function(name){
    if(name === undefined)
        return this.__conf;

    return dotty.get(this.__conf, name);
};

/**
 * Sets the value of a configuration
 *
 * @method Set
 * @public
 * @chainable
 * @param {String | Array} name The key to set
 * @param {Mixed} value The value of the key to set
 * @return {Object} This class as a chain
 */
XConf.prototype.set = function(name, value){
    dotty.put(this.__conf, name, value);

    return this;
};

/**
 * Parses a JSON file and merge it into the main config object
 *
 * @method File
 * @public
 * @chainable
 * @param {String} file The path to the file
 * @return {Object} This class as a chain
 */
XConf.prototype.file = function(file){
    var json = require(file);
    var save = merge(this.__conf, json);
    this.__conf = save;

    return this;
};

/**
 * Parses all JSON files inside a directory
 *
 * @method Dir
 * @public
 * @chainable
 * @param {String} dir The path to the directory
 * @return {Object} This class as a chain
 */
XConf.prototype.dir = function(dir){
    var self = this;
    var files = fs.readdirSync(dir);
    files.sort().forEach(function(file){
        if(file.substring(file.length - 5).toLowerCase() === '.json')
            self.file(path.join(dir, file));
    });

    return this;
};

module.exports = XConf;
