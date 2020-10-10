module.exports = (basePath) => {
    return {
        historyApiFallback: true,
        host: '0.0.0.0',
        port: 8080,
        publicPath: basePath,
        contentBase: process.cwd(),
        proxy: {
            '/api': 'http://localhost:3000',
            '/graphql': 'http://localhost:3000',
        }
    };
};