"use strict";

module.exports = {
    options: {
        plugins: [
             { cleanupIDs: false }
        ]
    },
    package: {
        files: [ {
          expand: true,
          cwd: "build/images/",
          src: [ "**/*.svg" ]
        } ]
    }
};
