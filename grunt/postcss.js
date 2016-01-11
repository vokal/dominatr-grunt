"use strict";

module.exports = function ( grunt )
{
    var processors = [ require( "autoprefixer" )( { browsers: "IE >= 9, > 1%" } ) ];
    if( grunt.config( "envName" ) === "prod" )
    {
        processors.push( require( "cssnano" )( {} ) );
    }

    return {
        options: {
            processors: processors
        },
        build: {
            src: "build/project.css"
        }
    };
};
