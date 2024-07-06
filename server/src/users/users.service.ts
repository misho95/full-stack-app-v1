import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/models/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findUser(username: string): Promise<User | undefined> {
    return this.userModel.findOne({
      $or: [{ username: username }, { email: username }],
    });
  }

  async createUser(
    username: string,
    email: string,
    password: string,
    fullname: string,
  ) {
    const user = new this.userModel();
    user.fullname = fullname;
    user.username = username;
    user.email = email;
    const hash = await bcrypt.hash(password, 10);
    user.password = hash;

    await user.save();
  }
}
