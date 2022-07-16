import mongoose from 'mongoose'

interface IUser {
  userName: string
  firstName: string
  lastName: string
  email: string
  password: string
  dob: Date
}

const userSchema = new mongoose.Schema<IUser>({
  userName: {
    type: String,
    required: [true, 'Please add a user name'],
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
})

export default mongoose.model('User', userSchema)
