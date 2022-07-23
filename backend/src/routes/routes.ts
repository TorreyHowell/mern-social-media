import { Express } from 'express-serve-static-core'
import userRoutes from './userRoutes'
import sessionRoutes from './sessionRoutes'
import postRoutes from './postRoutes'

const routes = (app: Express) => {
  app.use('/api/users', userRoutes)
  app.use('/api/sessions', sessionRoutes)
  app.use('/api/posts', postRoutes)
}

export default routes
