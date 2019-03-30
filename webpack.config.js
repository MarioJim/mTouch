const path = require('path');

module.exports = {
  entry: './src/app.js',
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'public/js')
  },
  mode: "development",
  devtool: "inline-source-map",
};