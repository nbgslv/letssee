const path = require('path');

module.exports = {
  entry: './src/main.src',
  output: {
    filename: 'bundle.src',
    path: path.resolve(__dirname, './dist'),
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
        },
      },
    }],
  },
  devtool: 'source-map',
  watch: true,
};
