import { Knex } from 'knex';
import { UserEntity } from '../schemas/models/userEntitySchema';
import { KnexRepository } from './Repository';

export class UserRepository extends KnexRepository<UserEntity> {
    protected tableName: string = 'users';

    static #instance: UserRepository;

    private constructor(knex: Knex) {
        if (UserRepository.#instance) {
            throw new Error('UserRepository is singleton!');
        }
        super(knex);
    }

    public static getInstance(knex: Knex): UserRepository {
        if (!this.#instance) {
            this.#instance = new UserRepository(knex);
        }
        return this.#instance;
    }
}

