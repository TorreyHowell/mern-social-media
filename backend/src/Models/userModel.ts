import mongoose, { Schema } from 'mongoose'
import bcrypt from 'bcryptjs'

export interface UserDocument extends mongoose.Document {
  userName: string
  firstName: string
  lastName: string
  email: string
  password: string
  dob: Date
  createdAt: Date
  updatedAt: Date
}

const userSchema = new Schema<UserDocument>(
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
    password: {
      type: String,
      required: true,
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

userSchema.pre('save', async function (next) {
  const user = this as UserDocument

  if (!user.isModified('password')) {
    return next()
  }

  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(user.password, salt)

  user.password = hash

  return next()
})

userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  const user = this as UserDocument

  return bcrypt.compare(candidatePassword, user.password).catch((e) => false)
}

const UserModel = mongoose.model<UserDocument>('User', userSchema)

export default UserModel
