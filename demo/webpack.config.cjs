const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const dotenv = require("dotenv");
const env = dotenv.config().parsed

module.exports = {
    mode: 'development',

    // Entry point
    entry: './src/index.tsx',

    target: "browserslist",

    // Output configuration
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },

    // Resolve extensions
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
    },

    // Module and rules (loaders)
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                ],
            },

            {
                test: /\.tsx?$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'swc-loader',
                    options: {
                        jsc: {
                            target: 'es2016',
                            transform: {
                                react: {
                                    runtime: 'automatic'
                                }
                            },
                            parser: {
                                syntax: 'typescript',
                                tsx: true,
                                dynamicImport: true,
                                useBuiltIns: true
                            }
                        }
                    }
                }
            }
        ]
    },

    plugins: [
        new webpack.DefinePlugin({
            'BLOCKFROST_PROJECT_ID': JSON.stringify(env.BLOCKFROST_PROJECT_ID),
        }),
        new webpack.ProvidePlugin({
            Buffer: ["buffer", "Buffer"]
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            inject: 'body'
        })
    ]
};
