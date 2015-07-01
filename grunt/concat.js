module.exports = function ( grunt )
{
    "use strict";

    return {
        scripts:
        {
            src: [
                "source/modules/*/*.js",
                "source/modules/*/*/*.js",
                "!source/modules/*/tests/**/*.*",
            ],
            filter: function ( filepath )
            {
                if( /mocks/.test( filepath ) )
                {
                    return grunt.option( "mocks" );
                }
                return true;
            },
            dest: "build/project.js"
        },
        angular:
        {
            src: [
                "source/components/angular/angular.min.js",
                "source/components/angular-route/angular-route.min.js",
                "source/components/angular-touch/angular-touch.min.js",
                "source/components/angular-sanitize/angular-sanitize.min.js",
                "source/components/angular-messages/angular-messages.min.js",
                "source/components/angular-animate/angular-animate.min.js",
                "source/components/angular-mocks/angular-mocks.js"
            ],
            dest: "build/angular.js"
        },
        components:
        {
            src: [
                "source/components/humps/humps.js",
                "source/components/vokal-ng-api/dist/vokal-ng-api.min.js",
                "source/components/route-auth/dist/route-auth.min.js",
                "source/components/angular-local-storage/dist/angular-local-storage.min.js",
                "source/components/html5shiv/dist/html5shiv.min.js"
            ],
            dest: "build/components.js"
        }
    };

};
