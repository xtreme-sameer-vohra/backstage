const path = require('path');

module.exports = {
  stories: [
    '../../core/src/layout/**/*.stories.tsx',
    '../../core/src/components/**/*.stories.tsx',
  ],
  addons: [
    '@storybook/addon-actions',
    '@storybook/addon-links',
    '@storybook/addon-storysource',
    'storybook-dark-mode/register',
  ],
  webpackFinal: async config => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@backstage/theme': path.resolve(__dirname, '../../theme'),
    };
    config.resolve.modules.push(path.resolve(__dirname, '../../core/src'));
    config.module.rules.push(
      {
        test: /\.(ts|tsx)$/,
        use: [
          {
            loader: require.resolve('ts-loader'),
            options: {
              transpileOnly: true,
            },
          },
        ],
      },
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-react'],
          plugins: ['@babel/plugin-proposal-class-properties'],
        },
      },
    );
    config.resolve.extensions.push('.ts', '.tsx');

    // Disable ProgressPlugin which logs verbose webpack build progress. Warnings and Errors are still logged.
    config.plugins = config.plugins.filter(({ constructor }) => constructor.name !== "ProgressPlugin")

    return config;
  },
};
