import { Request } from 'express'
import { IUser } from '../models/user.model'
export default interface RequestWithUserService extends Request {
  user: IUser
}
