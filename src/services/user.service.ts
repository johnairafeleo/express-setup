import { Repository } from 'typeorm';

import {
  applyFieldSelection,
  applyFilter,
  applyPaging,
  applySorting,
} from '../utils';
import { User } from '../entity';
import { UserRepository } from '../interface';

export class UserService implements UserRepository {
  constructor(private readonly userRepository: Repository<User>) {}

  async findAll(args: any) {
    const query = this.userRepository.createQueryBuilder('user');
    applyFilter(query, 'user', args?.firstName);
    applySorting(query, args?.sortBy, args?.sortOrder);
    applyFieldSelection(query, 'user', args.fields);

    if (args.page || args.pageSize) {
      applyPaging(query, +args?.page, +args?.pageSize);
    }

    const items = await query.getMany();
    return {
      items,
      total: items.length,
      pages: 1,
    };
  }

  async findOne(id: string) {
    const users = await this.userRepository.findOne({
      where: { userUuid: id },
    });
    return users;
  }
  async findByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
    });
    return user;
  }

  async createUser(newuser: User) {
    const user = this.userRepository.create(newuser);
    await this.userRepository.save(user);
    return user;
  }

  async updateUser(id: string, data: Partial<User>) {
    const user = await this.userRepository.findOne({ where: { userUuid: id } });
    if (user) {
      this.userRepository.merge(user, data);
      await this.userRepository.save(user);
      return user as User;
    } else {
      return { message: 'User not found' };
    }
  }

  async delete(id: string) {
    const user = await this.userRepository.findOne({ where: { userUuid: id } });

    if (user) {
      await this.userRepository.remove(user);
      return { message: 'User Deleted successfully' };
    } else {
      return { message: 'User not found' };
    }
  }
}
