import { Request, Response } from 'express'

export const getMe = (req: Request, res: Response) => {
  return res.status(200).json({
    message: 'Hello',
  })
}
