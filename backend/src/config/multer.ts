import { Request } from 'express'
import multer from 'multer'
import path from 'path'

export default multer({
  storage: multer.diskStorage({}),
  fileFilter: (req: Request, file, cb) => {
    let ext: string = path.extname(file.originalname)
    if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png') {
      cb(new Error('Unsupported file type!'))
      return
    }
    cb(null, true)
  },
  limits: { fileSize: 100000 },
})
