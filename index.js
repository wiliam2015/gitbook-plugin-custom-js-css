var path = require('path');
var fs = require('fs');
var _ = require('lodash');
var tmp = require('tmp');
var crypto = require('crypto');


function getConfig(context, property, defaultValue) {
    var config = context.config ? /* 3.x */ context.config : /* 2.x */ context.book.config;
    return config.get(property, defaultValue);
}



function getAssets() {
    var result;
    var book = this;
    var tmpobj = tmp.dirSync();
    var customJsFiles = getConfig(this,'pluginsConfig.custom-js-css.js', []);
    var customCssFiles = getConfig(this,'pluginsConfig.custom-js-css.css', []);
    var jsfiles = [];
    var cssfiles = [];

    customJsFiles.forEach(function(file) {

        var origin = book.resolve(file);
        // Add a hash to avoid name collisions
        var filename = hash(origin) + '-' + path.basename(origin);
        var output = path.resolve(tmpobj.name, filename);

        var content = fs.readFileSync(origin);
        book.log.debug.ln('copying js script,origin', origin);
        book.log.debug.ln('copying js script,output', output);
        fs.writeFileSync(output, content);

        jsfiles.push(filename);
    });

    customCssFiles.forEach(function(file) {
        book.out
        var origin = book.resolve(file);
        // Add a hash to avoid name collisions
        var filename = hash(origin) + '-' + path.basename(origin);
        var output = path.resolve(tmpobj.name, filename);

        var content = fs.readFileSync(origin);

        book.log.debug.ln('copying css script,origin', origin);
        book.log.debug.ln('copying css script,output', output);
        fs.writeFileSync(output, content);

        cssfiles.push(filename);
    });

    result = {
        assets: tmpobj.name,
        js: jsfiles,
        css: cssfiles
    };

    return  _.cloneDeep(result);
}

function hash(str) {
    return crypto
        .createHash('md5')
        .update(str, 'utf8')
        .digest('hex');
}

module.exports = {
    website: getAssets,
    hooks:{

        "finish:before":function(){
            var book = this;
            var bookOutPath = book.output.root();
            var customJsFiles = getConfig(this,'pluginsConfig.customJsCss.js', []);
            var customCssFiles = getConfig(this,'pluginsConfig.customJsCss.css', []);

            customJsFiles.forEach(function(file) {
                var origin =book.resolve(file);
                var jsFilePath = path.resolve(bookOutPath,file);
                //delete file
                fs.unlinkSync(jsFilePath);
                book.log.debug.ln('delete js script', jsFilePath);

            });

            customCssFiles.forEach(function(file) {
                var origin =book.resolve(file);
                var cssFilePath = path.resolve(bookOutPath,file);
                //delete file
                fs.unlinkSync(cssFilePath);
                book.log.debug.ln('delete css styles', cssFilePath);
            });
        }

    }
};