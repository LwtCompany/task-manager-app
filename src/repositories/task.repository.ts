// repositories/task.repository.ts
import {ITask, Task} from '../models/task.model';
import mongoose from 'mongoose';
import {IUser} from "../models/user.model";
import {UserRoles} from "../enums/user.enum";

class TaskRepository {
  async createTask(taskData: Omit<ITask, '_id'>, user:any): Promise<ITask> {
    const task = new Task({
      title: taskData.title,
      description: taskData.description,
      user: user?._id,
    });
    return await task.save();
  }

  async getAllTasks(user:IUser): Promise<ITask[]> {
    let filter = {}
    if(user.role !== UserRoles.ADMIN){
      filter = {
        user: user._id,
      }
    }
   return  Task.find(filter).populate('user', '-password -role -createdAt');
  }

  async getTaskById(id: string): Promise<ITask | null> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return null;
    }
    return  Task.findById(id).populate('user','-password -role -createdAt');
  }

  async updateTask(id: string, taskData: Partial<ITask>): Promise<ITask | null> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return null;
    }
    return  Task.findByIdAndUpdate(id, taskData, { new: true }).populate('user','-password -role -createdAt');
  }

  async deleteTask(id: string): Promise<ITask | null> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return null;
    }
    return  Task.findByIdAndDelete(id);
  }

   async completeTask(id: string, completed: boolean): Promise<ITask | null> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return null;
    }
    return  Task.findByIdAndUpdate(
      id,
      { completed, completedAt: completed ? new Date() : null },
      { new: true }
    ).populate('user','-password -role -createdAt');
  }

  async isCompleted(id: string): Promise<ITask | null> {
   return   Task.findOne(
        {
          _id: id,
          completed: true,
        }
    );
  }

  async getTaskAnalytics(): Promise<any[]> {
    return  Task.aggregate([
      {
        $group: {
          _id: '$user',
          taskCount: { $sum: 1 },
          completedTasks: { $sum: { $cond: ['$completed', 1, 0] } },
        },
      },
      {
        $lookup: {
          from: 'users', // assuming 'users' is the name of the users collection
          localField: '_id',
          foreignField: '_id',
          as: 'user',
        },
      },
      {
        $unwind: {
          path: '$user',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          _id: 1,
          taskCount: 1,
          completedTasks: 1,
          user: {
            _id: '$user._id',
            username: '$user.username',
          },
        },
      },
    ]);
  }

}

export default new TaskRepository();
