"use strict";

var replacements = [
    {
        from: "{{ VERSION }}",
        to: "<%= version %>"
    },
    {
        from: "{{ APIROOT }}",
        to: "<%= APIRoot %>"
    }
];

module.exports = {
    build: {
        src: [
            "build/*.css",
            "build/*.js",
            "build/**/*.html"
        ],
        overwrite: true,
        replacements: replacements
    },
    coverage: {
        src: [ "coverage/**/*.json" ],
        overwrite: true,
        replacements: [ {
            from: "./build/",
            to: "build/"
        } ]
    }
};
