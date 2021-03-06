/*
* Copyright (c) 2012, Liferay Inc. All rights reserved.
* Code licensed under the BSD License:
* https://github.com/liferay/alloy-ui/blob/master/LICENSE.txt
*
* @author Eduardo Lundgren <eduardo.lundgren@liferay.com>
*/

(function() {

    var TMPDIR = process.env.TMPDIR,
        YOGI_PATH = process.env.YOGI_PATH,
        YOGI_ALLOY_PATH = __dirname + '/../',

        command = require('command'),
        path = require('path'),

        requireAlloy = function(p) {
            return require(path.join(YOGI_ALLOY_PATH, p));
        },

        requireYogi = function(p) {
            return require(path.join(YOGI_PATH, p));
        },

        file = requireAlloy('lib/file'),

        git = requireYogi('lib/git'),
        log = requireYogi('lib/log'),
        util = requireYogi('lib/util');

    exports.run = function(cmd, files, opt_options) {
        var cwd = git.findRoot() + '/../',
            runner = command.open(cwd),
            component = file.getJSON(cwd + '/component.json'),
            alloy = file.getJSON(YOGI_ALLOY_PATH + '/alloy.json'),
            compassConfig = alloy.compass,
            compassConfigPath = YOGI_ALLOY_PATH + '/lib/ruby/compass.rb',
            compassConfigTempPath = TMPDIR + Date.now() + '.rb';

        util.mix(compassConfig, opt_options || {});

        file.replaceTokens(
            compassConfigPath,
            {
                extension: compassConfig['output-style'] === 'compressed' ? 'min.css' : 'css',
                version: component.version
            },
            compassConfigTempPath
        );

        var invokeArgs = [cmd];

        invokeArgs.push('-c');
        invokeArgs.push(compassConfigTempPath);

        Object.keys(compassConfig).forEach(function(key) {
            invokeArgs.push('--' + key);

            if (compassConfig[key] !== null) {
                invokeArgs.push(compassConfig[key]);
            }
        });

        invokeArgs = invokeArgs.concat(files);

        runner.on('stdout', function(data) {
            log.log(data.toString());
        });

        log.info(util.good + ' file(s): ' + files.join(', ') + ' (' + compassConfig['output-style'] + ')' );

        return runner.exec('compass', invokeArgs, { cwd: cwd });
    };

}());