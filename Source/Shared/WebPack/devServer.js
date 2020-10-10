module.exports = {
    historyApiFallback: true,
    host: '0.0.0.0',
    port: 8080,
    proxy: {
        '/api': 'http://localhost:3000',
        '/graphql': 'http://localhost:3000',
    }
};