import { Request, Response, NextFunction } from 'express'
import log from '../config/logger'

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode: number = res.statusCode ? res.statusCode : 500

  log.error(err.message)

  res.status(statusCode)

  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  })
}
