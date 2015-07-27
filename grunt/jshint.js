module.exports = {
    // See http://jshint.com/docs/options/ for all options
    // Options set to `false` are the jshintrc defaults
    all:
    {
        options: {
            force: false, // jshint must pass or fail build
            jshintrc: ".jshintrc",
        },
        src:
        [
            "source/modules/*/*.js",
            "source/modules/*/*/*.js",
            "!source/modules/*/tests/**/*.*",
            "grunt/*.js",
            "tests/*.js"
        ]
    }
};