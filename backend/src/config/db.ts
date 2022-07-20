import mongoose from 'mongoose'
import colors from 'colors'
import log from './logger'

const connectDB = async () => {
  try {
    let uri = process.env.MONGO_URI as string
    const conn = await mongoose.connect(uri)
    log.info(
      colors.cyan.underline(`MongoDB Connected: ${conn.connection.host}`)
    )
  } catch (error: any) {
    log.error(`Error: ${error.message}`)
    process.exit(1)
  }
}

export default connectDB
