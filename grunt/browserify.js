"use strict";

module.exports = function ( grunt )
{
    var files = [ "source/modules/index.js" ];
    var replacements = [];

    ( function pushReplacements( obj, prestring )
    {
        prestring = prestring ? prestring + "." : "";
        Object.keys( obj ).forEach( function ( key )
        {
            if( obj[ key ] === Object( obj[ key ] ) )
            {
                pushReplacements( obj[ key ], key );
            }
            else
            {
                replacements.push( {
                    from: "<< " + prestring + key + " >>",
                    to: obj[ key ]
                } );
            }
        } );

    } )( grunt.config( "env" ) );

    var transforms = [
        [ "babelify", { presets: [ "es2015" ] } ],
        [ "browserify-replace", {
            replace: replacements
        } ]
    ];

    if( grunt.option( "mocks" ) )
    {
        files.push( "source/modules/mocks/" + grunt.option( "mocks" ) + ".js" );
    }
    else if( grunt.config( "envName" ) === "local" )
    {
        files.push( "source/modules/mocks/index.js" );
    }

    return {
        options: {
            transform: transforms,
            browserifyOptions: {
                debug: grunt.config( "envName" ) !== "prod",
                noParse: [
                    "/node_modules/**/*.js"
                ]
            }
        },
        build: {
            src: files,
            dest: "build/dist.js"
        },
        test: {
            options: {
                transform: [
                    [ "browserify-istanbul", {
                        // TODO: clean up these ignores
                        ignore: [
                            "**/node_modules/**",
                            "**/test/**",
                            "**/tests/**",
                            "**/templates.js",
                            "**/*mock-*.js",
                            "**/source/modules/mocks/**" ]
                    } ]
                ].concat( transforms )
            },
            src: files,
            dest: ".instrumented/dist.js"
        }
    };
};
