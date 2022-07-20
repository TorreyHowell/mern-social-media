import express, { Application, Request, Response } from 'express'
import 'dotenv/config'
import connectDB from './config/db'
import colors from 'colors'
import log from './config/logger'
import routes from './routes/routes'

const PORT = process.env.PORT || 5000

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.listen(PORT, async () => {
  log.info(colors.blue(`Server running on port: ${process.env.PORT}`))
  await connectDB()
  routes(app)
})
