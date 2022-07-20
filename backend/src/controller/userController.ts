import { Request, Response, NextFunction } from 'express'
import { CreateUserInput } from '../validation/userSchema'
import UserModel from '../Models/userModel'
import asyncHandler from 'express-async-handler'

export const CreateUser = async (
  req: Request<{}, {}, CreateUserInput['body']>,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await UserModel.create(req.body)

    if (user) {
      return res.status(201).json(user)
    }
    res.status(400)
    return next(new Error('Invalid user data'))
  } catch (error: any) {
    return next(error)
  }
}

export const testThrow = () => {
  throw new Error('test error')
}
