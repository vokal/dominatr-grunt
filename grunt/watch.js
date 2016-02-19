"use strict";

module.exports = {
    options: {
        event: [ "changed", "added", "deleted" ],
        spawn: false
    },
    index: {
        files: "<%= copy.index.src %>",
        tasks: [ "copy:index" ]
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
        files: [
            "source/modules/*/styles/*.*",
            "build/svg-sprite/css/sprite.less"
        ],
        tasks: [ "less", "postcss" ]
    },
    media: {
        options: { cwd: "<%= copy.build.cwd %>" },
        files: "<%= copy.build.src %>",
        tasks: [ "newer:copy:build" ]
    },
    sprite: {
        options: { cwd: "<%= svg_sprite.use.cwd %>" },
        files: "<%= svg_sprite.use.src %>",
        tasks: [ "svg_sprite" ]
    },
    livereload: {
        options: { livereload: true },
        files: [ "build/**/*.*" ]
    }
};
