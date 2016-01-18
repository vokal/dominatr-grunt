"use strict";

module.exports = function ( grunt )
{
    var version = grunt.config( "version" );

    return {
        options: {
            accessKeyId: grunt.option( "aws-access-key-id" ),
            secretAccessKey: grunt.option( "aws-secret-access-key" ),
            bucket: grunt.config( "env" )[ "aws.s3Bucket" ]
        },
        build: {
            options : {
                headers: {
                    CacheControl: 31536000
                }
            },
            cwd: "build/",
            src: [ "**", "!**.html" ],
            dest: "build-" + version + "/"
        },
        index: {
            cwd: "build/",
            src: "**.html",
            dest: "build-" + version + "/"
        },
        robots: {
            cwd: "build/",
            src: "robots.txt",
            dest: "build-" + version + "/"
        }
    };
};
