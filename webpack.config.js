var path = require('path');
var webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

function resolve(dir) {
    return path.join(__dirname, dir)
}

// Directory for deployed assets. It should be within our static files path.
// Backslash at the end is not required.
let distDir = '/dist';
let pluginsList = [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
        filename: "[name].css"
    })
];
if (process.env.NODE_ENV === 'production') {
    pluginsList.push(
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new MinifyPlugin()
    )
}
let entryFile = {
    main: './src/main.js',
    extra: './src/extra-chunks',

};

module.exports = {
    entry: entryFile,
    output: {
        path: path.resolve(__dirname, '.' + distDir + '/'),
        filename: '[name]-bundle.min.js'
    },
    plugins: pluginsList,
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        loader: 'vue-loader'
                    }
                    // other vue-loader options go here
                }
            },
            {
                test: /\.(s*)[a|c]ss$/,
                use: [
                    "vue-style-loader",
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader"
                ]
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {name: '[name].[ext]?[hash]'}
                    }
                ]
            },
            {
                test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=application/font-woff'
            },
            {
                test: /\.tff(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url-loader?limit=10000&mimetype=application/octet-stream'
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file-loader'
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': resolve('src')
        }
    }
};