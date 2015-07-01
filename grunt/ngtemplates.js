module.exports = {
    options: {
        module: "App",
        htmlmin: {
            collapseBooleanAttributes: true,
            collapseWhitespace: false,
            removeAttributeQuotes: false,
            removeComments: true,
            removeEmptyAttributes: false,
            removeRedundantAttributes: false,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true
        }
    },
    build: {
        src: [
            "modules/*/templates/*.html",
            "!modules/_app/templates/index.html"
        ],
        filter: function ( filepath )
        {
            if( /mocks/.test( filepath ) )
            {
                return grunt.option( "mocks" );
            }
            return true;
        },
        dest: "build/templates.js",
        cwd: "source"
    }
};
