"use strict";

module.exports = function( grunt )
{
    var defaults = {
        dominatr: {
            "build/project.js": "build/project.js"
        }
    };

    grunt.registerTask( "dominatr-babel", function ()
    {
        var opts = this.options( defaults );

        grunt.config.set( "babel", opts );
        grunt.task.run( "babel:dominatr" );
    } );
};
