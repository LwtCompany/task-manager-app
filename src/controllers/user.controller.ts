import { Request, Response } from 'express'
import { User } from '../models/user.model'
import jwt from 'jsonwebtoken'
import UserRepository from "../repositories/user.repository";

export default class UserController {
 public async register(req: Request, res: Response) {
    try {
      const { username, password } = req.body
      const user = await UserRepository.createUser({username, password});
      res.status(201).send(user)
    } catch (err) {
      console.log(err)
      res.status(500).json({
        message: 'Internal Server Error!',
        error: err
      })
    }
  }

 public async login(req: Request, res: Response) {
    try {
      const { username, password } = req.body
      const user = await User.findOne({ username })
      if (!user || !(await user.comparePassword(password))) {
        return res.status(400).send('Invalid credentials')
      }
      const token = jwt.sign(
        { _id: user._id, role: user.role },
        process.env.JWT_SECRET!,
        { expiresIn: '1h' }
      )
      res.send({ token })
    } catch (err) {
      console.log(err)
      res.status(500).json({
        message: 'Internal Server Error!',
        error: err
      })
    }
  }
 public async list(req: Request, res: Response) {
    try {
        const userList = await UserRepository.getAllUsers();
        return res.status(200).json(userList)
    } catch (err) {
      console.log(err)
      res.status(500).json({
        message: 'Internal Server Error!',
        error: err
      })
    }
  }
 public async getOne(req:any, res: Response) {
     try {
       const {id} = req.query;
        const userList = await UserRepository.getOneById(id);
        return res.status(200).json(userList)
    } catch (err) {
      console.log(err)
      res.status(500).json({
        message: 'Internal Server Error!',
        error: err
      })
    }
  }

  public async delete(req:any, res: Response) {
     try {
       const {id} = req.query;
        const userList = await UserRepository.deleteUser(id);
        return res.status(200).json(userList)
    } catch (err) {
      console.log(err)
      res.status(500).json({
        message: 'Internal Server Error!',
        error: err
      })
    }
  }
}
