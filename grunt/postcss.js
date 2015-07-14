module.exports = {
    options: {
        processors: [
            require( 'autoprefixer-core' )( { browsers: 'last 2 versions' } ),
        ]
    },
    dist: {
        src: 'build/project.css'
    }
};