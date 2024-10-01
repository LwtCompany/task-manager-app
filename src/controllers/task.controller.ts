
import { Request, Response } from 'express';
import TaskRepository from '../repositories/task.repository';

export default class TaskController {
  public async createTask(req: any, res: Response): Promise<void> {
    try {
      const task = await TaskRepository.createTask(req.body, req.user);
      res.status(201).json(task);
    } catch (error) {
      res.status(500).json({ message: 'Error creating task', error });
    }
  }

  public async getAllTasks(req: any, res: Response): Promise<void> {
    try {
      const tasks = await TaskRepository.getAllTasks(req.user);
      res.status(200).json(tasks);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching tasks', error });
    }
  }

  public async getTaskById(req: any, res: Response): Promise<void> {
    const { id } = req.query;
    try {
      const task = await TaskRepository.getTaskById(id);
      if (!task) {
        res.status(404).json({ message: 'Task not found' });
        return;
      }
      res.status(200).json(task);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching task', error });
    }
  }

  public async updateTask(req: any, res: Response): Promise<void> {
    const { id } = req.query;
    try {
        const isCompletedAlready = await TaskRepository.isCompleted(id);
        if(isCompletedAlready){
          res.status(405).json({message: 'Task already completed you cant update it'})
          return ;
        }
      const task = await TaskRepository.updateTask(id, req.body);
      if (!task) {
        res.status(404).json({ message: 'Task not found' });
        return;
      }
      res.status(200).json(task);
    } catch (error) {
      res.status(500).json({ message: 'Error updating task', error });
    }
  }

  public async deleteTask(req: any, res: Response): Promise<void> {
    const { id } = req.query;
    try {
      const task = await TaskRepository.deleteTask(id);
      if (!task) {
        res.status(404).json({ message: 'Task not found' });
        return;
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: 'Error deleting task', error });
    }
  }

  public async completeTask(req: any, res: Response): Promise<void> {
    const {id} = req.query;
    const {completed} = req.body;

    try {
      const isCompletedAlready = await TaskRepository.isCompleted(id);
      if(isCompletedAlready){
        res.status(405).json({message: 'Task already completed'})
        return ;
      }
      const task = await TaskRepository.completeTask(id, completed);
      if (!task) {
        res.status(404).json({message: 'Task not found'});
        return;
      }
      res.status(200).json(task);
    } catch (error) {
      res.status(500).json({message: 'Error updating task completion status', error});
    }
  }

 public async getTaskAnalytics(req: Request, res: Response): Promise<void> {
    try {
      const analytics = await TaskRepository.getTaskAnalytics();
      res.status(200).json(analytics);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching task analytics', error });
    }
  }
}

