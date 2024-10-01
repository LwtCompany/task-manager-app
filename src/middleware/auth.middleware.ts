import jwt from 'jsonwebtoken'
import { Response, NextFunction } from 'express'
import { User } from '../models/user.model'



export const authMiddleware = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const token = req.header('Authorization')?.replace('Bearer ', '')
  if (!token) return res.status(401).send('Access Denied')

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET!)
    const user = await User.findById((verified as any)._id)
    if (!user) return res.status(401).send('User not found')
    req.user = user
    next()
  } catch (err) {
    res.status(400).send('Invalid token')
  }
}
