module.exports = function ( grunt )
{
    "use strict";

    grunt.registerTask( "envDev", "Set environment variables for development", function()
    {
        grunt.config( "aws.s3Bucket", "<s3-bucket-name>" );
        grunt.config( "aws.cloudfrontDistributionId", "<cloudfront-dist-id>" );

        grunt.config( "APIRoot", "/path/to/dev/api/" );
    } );

    grunt.registerTask( "envProd", "Set environment variables for production", function()
    {
        grunt.config( "aws.s3Bucket", "<s3-bucket-name>" );
        grunt.config( "aws.cloudfrontDistributionId", "<cloudfront-dist-id>" );

        grunt.config( "APIRoot", "/path/to/prod/api/" );
    } );
};
