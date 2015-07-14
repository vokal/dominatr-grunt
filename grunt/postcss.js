module.exports = {
    options: {
        processors: [
            require( 'autoprefixer-core' )( { browsers: 'last 2 versions' } ),
        ]
    },
    build: {
        src: 'build/project.css'
    }
};