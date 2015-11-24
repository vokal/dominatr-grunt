"use strict";

module.exports = function ( grunt )
{
    return {
        package: {
            options: {
                mangle: [ "staging", "prod" ].indexOf( grunt.config( "envName" ) ) >= 0,
                compress: true,
                sourceMap: false
            },
            files: {
                "build/dist.js": "build/dist.js"
            }
        }
    };
};
