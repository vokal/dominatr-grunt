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
          dest: "build/images/",
          src: [ "**/*.svg" ]
        } ]
    }
};
