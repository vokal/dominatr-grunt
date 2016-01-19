"use strict";

var rewrite = require( "connect-modrewrite" );
var serveStatic = require( "serve-static" );
var rewriteMiddleware = rewrite( [
    "^[^\\.]*$ /index.html [L]"
] );

module.exports = {
    local: {
        options: {
            hostname: "localhost",
            port: 3000,
            base: "build",
            livereload: true,
            middleware: function ()
            {
                return [
                    rewriteMiddleware,
                    serveStatic( "build" )
                ];
            }
        }
    },
    test: {
        options: {
            hostname: "localhost",
            port: 9000,
            base: ".instrumented",
            middleware: function ()
            {
                return [
                    rewriteMiddleware,
                    serveStatic( ".instrumented" ),
                    serveStatic( "build" )
                ];
            }
        }
    }
};
