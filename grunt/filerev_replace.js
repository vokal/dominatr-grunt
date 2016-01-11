"use strict";

module.exports = {
    options: {
        assets_root: "build"
    },
    compiled_assets: {
        src: "build/**/*.{js,css}"
    },
    views: {
        options: {
            views_root: ""
        },
        src: "build/index.html"
    }
};
