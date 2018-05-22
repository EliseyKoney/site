import React from 'react'
import express from 'express'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import { matchRoutes, renderRoutes } from 'react-router-config'
import Template from './template'
import createServerStore from './stores/serverStore'
import routes from './routesConf'

function serverRenderer({ clientStats, serverStats }) {
    return (req, res, next) => {

        const { store, history } = createServerStore(req.url)

        const branch = matchRoutes(routes, req.url)

        // console.log(branch)

        const promises = branch.map(({ route }) => {
            let fetchData = route.component.fetchData
            return fetchData instanceof Function ? fetchData(store) : Promise.resolve(null)
        })

        return Promise.all(promises)
            .then((data) => {
                let context = {}
                let markup = ''
                let errReact = false

                try {

                    markup = renderToString(
                        <Provider store={store}>
                            <StaticRouter location={req.url} context={context}>
                                {renderRoutes(routes)}
                            </StaticRouter>
                        </Provider>
                    )

                } catch (e) {
                    const RedBox = require('redbox-react').default
                    context.status = 500
                    markup = renderToString(
                        <Provider store={store}>
                            <StaticRouter location={req.url} context={context}>
                                <RedBox error={e} />
                            </StaticRouter>
                        </Provider>
                    )
                    errReact = true
                }

                const helmet = Helmet.renderStatic()
                res.status(200)

                if (errReact) {
                    return res.status(500).send(Template({ markup: markup, helmet: helmet, }))
                }

                // for not found page
                if (context.status === 404) {
                    res.status(404)
                }

                // for redirection
                if (context.status === 302) {
                    return res.redirect(302, context.url)
                }

                res.send(Template({ markup: markup, helmet: helmet, }))

                // res.render('index', { title: 'Express', data: store.getState(), content });
            })
    }
}

const app = express()
const publicDir = process.env.www || __dirname
console.log(publicDir)
app.use(express.static(publicDir))
app.use('*', serverRenderer({}))

app.listen(3030, () => {
    console.log('Example app listening on port 3030!')
})
