import webpack from 'webpack'

import clientConfig from './webpack.client'
import serverConfig from './webpack.server'

const isProd = process.env.NODE_ENV === 'production'

const build = () => {
    const clientCompiler = webpack(clientConfig)

    clientCompiler.run((error, stats) => {
        if (error || stats.hasErrors()) {
            console.log('\x1b[41m%s\x1b[0m', 'Error client compiler')
            return false
        }
        console.log('\x1b[33m%s\x1b[0m', 'Client-build Done')
    })

    const serverCompiler = webpack(serverConfig)

    serverCompiler.run((error, stats) => {
        if (error || stats.hasErrors()) {
            console.log('\x1b[41m%s\x1b[0m', 'Error server compiler')
            return false
        }
        console.log('\x1b[33m%s\x1b[0m', 'Server-build Done')
    })
}

if(isProd) {
    build()
}