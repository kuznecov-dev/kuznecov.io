import fs from 'fs'
import path from 'path'
import MFS from 'memory-fs'
import webpack from 'webpack'
import chokidar from 'chokidar'

import clientConfig from './webpack.client'
import serverConfig from './webpack.server'

const readFile = (fs, file) => {
    try {
        return fs.readFileSync(path.join(clientConfig.output.path, file), 'utf-8')
    } catch (e) {}
}

export default (app, templatePath, callback) => {
    let bundle
    let template
    let clientManifest

    let ready
    const readyPromise = new Promise(resolve => { ready = resolve })
    const update = () => {
        if (bundle && clientManifest) {
            ready()
            callback(bundle, {
                template,
                clientManifest
            })
        }
    }

    template = fs.readFileSync(templatePath, 'utf-8')
    chokidar.watch(templatePath).on('change', () => {
        template = fs.readFileSync(templatePath, 'utf-8')
        console.log('index.html template updated.')
        update()
    })

    clientConfig.entry.app = ['webpack-hot-middleware/client', clientConfig.entry.app]
    clientConfig.output.filename = '[name].js'
    clientConfig.plugins.push(
        new webpack.HotModuleReplacementPlugin()
    )

    const clientCompiler = webpack(clientConfig)
    const devMiddleware = require('webpack-dev-middleware')(clientCompiler, {
        publicPath: clientConfig.output.publicPath,
        noInfo: true
    })

    app.use(devMiddleware)

    clientCompiler.hooks.done.tap('client', (params) => {

        clientManifest = JSON.parse(readFile(
            devMiddleware.fileSystem,
            'vue-ssr-client-manifest.json'
        ))

        update()
    })

    app.use(require('webpack-hot-middleware')(clientCompiler, { heartbeat: 5000 }))

    const serverCompiler = webpack(serverConfig)
    const mfs = new MFS()
    serverCompiler.outputFileSystem = mfs
    serverCompiler.watch({}, (error, stats) => {
        if (error || stats.hasErrors()) {
            console.log('Error server compiler', error)
            return false
        }

        bundle = JSON.parse(readFile(mfs, 'vue-ssr-server-bundle.json'))

        update()
    })

    return readyPromise
}