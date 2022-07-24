import { Request, Response, NextFunction } from 'express'
import { validatePassword, findUser } from '../controller/userController'
import { signJwt, verifyJwt } from '../config/jwtUtils'
import SessionModel from '../Models/sessionModel'
import dayjs from 'dayjs'
import { get, omit } from 'lodash'
import UserModel from '../Models/userModel'

export const createSession = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = await validatePassword(req.body)

  if (!user) {
    res.status(401)
    return next(new Error('invalid credentials'))
  }

  // create session
  const session = await SessionModel.create({
    user: user._id,
    userAgent: req.get('user-agent') || '',
  })

  // create access token
  const accessToken = signJwt({ ...user, session: session._id }, 'access', {
    expiresIn: '15m',
  })

  // create refresh token
  const refreshToken = signJwt({ ...user, session: session._id }, 'refresh', {
    expiresIn: '30d',
  })

  res.cookie('refreshToken', refreshToken, {
    secure: process.env.NODE_ENV !== 'development',
    httpOnly: true,
    expires: dayjs().add(30, 'days').toDate(),
  })

  const userData = {
    ...omit(user, ['password', 'createdAt', 'updatedAt']),
    accessToken,
  }

  res.status(200).json(userData)
}

export const getSessions = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = res.locals.user._id

  const sessions = await SessionModel.find({ user: userId, valid: true }).lean()

  res.status(200).json(sessions)
}

export const reIssueAccessToken = async ({
  refreshToken,
}: {
  refreshToken: string
}) => {
  const { decoded } = verifyJwt(refreshToken, 'refresh')

  if (!decoded || !get(decoded, 'session')) {
    return false
  }

  const session = await SessionModel.findById(get(decoded, 'session'))

  if (!session || !session.valid) return false

  const user = await findUser({ _id: session.user })

  if (!user) return false

  // create an access token
  const accessToken = signJwt({ ...user, session: session._id }, 'access', {
    expiresIn: '15m',
  })

  return accessToken
}

export const getUserData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const refreshToken = get(req, 'cookies.refreshToken')

  if (!refreshToken) {
    res.status(403)
    return next(new Error('No cookies'))
  }
  const { decoded } = verifyJwt(refreshToken, 'refresh')

  try {
    const session = await SessionModel.findById(get(decoded, 'session'))

    if (!session || !session.valid) return next(new Error('No session'))

    const user = await UserModel.findById(session.user)

    if (!user) return next(new Error('No user'))

    const accessToken = signJwt({ ...user, session: session._id }, 'access', {
      expiresIn: '15m',
    })

    const userData = {
      ...omit(user.toJSON(), ['password', 'createdAt', 'updatedAt']),
      accessToken,
    }

    res.status(200).json(userData)
  } catch (error: any) {
    return next(error)
  }
}
