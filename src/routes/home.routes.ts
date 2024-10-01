import { Router } from 'express'
import HomeController from "../controllers/home.controller";


class HomeRoutes {
  router = Router()

  constructor(private readonly controller: HomeController) {
    this.intializeRoutes()
  }

  intializeRoutes() {
    this.router.get('/', this.controller.welcome)
  }
}
const homeRoutes = new HomeController()
export default new HomeRoutes(homeRoutes).router
