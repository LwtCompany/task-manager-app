import { Response, NextFunction } from 'express'


export const roleMiddleware = (roles: string[]) => {
  return (req: any, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user?.role)) {
      return res.status(403).send('Access Denied')
    }
    next()
  }
}
