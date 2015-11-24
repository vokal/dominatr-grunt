module.exports = function ()
{
    "use strict";

    return {
        dev: {
            options: {
                force: true,
                jshintrc: ".jshintrc"
            },
            src: [
                "source/modules/*/*.js",
                "source/modules/*/*/*.js",
                "!source/modules/*/tests/**/*.*"
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
