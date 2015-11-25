module.exports = {
    css: {
        expand: true,
        cwd: "source/images/svg-sprite/",
        src: [ "**/*.svg" ],
        dest: "build/svg-sprite/",

        options: {
            shape: {
                id: {
                    separator: "-"
                },
                dimension: {
                    maxWidth: 32,
                    maxHeight: 32
                }
            },
            mode: {
                css: {
                    sprite: "sprite.svg",
                    render: {
                        less: true
                    }
                }
            }
        }
    },
    use: {
        expand: true,
        cwd: "source/images/svg-sprite/",
        src: [ "**/*.svg" ],
        dest: "build/svg-sprite/",

        options: {
            mode: {
                symbol: {
                    inline: true,
                    sprite: "sprite.svg"
                }
            }
        }
    }
};
