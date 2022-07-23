import { Response, Request, NextFunction } from 'express'
import { get } from 'lodash'
import { verifyJwt } from '../config/jwtUtils'
import { reIssueAccessToken } from '../controller/sessionController'

const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = get(req, 'headers.authorization', '').replace(
    /^Bearer\s/,
    ''
  )

  const refreshToken = get(req, 'cookies.refreshToken')

  if (!accessToken) {
    return next()
  }

  const { decoded, expired } = verifyJwt(accessToken, 'access')

  if (decoded) {
    res.locals.user = decoded
    return next()
  }

  if (expired && refreshToken) {
    const newAccessToken = await reIssueAccessToken({ refreshToken })

    if (newAccessToken) {
      res.setHeader('x-access-token', newAccessToken)
    }

    const result = verifyJwt(newAccessToken as string, 'access')

    res.locals.user = result.decoded
    return next()
  }
  return next()
}

export default deserializeUser
