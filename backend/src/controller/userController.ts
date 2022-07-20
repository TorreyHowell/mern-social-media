import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import { CreateUserInput } from '../validation/userSchema'
import UserModel from '../Models/userModel'

export const CreateUser = async (
  req: Request<{}, {}, CreateUserInput['body']>,
  res: Response
) => {
  try {
    const user = await UserModel.create(req.body)

    if (user) {
      return res.status(201).json(user)
    }
    res.status(400)
    throw new Error('Invalid user data')
  } catch (error) {
    res.status(400)
    throw new Error('Invalid user data')
  }
}
