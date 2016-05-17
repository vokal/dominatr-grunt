"use strict";

module.exports = {
    build: {
        expand: true,
        cwd: "source",
        dest: "build",
        src: [
            "fonts/**/*.*",
            "images/**/*.*",
            "!images/svg-sprite/**/*.*",
            "audio/**/*.*",
            "manifest.json",
            "sitemap.txt"
        ]
    },
    favicon: {
        expand: true,
        cwd: "source/favicon",
        src: "**/*.*",
        dest: "build"
    },
    index: {
        src: ".inlined/modules/_app/templates/index.html",
        dest: "build/index.html"
    }
};
