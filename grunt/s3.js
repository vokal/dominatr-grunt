module.exports = {
    options: {
        accessKeyId: "<%= aws.accessKeyId %>",
        secretAccessKey: "<%= aws.secretAccessKey %>",
        bucket: "<%= aws.s3Bucket %>"
    },
    build: {
        cwd: "build/",
        src: "**",
        dest: "build-<%= version %>/build/"
    }
};