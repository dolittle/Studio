const webpack = require('@dolittle/vanir-webpack/frontend');
module.exports = (env, argv) => {
    return webpack(env, argv, '/_/data', config => {
        config.devServer.proxy = {
            '/_/data/graphql': 'http://localhost:3000',
            '/api': 'http://localhost:3000'
        };
    }, 9000, 'Studio');
};
