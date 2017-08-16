

/**
 * Default dev server configuration.
 */
const webpack = require('webpack');
const WebpackBaseConfig = require('./Base');

class WebpackDevConfig extends WebpackBaseConfig {

  constructor() {
    super();
    this.config = {
      devtool: 'cheap-module-source-map',
      entry: [
        'webpack-dev-server/client?http://0.0.0.0:8080/',
        'webpack/hot/only-dev-server',
        'react-hot-loader/patch',
        './client.js',
      ],
      plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.ProvidePlugin({
          React: 'react',
        }),
        new webpack.ProvidePlugin({
          $: 'jquery',
          jQuery: 'jquery',
          'window.jQuery': 'jquery',
        }),
      ],
    };

    this.config.module.rules.push(
      {
        test: /^.((?!cssmodule).)*\.(sass|scss)$/,
        loaders: [
                    { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          { loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      }
        );
  }
}

module.exports = WebpackDevConfig;
