import path from 'path'
import TerserJSPlugin   from 'optimize-css-assets-webpack-plugin'
import { VueLoaderPlugin } from 'vue-loader'

const isProd = process.env.NODE_ENV === 'production'
const minimizer = [

]

if(isProd) {
    minimizer.push(...[
        new TerserJSPlugin({})
    ])
}

const config = {
    mode: isProd ? 'production' : 'development',
    devtool: isProd
        ? false
        : 'inline-cheap-module-source-map',
    output: {
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/dist/',
        filename: '[name].[hash].js'
    },
    resolve: {
        alias: {
            Styles: path.resolve(__dirname, '../src/client/layout/assets/styles/'),
            Components: path.resolve(__dirname, '../src/client/components/'),
            Public: path.resolve(__dirname, '../public/'),
        }
    },
    optimization: {
        minimizer
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    compilerOptions: {
                        preserveWhitespace: false
                    }
                }
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: '[name].[ext]?[hash]'
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            }
        ]
    },
    performance: {
        maxEntrypointSize: 300000,
        hints: isProd ? 'warning' : false
    },
    plugins: [
        new VueLoaderPlugin()
    ]

}

export default config