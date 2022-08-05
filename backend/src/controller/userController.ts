import { Request, Response, NextFunction } from 'express'
import { CreateUserInput } from '../validation/userSchema'
import UserModel, { UserDocument } from '../Models/userModel'
import { omit } from 'lodash'
import { FilterQuery } from 'mongoose'
import SessionModel from '../Models/sessionModel'
import { signJwt } from '../config/jwtUtils'
import dayjs from 'dayjs'

export const CreateUser = async (
  req: Request<{}, {}, CreateUserInput['body']>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userName, email } = req.body

    const userNameExists = await UserModel.findOne({ userName })
    const emailExists = await UserModel.findOne({ email })

    if (userNameExists && emailExists) {
      return next(new Error('Username and email already taken'))
    } else if (emailExists) {
      return next(new Error('Email already in use'))
    } else if (userNameExists) {
      return next(new Error('Username already taken'))
    }

    const user = await UserModel.create(req.body)

    if (user) {
      // create session
      const session = await SessionModel.create({
        user: user._id,
        userAgent: req.get('user-agent') || '',
      })

      const leanUser = await UserModel.findById(user._id)
        .select('-password')
        .lean()

      // create access token
      const accessToken = signJwt(
        { ...leanUser, session: session._id },
        'access',
        {
          expiresIn: '15m',
        }
      )

      // create refresh token
      const refreshToken = signJwt(
        { ...leanUser, session: session._id },
        'refresh',
        {
          expiresIn: '30d',
        }
      )

      res.cookie('refreshToken', refreshToken, {
        secure: process.env.NODE_ENV !== 'development',
        httpOnly: true,
        expires: dayjs().add(30, 'days').toDate(),
      })

      const userData = {
        ...leanUser,
        accessToken,
      }

      console.log(userData)

      return res.status(201).json(userData)
    }
    res.status(400)
    return next(new Error('Invalid user data'))
  } catch (error: any) {
    res.status(400)
    return next(error)
  }
}

export const validatePassword = async ({
  email,
  password,
}: {
  email: string
  password: string
}) => {
  const user = await UserModel.findOne({ email })

  if (!user) return false

  const isValid = await user.comparePassword(password)

  if (!isValid) return false

  return omit(user.toJSON(), 'password')
}

export const findUser = async (query: FilterQuery<UserDocument>) => {
  return UserModel.findOne(query).select('-password').lean()
}
