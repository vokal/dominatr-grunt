"use strict";

module.exports = {
    build: {
        options: {
            useSource: "<%= useSource %>"
        },
        src: "build/index.html",
        dest: "build/index.html",
        overwrite: true
    }
};
