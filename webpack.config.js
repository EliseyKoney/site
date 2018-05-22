const path = require('path')
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const IsomorphicLoaderPlugin = require('isomorphic-loader/lib/webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')


const cssloader = {
    loader: 'css-loader',
    options: {
        //  modules: true,
        //  importLoaders: 1,
        //  localIdentName: '[name]__[local]'
    }
}
let browserConfigInit = {

    base: {
        devtool: 'inline-source-map',
        mode: 'development',
        devServer: {
            contentBase: path.resolve(__dirname, 'dist'),
            hot: true
        },
    },
    rules: [
        {
            test: /\.(css|scss)$/,
            use: [

                'style-loader',
                cssloader,
                'sass-loader'
            ]
        },
    ],
    plugin: [
        new webpack.DefinePlugin({
            __isBrowser__: 'true'
        }),
        new webpack.HotModuleReplacementPlugin(),
    ]
}

let serverConfigInit = {
    base: {
        devtool: 'inline-source-map',
        mode: 'development',
    },
    rules: [
        {
            test: /\.(css|scss)$/,
            use: [
                'isomorphic-style-loader',
                cssloader,
                'sass-loader'
            ]
        },
    ],
    plugin: [
        new webpack.DefinePlugin({
            __isBrowser__: 'true'
        }),
    ]
}


if (process.env.NODE_ENV === 'production') {
    browserConfigInit = {
        ...browserConfigInit,
        base: {
            devtool: 'source-map',
            mode: 'production',
        },
        rules: [
            {
                test: /\.(css|scss)$/,
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    cssloader,
                    'sass-loader?sourceMap',
                ]
            },
        ],
        plugin: [
            new UglifyJSPlugin({ sourceMap: true }),
            new webpack.DefinePlugin({
                __isBrowser__: 'true',
                'process.env.NODE_ENV': JSON.stringify('production')
            }),
            new MiniCssExtractPlugin()
        ]
    }

    serverConfigInit = {
        ...serverConfigInit,
        base: {
            devtool: 'source-map',
            mode: 'production',
        },
        plugin: [
            new UglifyJSPlugin({ sourceMap: true }),
            new webpack.DefinePlugin({
                __isBrowser__: 'true',
                'process.env.NODE_ENV': JSON.stringify('production')
            }),
            new MiniCssExtractPlugin()
        ]
    }
}

const resolve = {
    extensions: [ '.js', '.css', '.scss' ]
}

const browserConfig = {
    ...browserConfigInit.base,
    entry: './src/browser/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    resolve,
    module: {
        rules: [
            ...browserConfigInit.rules,
            { test: /\.(js)$/, use: 'babel-loader' },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: 'url-loader?limit=10000'
            },
            {
                test: /\.(ttf|eot|woff|woff2)$/,
                use: 'url-loader'
            }

        ]
    },
    plugins: [
        new CleanWebpackPlugin([ 'dist' ]),
        ...browserConfigInit.plugin,
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
    ]
}

const serverConfig = {
    ...serverConfigInit.base,
    entry: './src/server/index.js',
    target: 'node',
    node: {
        __filename: true,
        __dirname: true
    },
    // externals: [ nodeExternals() ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'server.js',
        publicPath: '/'
    },
    resolve,
    module: {
        rules: [
            ...serverConfigInit.rules,
            { test: /\.(js)$/, use: 'babel-loader' },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: 'url-loader?limit=10000'
            },
            {
                test: /\.(ttf|eot|woff|woff2)$/,
                use: 'url-loader'
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            __isBrowser__: 'false'
        }),
        new IsomorphicLoaderPlugin(),
        ...browserConfigInit.plugin,
    ]
}

module.exports = [ browserConfig, serverConfig ]

/*
{
                test: /\.(png|svg|jpg|gif)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[hash].[ext]',
                    },
                },
            },

    [
        './src/browser/index.js',
        // 'webpack/hot/dev-server',
        // 'webpack-dev-server/client?http://localhost:3000/',
        // 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
        // 'webpack-hot-middleware/client',
    ]

 */