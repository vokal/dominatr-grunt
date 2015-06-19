"use strict";

var path = require("path");

module.exports = function( grunt )
{
  var defaults = {
    aliases: {
        sample: [ "dominatr-clean", "dominatr-babel" ],
        default: [ "buildcore", "usemin" ],
        buildcore: [ "concat:scripts", "concat:angular", "concat:components",
            "less", "copy", "svg_sprite", "svgmin", "includeSource", "ngtemplates", "replace" ],
        test: [ "envDev", "clean:build", "buildcore", "instrument", "protractor_coverage:local",
            "buildcore", "makeReport" ],
        teststack: [ "envDev", "clean:build", "buildcore", "instrument", "localstack",
            "protractor_coverage:stack", "buildcore", "makeReport" ],
        deploy: [ "clean", "buildcore", "usemin", "babel", "uglify", "s3", "cloudfront" ],
        deploystaging: [ "envStaging", "deploy" ],
        deployprod: [ "envProd", "deploy" ]
    }
  };

  grunt.loadTasks( path.join( __dirname, "services" ) );

  grunt.registerTask( "dominatr", "grunt build for dominatr", function()
  {
    var opts = this.options( defaults );

    grunt.task.run( opts.aliases[ opts.alias ] );
  } );
};
