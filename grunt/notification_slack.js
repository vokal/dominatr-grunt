"use strict";

var Slack = require( "slack-node" );

module.exports = function ( grunt )
{
    var envConfig = grunt.config( "env" );
    var slackApiToken = grunt.config( "slackApiToken" );
    var deployVersion = grunt.config( "version" );
    var pkgVersion = grunt.file.readJSON( "package.json" ).version || "";

    grunt.registerTask( "notification_slack", "Notify a Slack channel that a deployment is going out", function ()
    {
        var done = this.async();

        var slackChannel = envConfig[ "notification.slackChannel" ];
        var host = envConfig.host;

        if( !slackChannel || !slackApiToken || !host )
        {
            grunt.log.ok( "Slack Notification exiting without sending" );
            done();
            return;
        }

        var slacker = new Slack( slackApiToken );

        slacker.api( "chat.postMessage", {
            text: "Build " + pkgVersion + " @" + deployVersion + " for " + host
                + " should be available in about 10 minutes.",
            channel: slackChannel,
            username: "Release Bot"
        },
        function ( err, res )
        {
            if( err )
            {
                grunt.fail.warn( err, err.stack );
            }
            else
            {
                grunt.log.ok( "Slack Notification sent" );
                grunt.log.write( JSON.stringify( res ) );
            }
            done();
        } );
    } );
};
