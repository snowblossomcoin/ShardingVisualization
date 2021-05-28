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
            {
                test: /sample\.json/,
                type: 'asset/resource'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({ template: './src/index.html' })
    ],
    devServer: {
        contentBase: './dist',
        host: "0.0.0.0",
        port: 9000,
    }
};
