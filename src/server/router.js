import { ApolloServer } from 'apollo-server-express'
import { schema, resolvers } from '../graphql/schema'
import { endpoint } from '../graphql/constants'
import { renderPage } from './render'
import favicon from 'serve-favicon'
import microcache from 'route-cache'

const isProd = process.env.NODE_ENV === 'production'

const apollo = new ApolloServer({
    debug: !isProd,
    schema,
    resolvers,
    playground: endpoint,
    formatError: (err) => err,
    formatResponse: (res) => res
})

export function router(app, serve) {
    app.use(favicon('./public/logo-48.png'))
    app.use('/dist', serve('../../dist', true))
    app.use('/public', serve('../../public', true))
    app.use('/manifest.json', serve('../../manifest.json', true))
    app.use(microcache.cacheSeconds(1, req => req.originalUrl))
    apollo.applyMiddleware({ app, path: endpoint })

    let render,
        readyBundle


    renderPage(app, (renderer, ready) => {
        render = renderer

        if(!isProd) {
            readyBundle = ready
        }
    })

    app.post('/feedback', (req, res) => {
        res.send({
            success: true,
            message: 'Тест фиктивной формы прошел успешно!'
        })
    })

    app.get('*', isProd ? render : (req, res) => {
        readyBundle.then(() => {
            render(req, res)
        })
    })
}