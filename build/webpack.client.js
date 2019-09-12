import webpack from 'webpack'
import merge from 'webpack-merge'
import base from './webpack.base'
import ManifestPlugin from 'webpack-manifest-plugin'
import VueSSRClientPlugin from 'vue-server-renderer/client-plugin'
import ExtractCssChunks from "extract-css-chunks-webpack-plugin";
import OptimizeCSSAssetsPlugin  from 'terser-webpack-plugin'

const isProd = process.env.NODE_ENV === 'production'
const plugins = [
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
        'process.env.VUE_ENV': '"client"'
    }),
    new VueSSRClientPlugin(),
    new ManifestPlugin()
]

const minimizer = []

if(isProd) {
    plugins.push(...[
        new ExtractCssChunks({
            filename: '[name].[hash].css',
        })
    ])

    minimizer.push(...[
        new OptimizeCSSAssetsPlugin({}),
    ])
}

const config = merge(base, {
    entry: {
        app: './src/client/entry-client.js'
    },
    resolve: {
        alias: {

        }
    },
    optimization: {
        minimizer,
        runtimeChunk: {
            name: 'manifest'
        },
        splitChunks: {
            minSize: 100000,
            maxSize: 1500000,
            cacheGroups: {
                vendor: {
                    test: /node_modules/,
                    chunks: 'all',
                    enforce: true
                }
            }
        }
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: isProd
                    ? [
                        {
                            loader:ExtractCssChunks.loader
                        },
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
    plugins: plugins
})

export default config