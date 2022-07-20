import { Express } from 'express-serve-static-core'
import userRoutes from './userRoutes'

const routes = (app: Express) => {
  app.use('/api/users', userRoutes)
}

export default routes
