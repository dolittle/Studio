const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');



module.exports = (env, argv) => {
    const production = argv.mode === 'production';

    return {
        entry: './index.tsx',
        target: 'web',
        output: {
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
            path: path.resolve(__dirname, 'wwwroot'),
            publicPath: '/'
        },
        optimization: {
            runtimeChunk: true,
            moduleIds: 'hashed',
            splitChunks: {
                chunks: 'initial',
                // sizes are compared against source before minification
                maxSize: 200000, // splits chunks if bigger than 200k, adjust as required (maxSize added in webpack v4.15)
                cacheGroups: {
                    default: false, // Disable the built-in groups default & vendors (vendors is redefined below)
                    // This is the HTTP/1.1 optimised cacheGroup configuration
                    vendors: {
                        // picks up everything from node_modules as long as the sum of node modules is larger than minSize
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendors',
                        priority: 19,
                        enforce: true, // causes maxInitialRequests to be ignored, minSize still respected if specified in cacheGroup
                        minSize: 30000 // use the default minSize
                    },
                    vendorsAsync: {
                        // vendors async chunk, remaining asynchronously used node modules as single chunk file
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendors.async',
                        chunks: 'async',
                        priority: 9,
                        reuseExistingChunk: true,
                        minSize: 10000 // use smaller minSize to avoid too much potential bundle bloat due to module duplication.
                    },
                    commonsAsync: {
                        // commons async chunk, remaining asynchronously used modules as single chunk file
                        name: 'commons.async',
                        minChunks: 2, // Minimum number of chunks that must share a module before splitting
                        chunks: 'async',
                        priority: 0,
                        reuseExistingChunk: true,
                        minSize: 10000 // use smaller minSize to avoid too much potential bundle bloat due to module duplication.
                    }
                }
            }
        },
        resolve: {
            extensions: ['.js', '.json', '.ts', '.tsx'],
            modules: [
                '.',
                'node_modules'
            ]
        },
        module: {
            rules: [
                {
                    test: /\.[tj]s[x]*$/i,
                    exclude: /(node_modules)/,
                    loader: 'ts-loader'
                },
                {
                    test: /\.s[ac]ss$/i,
                    issuer: /\.[tj]s[x]*$/i,
                    use: [
                        // Creates `style` nodes from JS strings
                        'style-loader',
                        // Translates CSS into CommonJS
                        'css-loader',
                        // Compiles Sass to CSS
                        'sass-loader',
                    ],
                },
                {
                    test: /\.(png|gif|jpg|cur)$/i,
                    loader: 'url-loader',
                    options: { limit: 8192 }
                },
            ],
        },
        plugins: [
            new CleanWebpackPlugin({
                dangerouslyAllowCleanPatternsOutsideProject: true,
                dry: false,
                cleanStaleWebpackAssets: false,
                cleanOnceBeforeBuildPatterns: ['**/*.*']
            }),

            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, 'index.html'),
                metadata: {
                    title: 'Pantry',
                    baseUrl: '/'
                }
            }),
            new MiniCssExtractPlugin({
                filename: './styles.css',
            }),
        ],
        devtool: production ? '' : 'inline-source-map',
        devServer: {
            historyApiFallback: true,
            host: '0.0.0.0',
            port: 8080,
            proxy: {
                '/api': 'http://localhost:3000',
                '/graphql': 'http://localhost:3000',
            }
        }
    };
};