const output = require('./output');
const optimization = require('./optimization');
const resolve = require('./resolve');
const rules = require('./rules');
const plugins = require('./plugins');
const devServer = require('./devServer');

module.exports = (env, argv) => {
    const production = argv.mode === 'production';

    return {
        entry: './index.tsx',
        target: 'web',
        output: output(env, argv),
        optimization: optimization,
        resolve: resolve,
        module: {
            rules: rules
        },
        plugins: plugins,
        devtool: production ? '' : 'inline-source-map',
        devServer: devServer
    };
};