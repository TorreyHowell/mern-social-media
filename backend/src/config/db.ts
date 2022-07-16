import mongoose from 'mongoose'
import colors from 'colors'

export const connectDB = async () => {
  try {
    let uri: string = process.env.MONGO_URI + ''
    const conn = await mongoose.connect(uri)
    console.log(
      colors.cyan.underline(`MongoDB Connected: ${conn.connection.host}`)
    )
  } catch (error) {
    let message: string = 'Unknown Error'
    if (error instanceof Error) message = error.message
    // we'll proceed, but let's report it
    console.log(`Error: ${message}`)
    process.exit(1)
  }
}

export default connectDB
