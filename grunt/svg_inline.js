"use strict";

var inline = require( "web-resource-inliner" );
var a = require( "async" );

module.exports = function ( grunt )
{
    grunt.registerTask( "svg_inline", "Inline SVG use", function ()
    {
        var done = this.async();
        var src = [ "modules/*/templates/*.html" ];

        var tasks =
            grunt.file.expandMapping( src, ".inlined", { cwd: "source" } )
            .map( function ( file )
            {
                return function ( done )
                {
                    var fileContent = grunt.file.read( file.src );

                    inline.html( {
                        fileContent: fileContent,
                        images: false,
                        scripts: false,
                        links: false,
                        relativeTo: "build/"
                    }, function ( err, res )
                    {
                        if( err )
                        {
                            return done( err );
                        }
                        grunt.file.write( file.dest, res );
                        done();
                    } );
                };
            } );

        a.series( tasks, function ( err )
        {
            if( err )
            {
                grunt.fail.warn( err, err.stack );
            }
            done();
        } );
    } );
};
