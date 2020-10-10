const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (basePath) => {
    return [
        new CleanWebpackPlugin({
            dangerouslyAllowCleanPatternsOutsideProject: true,
            dry: false,
            cleanStaleWebpackAssets: false,
            cleanOnceBeforeBuildPatterns: ['**/*.*']
        }),

        new HtmlWebpackPlugin({
            template: path.resolve(process.cwd(), 'index.ejs'),
            templateParameters: {
                

            },
            publicPath: basePath,
            metadata: {
                title: 'Dolittle Studio',
                baseUrl: basePath
            }
        }),
        new MiniCssExtractPlugin({
            filename: './styles.css',
        }),
    ];
};