const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = [
    new CleanWebpackPlugin({
        dangerouslyAllowCleanPatternsOutsideProject: true,
        dry: false,
        cleanStaleWebpackAssets: false,
        cleanOnceBeforeBuildPatterns: ['**/*.*']
    }),

    new HtmlWebpackPlugin({
        template: path.resolve(process.cwd(), 'index.html'),
        metadata: {
            title: 'Dolittle Studio',
            baseUrl: '/'
        }
    }),
    new MiniCssExtractPlugin({
        filename: './styles.css',
    }),
];