const HtmlWebpackPlugin = require('html-webpack-plugin'); 
const path = require('path');

const env = process.env.NODE_ENV || 'development';

module.exports = {
  mode: env,
  entry: './src/index.js',
  output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'main.js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ]
  },
  plugins: [
      new HtmlWebpackPlugin({ template: './src/index.html' })
  ]
};
