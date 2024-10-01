import { Router } from 'express'
import TaskController from "../controllers/task.controller";
import {authMiddleware} from "../middleware/auth.middleware";
import {roleMiddleware} from "../middleware/role.middleware";
import {UserRoles} from "../enums/user.enum";


class TaskRoutes {
  router = Router()
  constructor(private readonly taskController: TaskController) {
    this.intializeRoutes()
  }

  intializeRoutes() {
    this.router.post('/', authMiddleware, this.taskController.createTask)
    this.router.delete('/:id?', authMiddleware, this.taskController.deleteTask)
    this.router.post('/complete:id?', authMiddleware, this.taskController.completeTask)
    this.router.get('/list', authMiddleware, this.taskController.getAllTasks)
    this.router.get('/statistics', authMiddleware, roleMiddleware([UserRoles.ADMIN]), this.taskController.getTaskAnalytics)
    this.router.get('/:id?', authMiddleware, this.taskController.getTaskById)
    this.router.put('/:id?', authMiddleware, this.taskController.updateTask)

  }
}
const taskController = new TaskController()
export default new TaskRoutes(taskController).router
