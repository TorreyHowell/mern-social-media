import { Express } from 'express-serve-static-core'
import userRoutes from './userRoutes'
import sessionRoutes from './sessionRoutes'

const routes = (app: Express) => {
  app.use('/api/users', userRoutes)

  app.use('/api/sessions', sessionRoutes)
}

export default routes
