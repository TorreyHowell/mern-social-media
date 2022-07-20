import mongoose from 'mongoose'
const { Schema } = mongoose

interface IUser {
  userName: string
  firstName: string
  lastName: string
  email: string
  password: string
  dob: Date
}

const userSchema = new Schema<IUser>(
  {
    userName: {
      type: String,
      required: [true, 'Please add a user name'],
      unique: true,
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    dob: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
)

export default mongoose.model('User', userSchema)
