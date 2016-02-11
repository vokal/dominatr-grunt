"use strict";

var AWS = require( "aws-sdk" );

module.exports = function ( grunt )
{
    var envConfig = grunt.config( "env" );
    var deployVersion = grunt.config( "version" );
    var pkg = grunt.file.readJSON( "package.json" );
    var pkgVersion = pkg.version || "";
    var pkgName = pkg.name || "App";

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
                ToAddresses: typeof emailTo === "string" ? [ emailTo ] : emailTo
            },
            Message: {
                Body: {
                    Html: {
                        Data: "<h1>" + pkgName + " build " + pkgVersion + " @" + deployVersion + "</h1>"
                        + '<p>A new build for <a href="' + host + '">' + host + "</a> "
                        + "should be available in about 10 minutes.</p>"
                    }
                },
                Subject: {
                    Data: pkgName + " build for " + host + " @" + deployVersion
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
