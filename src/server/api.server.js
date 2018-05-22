import express, { Router } from 'express'
import { renderToString } from 'react-dom/server'

const app = express()
const router = Router({})

router.get('/api', function (req, res, next) {
    res.json({ api: { version: '0.1.0' } })
})

app.use('/', router)

export default app