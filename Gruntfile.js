module.exports = function ( grunt )
{
    "use strict";

    grunt.initConfig( {
        dominatr: {
            options: {
                alias: "sample"
            }
        }
    } );


    grunt.loadTasks( "source" );

    grunt.loadNpmTasks( "grunt-babel" );
    grunt.loadNpmTasks( "grunt-contrib-clean" );
};