import { LoginUserPayload, RegisterUserPayload } from '../schemas/authSchemas';
import { createToken, JwtTokenPayload } from '../utils/createToken';
import { CustomHttpError } from '../common/HttpError';
import { UserRepository } from '../repository/UserRepository';
import { db } from '../config/knex';
import { User, UserEntity } from '../schemas/models/userEntitySchema';

const repository = new UserRepository(db);

const loginUser = async (payload: LoginUserPayload): Promise<string> => {
    const user = await repository.findOneBy({ username: payload.username, password: payload.password });

    if (!user) {
        throw new CustomHttpError(401, 'Invalid username or password');
    }

    const jwtTokenPayload: JwtTokenPayload = {
        id: user.id,
        username: user.username,
        role: user.role
    };

    return createToken(jwtTokenPayload);
};

const registerUser = async (payload: RegisterUserPayload) => {
    const { username, password, confirmPassword, role } = payload;

    if (password !== confirmPassword) {
        throw new CustomHttpError(400, 'Passwords don\'t match!');
    }

    const user = await repository.findOneBy({ username });
    if (user) {
        throw new CustomHttpError(400, 'User already exists!');
    }

    const newUser: Pick<UserEntity, 'username' | 'password' | 'role'> = {
        username,
        password,
        role,
    };

    const result = await repository.create(newUser, ['id', 'username', 'role']);

    return result;
};

const getUser = async (id: number, username: string): Promise<User | null> => {
    return await repository.findOneBy({ username, id }, ['id', 'username', 'role']);
};

export const authService = {
    registerUser,
    loginUser,
    getUser
};