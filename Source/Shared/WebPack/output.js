const path = require('path');

module.exports = (env, argv) => {
    const production = argv.mode === 'production';
    
    return {
        filename:
            production === true
                ? '[name].[chunkhash].bundle.js'
                : '[name].[hash].bundle.js',
        sourceMapFilename:
            production === true
                ? '[name].[chunkhash].bundle.map'
                : '[name].[hash].bundle.map',
        chunkFilename:
            production === true
                ? '[name].[chunkhash].chunk.js'
                : '[name].[hash].chunk.js',
        path: path.resolve(process.cwd(), 'wwwroot'),
        publicPath: '/'
    }
};