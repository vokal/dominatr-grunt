module.exports = function ( grunt )
{
    "use strict";

    grunt.registerTask( "envUseSource", "Run from original source files", function ()
    {
        grunt.config( "useSource", true );
    } );
};
