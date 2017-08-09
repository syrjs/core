var webpack = require('webpack');
var path = require('path');

var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // for now we set one entry for the main package.json entry
  entry: {
    app: ['./samples/example.js'],
  },

  output: {
    path: path.resolve('./build'),
    filename: 'assets/[name].min.js',
  },

  // resolve files
  // we reference a bunch of files in the build tool
  // command dir is the project path
  resolve: {
    extensions: ['.js', '.css'],
    modules: ['./node_modules'],
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
      {
        test: /.js?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['babel-preset-es2015'],
          plugins: [['babel-plugin-transform-jsx', { useVariables: true }]],
        },
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      inject: false,
      appMountId: 'app',
      title: 'Test Fixture',
      mobile: true,
      template: require('html-webpack-template'),
      links: [],
    }),
  ],
};
