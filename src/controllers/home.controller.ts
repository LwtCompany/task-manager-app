import { Request, Response } from 'express'

export default class HomeController{
  public async welcome(req: Request, res: Response): Promise<Response> {
     return res.json({ message: 'Welcome to task manager program' })
  }
}
