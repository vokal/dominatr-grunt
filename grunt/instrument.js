module.exports = {
    files: [ "build/scripts/project/**/*.js", "!build/scripts/project/mocks/*.js", "!build/project.js" ],
    options: {
        lazy: false,
        basePath: "."
    }
};