"use strict";

var AWS = require( "aws-sdk" );

module.exports = function ( grunt )
{
    var envConfig = grunt.config( "env" );
    var pkgVersion = grunt.config( "pkg" ).version || "";
    var deployVersion = grunt.config( "version" );
    grunt.registerTask( "notification", "Notify an email that a deployment is going out", function ()
    {
        var done = this.async();

        var emailTo = envConfig[ "notification.emailTo" ];
        var emailFrom = envConfig[ "notification.emailFrom" ];
        var host = envConfig.host;
        if( !emailTo || !emailFrom || !host )
        {
            done();
            return;
        }

        var ses = new AWS.SES(
            new AWS.Config( {
                accessKeyId: grunt.option( "aws-access-key-id" ),
                secretAccessKey: grunt.option( "aws-secret-access-key" ),
                region: envConfig[ "aws.region" ] || "us-east-1"
            } )
        );

        var options = {
            Destination: {
                ToAddresses: emailTo
            },
            Message: {
                Body: {
                    Html: {
                        Data: "<h1>Version " + pkgVersion + " @" + deployVersion + "</h1>"
                        + '<p>A new build for <a href="' + host + '">' + host + "</a> "
                        + "should be available in about 10 minutes.</p>"
                    }
                },
                Subject: {
                    Data: "New build for " + host + " @" + deployVersion
                }
            },
            Source: emailFrom
        };

        ses.sendEmail( options, function ( err, data )
        {
            if( err )
            {
                grunt.fail.warn( err, err.stack );
            }
            else
            {
                grunt.log.ok( "Email Sent" );
                grunt.log.write( JSON.stringify( data ) );
            }
            done();
        } );

    } );
};
