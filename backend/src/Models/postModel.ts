import mongoose, { Schema } from 'mongoose'
import { UserDocument } from './userModel'

export interface PostDocument extends mongoose.Document {
  user: UserDocument['_id']
  title: string
  body: string
  media: string
  cloudinary: string
  likeCount: number
  likes: [string]
  commentCount: number
  comments: [string]
  createdAt: Date
  updatedAt: Date
}

const postSchema = new Schema<PostDocument>(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    title: { type: String },
    body: { type: String },
    media: { type: String },
    cloudinary: { type: String },
    likeCount: { type: Number, default: 0 },
    likes: { type: [String], default: [] },
    commentCount: { type: Number, default: 0 },
    comments: { type: [String], default: [] },
  },
  { timestamps: true }
)

const PostModel = mongoose.model<PostDocument>('Post', postSchema)

export default PostModel
