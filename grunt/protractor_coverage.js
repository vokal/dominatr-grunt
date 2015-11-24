"use strict";

module.exports = {
    options: {
        keepAlive: false,
        noColor: false,
        coverageDir: "coverage/protractor",
        args: {
            baseUrl: "http://localhost:9000"
        }
    },
    local: {
        options: {
            keepAlive: true,
            configFile: "tests/config/protractor-config.js"
        }
    },
    stack: {
        options: {
            configFile: "tests/config/protractor-config-browserstack.js"
        }
    }
};
