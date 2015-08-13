module.exports = function ( grunt )
{
    "use strict";

    grunt.registerTask( "envUseSource", "Run from original source files", function ()
    {
        grunt.config( "useSource", true );
    } );

    grunt.registerTask( "envDontUseSource", "Run from concatenated files", function ()
    {
        grunt.config( "useSource", false );
    } );

    grunt.registerTask( "envUseDist", "Concatenate all JS into a distribution file", function ()
    {
        grunt.config( "useDist", false );
    } );
};
