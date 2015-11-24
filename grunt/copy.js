"use strict";

module.exports = {
    build: {
        expand: true,
        cwd: "source",
        dest: "build",
        src: [
            "fonts/**/*.*",
            "images/**/*.*",
            "favicon/**/*.*",
            "audio/**/*.*",
            "manifest.json",
            "sitemap.txt"
        ]
    },
    index: {
        src: "source/modules/_app/templates/index.html",
        dest: "build/index.html"
    }
};
