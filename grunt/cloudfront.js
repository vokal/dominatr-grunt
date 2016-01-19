"use strict";

module.exports = function ( grunt )
{
    return {
        options: {
            accessKeyId:     grunt.option( "aws-access-key-id" ),
            secretAccessKey: grunt.option( "aws-secret-access-key" ),
            distributionId:  grunt.config( "env" )[ "aws.distributionId" ],
            invalidations:   [ "/*" ]
        },
        build: {
            options: {
                originPath: "/build-" + grunt.config( "version" )
            }
        }
    };
};
