
import {IUser, User} from '../models/user.model';

class UserRepository {

  async createUser({ username, password }: { username: string; password: string; }): Promise<IUser> {
    const user = new User({ username, password });
    return await user.save();
  }

  async findUserByUsername(username: string): Promise<IUser | null> {
    return User.findOne({username});
  }

  async getAllUsers(): Promise<IUser[]> {
    return User.find();
  }

  async deleteUser(userId: string): Promise<IUser | null> {
    return User.findByIdAndDelete(userId);
  }

  async getOneById(id: string): Promise<IUser | null> {
    return User.findOne(
        {
          _id: id,
        }
    );
  }
}

export default new UserRepository();
