"use strict";

module.exports = function ()
{
    return {
        dev: {
            options: {
                force: true,
                jshintrc: ".jshintrc"
            },
            src: [
                "source/modules/**/*.js",
                "tests/**/*.js",
                "grunt/*.js"
            ]
        },
        deploy: {
            options: {
                force: false,
                jshintrc: ".jshintrc"
            },
            src: "<%= jshint.dev.src %>"
        }
    };

};
