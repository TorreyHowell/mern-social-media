import express, { Application, Request, Response } from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db'
import colors from 'colors'

const PORT = process.env.PORT || 5000

dotenv.config()
connectDB()

const app: Application = express()

app.get('/', (req: Request, res: Response) => {
  res.send('Hello')
})

app.listen(PORT, () =>
  console.log(colors.blue(`Server running on port: ${process.env.PORT}`))
)
