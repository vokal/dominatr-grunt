module.exports = {
    options:
    {
    },
    project:
    {
        options: {
            mangle: {},
            compress: {},
            sourceMap: true,
            banner: "/*! <%= pkg.name %> <%= grunt.template.today( 'yyyy-mm-dd' ) %> */"
        },
        files:
        {
            "build/project.js": "build/project.js"
        }
    },
    components:
    {
        options:
        {
            mangle: false,
            compress: {},
            sourceMap: false
        },
        files:
        {
            "build/components.js": "build/components.js"
        }
    }
};
