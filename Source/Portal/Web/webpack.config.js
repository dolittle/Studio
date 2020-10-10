const webpack = require('@shared/webpack');
module.exports = (env, argv) => {
    return webpack(env, argv, config => {
        config.devServer.port = 9001;
    });
};