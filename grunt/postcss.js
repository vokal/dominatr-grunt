module.exports = {
    options: {
        processors: [
            require( "autoprefixer" )( { browsers: "IE >= 9, > 1%" } )
        ]
    },
    build: {
        src: "build/project.css"
    }
};
