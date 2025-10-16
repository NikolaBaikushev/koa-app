import { UserEntity } from '../schemas/models/userEntitySchema';
import { KnexRepository } from './Repository';

export class UserRepository extends KnexRepository<UserEntity> {
    protected tableName: string = 'users';
}