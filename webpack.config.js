const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');


module.exports = {
    mode: process.env.NODE_ENV,
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js',
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
        new webpack.DefinePlugin({ENVIRONMENT: JSON.stringify(process.env.NODE_ENV || "production")}),
        new HtmlWebpackPlugin({ template: './src/index.html' }),
    ],
    devServer: {
        contentBase: './dist',
        host: "0.0.0.0",
        port: 9000,
    }
};
