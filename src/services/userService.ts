import { Context } from 'vm';
import { data } from '../../data/users';
import { createFailResponse, createSuccessResponse } from '../utils/createResponse';
import { UserRepository } from '../repository/UserRepository';
import { db } from '../config/knex';
import { CustomHttpError } from '../common/HttpError';
import { User } from '../schemas/models/userEntitySchema';

const repository = new UserRepository(db);

const getUserById = async (id: number): Promise<User> => {
    const user = await repository.findById(id, ['id', 'username']);
    if (!user) {
        throw new CustomHttpError(404, `User with ID: ${id} Not Found!`)
    }
    return user;
};

export const userService = {
    getUserById,
}

