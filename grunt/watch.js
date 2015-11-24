"use strict";

module.exports = {
    options: {
        event: [ "changed", "added", "deleted" ]
    },
    index: {
        files: "<%= copy.index.src %>",
        tasks: [ "copy:index" ]
    },
    js: {
        files: "<%= jshint.dev.src %>",
        tasks: [ "newer:jshint:dev", "browserify:build" ]
    },
    templates: {
        options: { cwd: "<%= ngtemplates.build.cwd %>" },
        files: "<%= ngtemplates.build.src %>",
        // TODO: cut browserify out of this?
        tasks: [ "ngtemplates", "browserify:build" ]
    },
    styles: {
        files: "source/modules/*/styles/*.*",
        tasks: [ "less" ]
    },
    media: {
        options: { cwd: "<%= copy.build.cwd %>" },
        files: "<%= copy.build.src %>",
        tasks: [ "newer:copy:build" ]
    },
    livereload: {
        options: {
            "livereload": true
        },
        files: [ "build/**/*.*" ]
    }
};
