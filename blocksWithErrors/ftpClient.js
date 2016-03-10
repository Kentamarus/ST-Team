var ftpClient = require('./lib/client.js'),
    config = {
        host: 'localhost',
        port: 21,
        user: 'anonymous',
        password: 'anonymous@'
    },
    options = {
        logging: 'basic'
    },
    client = new ftpClient(config, options);

client.connect(function () {

    client.upload(['test/**'], '/public_html/test', {
        baseDir: 'test',
        overwrite: 'older'
    }, function (result) {
        console.log(result);
    });

    client.download('/public_html/test2', 'test2/', {
        overwrite: 'all'
    }, function (result) {
        console.log(result);
    });

});