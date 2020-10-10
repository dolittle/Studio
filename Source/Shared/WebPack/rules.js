module.exports = [
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
];