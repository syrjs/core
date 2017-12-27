const webpack = require('webpack');
const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  // for now we set one entry for the main package.json entry
  entry: {
    syr: ['./index.js'],
    app: ['./samples/example.js']
  },

  output: {
    path: path.resolve('./dist'),
    filename: '[name].min.js',
    library: 'syr',
    libraryTarget: 'var',
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
          presets: ['env'],
          plugins: [['./libs/jsx.js', { useVariables: true }]],
        },
      },
    ],
  },

  plugins: [new UglifyJSPlugin()],
};
