const path = require('path');

module.exports = {
  stories: [
    '../atoms/**/*.stories.@(js|jsx|ts|tsx)'
  ],

  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/preset-create-react-app'
  ],

  framework: '@storybook/react',

  core: {
    builder: '@storybook/builder-webpack5'
  },

  staticDirs: [
      '../public'
  ],

  webpackFinal: (config) => {
    config.module.rules.push({
      test: /\.(ts|tsx)?$/,
      exclude: /node_modules/,
      include: path.resolve(__dirname, "../"),
      use: [
        {
          loader: require.resolve('babel-loader'),
          options: {
            presets: [
              require('@babel/preset-typescript').default,
              [require('@babel/preset-react').default, { runtime: 'automatic' }],
              require('@babel/preset-env').default,
            ],
          },
        },
      ],
    })

    config.resolve.extensions.push('.ts', '.tsx')

    config.module.rules.push({
      test: /\.mjs$/,
      include: /node_modules/,
      type: 'javascript/auto',
    })

    config.resolve.extensions.push('.mjs')

    return config
  }
};
