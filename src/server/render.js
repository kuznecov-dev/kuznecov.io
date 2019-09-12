import fs from 'fs'
import path from 'path'
import devServer from '../../build/dev-server'
import { createBundleRenderer } from 'vue-server-renderer'
import config from '../../config'

const resolve = file => path.resolve(__dirname, file)
const isProd = process.env.NODE_ENV === 'production'

const createRenderer = (bundle, options) => {
    return createBundleRenderer(bundle, Object.assign(options, {
        basedir: resolve('../../dist'),
        runInNewContext: false
    }))
}

let renderer,
    readyBundle,
    templatePath = resolve(config.path.template)

const render = (req, res) => {
    const s = Date.now()

    res.setHeader("Content-Type", "text/html")

    const handleError = err => {
        if (err.url) {
            res.redirect(err.url)
        } else if(err.code === 404) {
            res.status(404).send('404 | Page Not Found')
        } else {
            res.status(500).send('500 | Internal Server Error')
            console.error(`error during render : ${req.url}`)
            console.error(err.stack)
        }
    }

    const context = {
        title: 'Kuznecov.io',
        url: req.url
    }

    renderer.renderToString(context, (err, html) => {
        if (err) {
            return handleError(err)
        }
        res.send(html)
        if (!isProd) {
            console.log(`whole request: ${Date.now() - s}ms`)
        }
    })
}

const renderPage = (app, callback) => {

    if(isProd) {
        const template = fs.readFileSync(templatePath, 'utf-8'),
            bundle = JSON.parse(fs.readFileSync('./dist/vue-ssr-server-bundle.json', 'utf-8')),
            clientManifest = JSON.parse(fs.readFileSync('./dist/vue-ssr-client-manifest.json', 'utf-8'))

        renderer = createRenderer(bundle, {
            template,
            clientManifest
        })

    } else {
        readyBundle = devServer(
            app,
            templatePath,
            (bundle, options) => {
                renderer = createRenderer(bundle, options)
            }
        )
    }

    callback(render, readyBundle)
}

export {
    renderPage
}