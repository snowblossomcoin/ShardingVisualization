const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BeautifyHtmlWebpackPlugin = require('beautify-html-webpack-plugin');
const path = require('path');


module.exports = {
    mode: process.env.NODE_ENV,
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "shard-visual.js",
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /sample1\.json/,
                type: 'asset/resource'
            },
            {
                test: /sample2\.json/,
                type: 'asset/resource'
            },
        ]
    },
    plugins: [
        new webpack.DefinePlugin({ENVIRONMENT: JSON.stringify(process.env.NODE_ENV || "production")}),
        new HtmlWebpackPlugin({
            template: "./src/shard-visual.html",
            filename: "shard-visual.html",
        }),
        new BeautifyHtmlWebpackPlugin(),
    ],
    devServer: {
        contentBase: "./dist",
        host: "0.0.0.0",
        port: 9000,
    }
};
