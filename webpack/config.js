// Common Modules...
const Path = require('path');

// Own Modules...

// Local Fields...

// Beginning of Logic!
module.exports = {
  name: 'html-extract-js',
  context: Path.join(__dirname, '../src'),
  entry: ['./index.js'],
  output: {
    path: Path.join(__dirname, '../lib'),
    filename: 'html-extract.js',
    libraryTarget: 'commonjs2',
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015'],
        },
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      }
    ],
    resolve: {
      extensions: ['', '.js'],
    },
  },
};
