const path = require('path');

module.exports = {
  entry: './src/app.js',
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'public/js'),
  },
  mode: 'production',
  devtool: 'source-map',
  // mode: 'development',
  // devtool: 'inline-source-map',
};
