import express from 'express'
import cors from 'cors'
import path from 'path'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { Helmet } from 'react-helmet'
import { StaticRouter, matchPath } from 'react-router-dom'
import serialize from 'serialize-javascript'
import { renderRoutes } from 'react-router-config'
import { Provider } from 'react-redux'

import createServerStore from '../shared/app/stores/serverStore'
import routes from '../shared/routes'

const mode = process.env[ '--mode' ] === 'production' ? 'production' : 'development'
const isProdMode = mode === 'production'

const app = express()
app.use(cors())
app.use(express.static(path.resolve(__dirname, '../../dist/')))


app.get('*', (req, res, next) => {
    const activeRoute = routes.find((route) => matchPath(req.url, route)) || {}

    const promise = activeRoute.fetchInitialData
        ? activeRoute.fetchInitialData(req.path)
        : Promise.resolve()

    promise.then((data) => {
        const context = { data }
        let markup = ''
        let errReact = false

        const { store, history } = createServerStore(req.url)


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
        if (process.env.NODE_ENV === 'production') helmet.link = `<link href="/main.css" rel="stylesheet"/>`

        res.status(200)

        if (errReact) {
            return res.status(500).send(template({ serialize, data, markup, helmet }))
        }

        // for not found page
        if (context.status === 404) {
            res.status(404)
        }

        // for redirection
        if (context.status === 302) {
            return res.redirect(302, context.url)
        }

        res.send(template({ serialize, data, markup, helmet }))


    }).catch(next)
})

app.listen(3000, () => {
    console.log(`Server is listening on port: 3000`)
})

const template = ({ serialize, data, markup, helmet }) => (
    `
 <!DOCTYPE html>
      <html ${helmet.htmlAttributes.toString()}>
            <head>
                ${helmet.title.toString()}
                ${helmet.meta.toString()}
                <title>SSR with RR</title>
                ${helmet.link.toString()}
                <script>window.__INITIAL_DATA__ = ${serialize(data)}</script>
                <style>
                #root {position:absolute;width: 100%;height: 100%;visibility: hidden} 
                </style>
            </head>

        <body ${helmet.bodyAttributes.toString()}>
          <div id="root">${markup}</div>
          <script src="/bundle.js" defer></script>
        </body>
      </html>
`
)


/*
  1) Just get shared App rendering to string on server then taking over on client.
  2) Pass data to <App /> on server. Show diff. Add data to window then pick it up on the client too.
  3) Instead of static data move to dynamic data (github gists)
  4) add in routing.

  .masonry-grid { position: relative;}
  .masonry-grid .grid-item { position: absolute; transition: top 400ms cubic-bezier(0.455, 0.03, 0.515, 0.955), left 400ms cubic-bezier(0.455, 0.03, 0.515, 0.955); }

        const markup = renderToString(
            <StaticRouter location={req.url} context={context}>
                <App />
            </StaticRouter>
        )
        const helmet = Helmet.renderStatic()
        res.send(template({ serialize, data, markup, helmet }))
*/
