const webpack = require('@shared/webpack/backend');

module.exports = (env, argv) => {
    return webpack(env, argv, config => { });
};
