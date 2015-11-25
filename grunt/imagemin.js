"use strict";

module.exports = {
    package: {
        options: {
            optimizationLevel: 2 // for pngs
        },
        expand: true,
        cwd: "build/images/",
        src: [ "**/*.{png,jpg,gif}" ],
        dest: "build/images/"
    }
};
