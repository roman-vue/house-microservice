import { EntityRepository, Repository } from 'typeorm';
import { User } from '../../entities/users';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {}
