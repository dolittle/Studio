const webpack = require('@shared/webpack');
module.exports = (env, argv) => {
    return webpack(env, argv, '/events', config => {
        config.devServer.port = 9002;
    });
};