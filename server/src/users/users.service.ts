import { ConflictException, Injectable } from '@nestjs/common';
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
    const emailExist = await this.userModel.findOne({ email });
    const usernameExist = await this.userModel.findOne({ username });

    if (emailExist && usernameExist) {
      return { message: 'email and username both exist', status: 400 };
    } else if (emailExist) {
      return { message: 'email already exist', status: 400 };
    } else if (usernameExist) {
      return { message: 'username already exist', status: 400 };
    }

    const user = new this.userModel();
    user.fullname = fullname;
    user.username = username;
    user.email = email;
    const hash = await bcrypt.hash(password, 10);
    user.password = hash;

    await user.save();

    return { message: 'success', status: 201 };
  }
}
