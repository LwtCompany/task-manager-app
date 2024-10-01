import { Router } from 'express'
import UserController from '../controllers/user.controller'
import {authMiddleware} from "../middleware/auth.middleware";
import {roleMiddleware} from "../middleware/role.middleware";
import {UserRoles} from "../enums/user.enum";


class UserRoutes {
  router = Router()
  constructor(private readonly controller: UserController) {
    this.intializeRoutes()
  }

  intializeRoutes() {
    this.router.get('/list', authMiddleware, roleMiddleware([UserRoles.ADMIN]), this.controller.list)
    this.router.get('/:id?', authMiddleware, roleMiddleware([UserRoles.ADMIN]), this.controller.getOne)
    this.router.delete('/:id?', authMiddleware, roleMiddleware([UserRoles.ADMIN]),  this.controller.delete)

    this.router.post('/login', this.controller.login)
    this.router.post('/register', this.controller.register)
  }
}
const userController = new UserController()
export default new UserRoutes(userController).router
