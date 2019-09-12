import webpack from 'webpack'
import merge from 'webpack-merge'
import base from './webpack.base'
import nodeExternals from 'webpack-node-externals'
import VueSSRServerPlugin from 'vue-server-renderer/server-plugin'

const isProd = process.env.NODE_ENV === 'production'

const config = merge(base, {
    target: 'node',
    devtool: '#source-map',
    entry: './src/client/entry-server.js',
    output: {
        filename: 'server-bundle.js',
        libraryTarget: 'commonjs2'
    },
    externals: nodeExternals({
        whitelist: /\.css$/
    }),
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: isProd
                    ? [
                        'null-loader',
                        'css-loader',
                        'sass-loader'
                    ]
                    : [
                        'vue-style-loader',
                        'css-loader',
                        'sass-loader'
                    ]
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
            'process.env.VUE_ENV': '"server"'
        }),
        new VueSSRServerPlugin()
    ]
})

export default config