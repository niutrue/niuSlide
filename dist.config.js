'use strict';
var config = require('./config');

module.exports = {
    'copyBegin':'dev/**/*.*',
    'copyEnd':'dist',
    'compressBegin':'dev/js/' + config.fileName + '.js',
    'compressEnd':'dist/js',
    'cleanFile':'dist/js/' + config.fileName + '.js',
    'fileName':config.fileName
}
