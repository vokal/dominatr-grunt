"use strict";

module.exports = function( grunt )
{
    var defaults = {
        dominatrBuild: [ "build/**" ],
        dominatrCoverage: [ "coverage/**" ]
    };

    grunt.registerTask( "dominatr-clean", function ()
    {
        var opts = this.options( defaults );

        grunt.config.set( "clean", opts );
        grunt.task.run( "clean:dominatrBuild", "clean:dominatrCoverage" );
    } );
};
