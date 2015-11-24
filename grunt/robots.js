"use strict";

module.exports = function ( grunt )
{
    var env = grunt.config( "envName" );
    var host = grunt.config( "env" ).host;

    grunt.registerTask( "robots", "Write a robots.txt", function ()
    {
        if( env !== "prod" || !host  )
        {
            grunt.log.write( "Writing robots.txt for NO indexing" );
            grunt.file.write( "build/robots.txt",
                "User-agent: *\n"
                + "disallow: /\n" );
            return;
        }

        // TODO: can we determine if there is a sitemap file or not?
        grunt.log.write( "Writing robots.txt for indexing" );
        grunt.file.write( "build/robots.txt",
            "User-agent: *\n"
            + "Sitemap: " + host + "/sitemap.txt\n" );
    } );
};
