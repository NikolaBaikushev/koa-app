import { Context } from 'koa';
import { data } from '../../data/users';
import { LoginUserPayload, RegisterUserPayload } from '../schemas/authSchemas';
import { createErrorResponse, createFailResponse, createSuccessResponse } from '../utils/createResponse';
import { getContextStateData } from '../utils/getContextStateData';
import { createToken } from '../utils/createToken';
import { CustomHttpError } from '../common/HttpError';
import { isHttpError } from '../types/guards/isHttpError';
import { UserRepository } from '../repository/UserRepository';
import { db, knexSetup } from '../config/knex';
import { UserEntity } from '../schemas/models/userEntitySchema';

const repository = new UserRepository(db);

export const loginUser = (payload: LoginUserPayload) => {
    const user = data.users.find(u => u.username === payload.username && u.password === payload.password);

    if (!user) {
        throw new CustomHttpError(401, 'Invalid username or password');
    }
    
    return createToken({ id: user.id, username: user.username });
};

export const registerUser = async (payload: RegisterUserPayload) => {
    const { username, password, confirmPassword} = payload;

    if (password !== confirmPassword) {
        throw new CustomHttpError(400, 'Passwords don\'t match!');
    }

    // const user = data.users.find((u => u.username === username));
    const user = await repository.findOneBy({username});
    if (user) {
        throw new CustomHttpError(400, 'User already exists!')
    }

    const newUser: Omit<UserEntity, 'id'> = {
        username,
        password,
    };

    const result = await repository.create(newUser);


    // data.users.push(newUser);
    return result;
}
