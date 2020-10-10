const output = require('./output');
const optimization = require('./optimization');
const resolve = require('./resolve');
const rules = require('./rules');
const plugins = require('./plugins');
const devServer = require('./devServer');

module.exports = (env, argv, basePath, callback) => {
    const production = argv.mode === 'production';
    basePath = basePath || '/';

    const config = {
        entry: './index.tsx',
        target: 'web',
        output: output(env, argv, basePath),
        optimization: optimization,
        resolve: resolve,
        module: {
            rules: rules
        },
        plugins: plugins(basePath),
        devtool: production ? '' : 'inline-source-map',
        devServer: devServer(basePath)
    };

    if( callback ) {
        callback(config);
    }

    return config;
};