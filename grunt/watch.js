"use strict";

module.exports = {
    options: {
        event: [ "changed", "added", "deleted" ]
    },
    index: {
        files: "<%= copy.index.src %>",
        tasks: [ "copy:index" ]
    },
    browserify: {
        files: [
            "build/templates.js",
            "source/modules/**/*.js",
            "!source/modules/*/tests/**/*.*"
        ],
        tasks: [ "browserify:build" ]
    },
    jshint: {
        files: "<%= jshint.dev.src %>",
        tasks: [ "newer:jshint:dev" ]
    },
    templates: {
        options: { cwd: "<%= ngtemplates.build.cwd %>" },
        files: "<%= ngtemplates.build.src %>",
        tasks: [ "ngtemplates" ]
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
