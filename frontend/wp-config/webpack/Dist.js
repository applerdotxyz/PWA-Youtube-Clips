

/**
 * Dist configuration. Used to build the
 * final output when running npm run dist.
 */
/* eslint-disable */
const webpack = require('webpack');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const WebpackBaseConfig = require('./Base');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const path = require('path');
/* eslint-enable */
const ROOT = path.resolve(__dirname, '../..');
const ZERO = 0;

const root = () => {
  const args = Array.prototype.slice.call(arguments, ZERO);

  return path.join(...[ROOT].concat(args));
};

class WebpackDistConfig extends WebpackBaseConfig {

  constructor() {
    super();
    this.config = {
      cache: false,
      devtool: 'source-map',
      entry: [
        './client.js',
      ],
      output: {
        path: root('dist'),
        publicPath: '/',
        filename: 'assets/app.js',
        chunkFilename: 'assets/[id].[hash].chunk.js',
      },
      plugins: [
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': '"production"',
        }),
        new StyleLintPlugin({
          configFile: '.stylelintrc',
          context: './src/',
          files: '**/*.css',
          failOnError: false,
        }),
        new webpack.optimize.AggressiveMergingPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.ProvidePlugin({
          $: 'jquery',
          jQuery: 'jquery',
          'window.jQuery': 'jquery',
        }),
        new CopyWebpackPlugin([
                    { from: root('src/favicon.ico'), to: root('dist/') },
                    { from: root('src/vendors'), to: root('dist/vendors') },
                    { from: root('src/assets/images'), to: root('dist/assets/images') },
                    { from: root('src/assets/images-demo'), to: root('dist/assets/images-demo') },
        ]),
      ],
    };

        // Deactivate hot-reloading if we run dist build on the dev server
    this.config.devServer.hot = false;

    this.config.module.rules.push(
      {
        test: /^.((?!cssmodule).)*\.(sass|scss)$/,
        loaders: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' },
                    { loader: 'sass-loader' },
        ],
      }
        );
  }

    /**
     * Get the environment name
     * @return {String} The current environment
     */
  get env() {
    return 'dist';
  }
}

exports = WebpackDistConfig;
