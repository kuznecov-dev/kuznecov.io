import fs from 'fs'
import path from 'path'
import http from 'http'
import https from 'https'
import express from 'express'
import compression from 'compression'
import bodyParser from 'body-parser'
import { router } from './router'
import config from '../../config'

const resolve = file => path.resolve(__dirname, file),
    isProd = process.env.NODE_ENV === 'production'

const runServer = () => {
    const app = express()

    const serve = (path, cache) => {
        return express.static(resolve(path), {
            maxAge: cache && isProd ? 1000 * 60 * 60 * 24 * 30 : 0
        })
    }

    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(compression({ threshold: 0 }))

    router(app, serve)

    const httpServer = http.createServer(app)
    httpServer.listen(config.port.http, () => {
        console.log('\x1b[33m%s\x1b[0m', `HTTP server started`)
    })

    if(isProd) {
        const privateKey = fs.readFileSync(config.ssl.private, 'utf8')
        const certificate = fs.readFileSync(config.ssl.certificate, 'utf8')
        const ca = fs.readFileSync(config.ssl.ca, 'utf8')

        const credentials = {
            key: privateKey,
            cert: certificate,
            ca: ca
        }

        const httpsServer = https.createServer(credentials, app)
        httpsServer.listen(config.port.https, () => {
            console.log('\x1b[33m%s\x1b[0m', `HTTPS server started`)
        })
    }
}

export {
    runServer
}