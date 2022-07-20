import mongoose from 'mongoose'
import colors from 'colors'
import log from './logger'

const connectDB = async () => {
  try {
    let uri: string = process.env.MONGO_URI + ''
    const conn = await mongoose.connect(uri)
    log.info(
      colors.cyan.underline(`MongoDB Connected: ${conn.connection.host}`)
    )
  } catch (error) {
    let message: string = 'Unknown Error'
    if (error instanceof Error) message = error.message
    log.error(`Error: ${message}`)
    process.exit(1)
  }
}

export default connectDB
