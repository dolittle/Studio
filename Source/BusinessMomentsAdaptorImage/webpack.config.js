const webpack = require('@dolittle/vanir-webpack/backend');

module.exports = (env, argv) => {
    return webpack(env, argv, config => { });
};
