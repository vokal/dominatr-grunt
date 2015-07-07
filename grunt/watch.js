module.exports = {
    options:
    {
        atBegin: true,
        event: [ "changed", "added", "deleted" ]
    },
    scripts:
    {
        files: "<%= concat.scripts.src %>",
        tasks: [ "envDev", "concat:scripts", "replace" ]
    },
    styles:
    {
        files: "source/modules/*/styles/*.*",
        tasks: [ "less", "replace" ]
    },
    index:
    {
        files: "source/modules/_app/templates/index.html",
        tasks: [ "envDev", "includeSource", "ejs", "replace" ]
    },
    templates:
    {
        options: { cwd: "<%= ngtemplates.build.cwd %>" },
        files: "<%= ngtemplates.build.src %>",
        tasks: [ "envDev", "ngtemplates", "replace" ]
    },
    fonts:
    {
        files: [
            "source/fonts/**/*.*"
        ],
        tasks: [ "copy:fonts" ]
    },
    images:
    {
        files: [
            "source/images/**/*.*"
        ],
        tasks: [ "copy:images" ]
    },
    favicon:
    {
        files: [
            "source/favicon/**/*.*"
        ],
        tasks: [ "copy:favicon" ]
    }
};
