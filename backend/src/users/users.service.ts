import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async create(username: string, email: string, password: string) {
    const userByEmail = await this.repo.findOneBy({ email });
    const userByUsername = await this.repo.findOneBy({ username });

    if (userByEmail || userByUsername) {
      throw new BadRequestException('Email or username is already registered');
    }

    const user = this.repo.create({ username, email, password });
    return this.repo.save(user);
  }

  async findOne(userId: string) {
    const user = await this.repo.findOneBy({ userId });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async find() {
    const users = await this.repo.find();
    return users;
  }

  async findByEmail(email: string) {
    const users = await this.repo.find({ where: { email } });
    return users;
  }

  async update(userId: string, attrs: Partial<User>) {
    const user = await this.findOne(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    Object.assign(user, attrs);
    return this.repo.save(user);
  }

  async remove(userId: string) {
    const user = await this.findOne(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return this.repo.softRemove(user);
  }
}
