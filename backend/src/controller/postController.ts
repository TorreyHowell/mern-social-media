import { Request, Response, NextFunction } from 'express'
import PostModel from '../Models/postModel'
import UserModel from '../Models/userModel'
import cloudinary from '../config/cloudinary'
import { omit, get } from 'lodash'

export const createPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = get(res.locals.user, '_id')
  console.log(res.locals)

  try {
    const user = await UserModel.findById(userId)

    if (!user) {
      res.status(403)
      throw new Error('User not found')
    }

    let cloudinaryResult

    if (req.file) {
      cloudinaryResult = await cloudinary.v2.uploader.upload(
        req.file?.path as string
      )
    }

    const post = await PostModel.create({
      ...req.body,
      user: user._id,
      media: cloudinaryResult && cloudinaryResult.secure_url,
      cloudinary: cloudinaryResult && cloudinaryResult.public_id,
    })

    if (!post) {
      res.status(401)
      throw new Error('could not create post')
    }

    res.status(201).json(JSON.stringify(post))
  } catch (error: any) {
    return next(error)
  }
}

export const getPosts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const posts = await PostModel.find()
      .populate('user', '-password -__v')
      .sort({
        createdAt: -1,
      })
    res.status(200).json(posts)
  } catch (error) {
    return next(error)
  }
}

export const getUserPosts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = res.locals.user._id

  try {
    const user = await UserModel.findById(userId)

    if (!user) {
      res.status(403)
      return next(new Error('User not found'))
    }

    const posts = await PostModel.find({
      user: user._id,
    })
      .populate('user', '-password -__v')
      .sort({
        createdAt: -1,
      })

    res.status(200).json(posts)
  } catch (error) {
    return next(error)
  }
}
