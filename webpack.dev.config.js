const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development',
  context: __dirname,
  entry: [
    './index.jsx',
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].bundle.js',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader',
        ],
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new CopyWebpackPlugin([
      { from: './index.html' },
      { from: 'node_modules/pdfjs-dist/cmaps/', to: 'cmaps/' },
    ]),
    new HtmlWebpackPlugin({
      title: 'Development',
    }),
  ],
  optimization: {
    minimize: true,
  },
};
