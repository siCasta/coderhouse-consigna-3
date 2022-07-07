import express from 'express'
import routes from './routes/index.js'

const app = express()

// settings
app.set('port', process.env.PORT || 8080)

// middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// routes
routes(app)

export default app