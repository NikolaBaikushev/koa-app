import { RepositoryManager } from '../repository/RepositoryManager';
import { authService } from './authService';
import { UserEntity, UserRole } from '../schemas/models/userEntitySchema';
import * as createTokenUtil from '../utils/createToken';
import { CustomHttpError } from '../common/HttpError';
import { LoginUserPayload, RegisterUserPayload } from '../schemas/authSchemas';

/* eslint-disable @typescript-eslint/no-explicit-any */

describe('authService', () => {
    const repository = RepositoryManager.UsersRepository;

    afterEach(() => {
        jest.restoreAllMocks();
        jest.clearAllMocks();
    });

    describe('authService.loginUser', () => {
        afterEach(() => jest.clearAllMocks());
        const user = {
            id: 1,
            username: 'testuser',
            password: 'password123',
            role: 'user',
        } as UserEntity;

        it('should return a JWT token when user is found', async () => {
            jest.spyOn(repository, 'findOneBy').mockResolvedValue(user);
            jest.spyOn(createTokenUtil, 'createToken').mockReturnValue('some_token_name');

            const payload: LoginUserPayload = {
                username: user.username,
                password: user.password
            };

            const result = await authService.loginUser(payload);

            expect(result).toEqual('some_token_name');

            expect(repository.findOneBy).toHaveBeenCalledWith(payload);
            expect(createTokenUtil.createToken).toHaveBeenCalled();
        });

        it('should throw CustomHttpError 401 when user not found', async () => {
            jest.spyOn(repository, 'findOneBy').mockResolvedValue(null);

            try {
                await authService.loginUser({} as UserEntity);
            } catch (err: any) {
                expect(err).toBeInstanceOf(CustomHttpError);
                expect(err.status).toEqual(401);
                expect(err.message).toBe('Invalid username or password');
            }
        });
    });

    describe('authService.registerUser', () => {
        afterEach(() => jest.clearAllMocks());

        it('should create user', async () => {
            const user = {
                id: 1,
                username: 'username',
                role: UserRole.USER
            } as UserEntity;

            const payload = {
                username: 'username',
                role: UserRole.USER,
                password: 'asd',
                confirmPassword: 'asd'
            } as RegisterUserPayload;

            jest.spyOn(repository, 'create').mockResolvedValue(user);
            jest.spyOn(repository, 'findOneBy').mockResolvedValue(null);

            const result = await authService.registerUser(payload);

            expect(repository.create).toHaveBeenCalledWith({
                username: payload.username,
                password: payload.password,
                role: payload.role
            }, ['id', 'username', 'role']);

            expect(result).toBe(user);

        });
        it('should throw if passwords are not matching', async () => {
            const payload: RegisterUserPayload = {
                password: 'asd',
                confirmPassword: 'dsa',
                username: 'user',
                role: UserRole.USER,
            };

            try {
                await authService.registerUser(payload);
                expect(authService.registerUser).toHaveBeenCalledWith(payload);
            } catch (err: any) {
                expect(err).toBeInstanceOf(CustomHttpError);
                expect(err.status).toEqual(400);
                expect(err.message).toEqual('Passwords don\'t match!');
            }
        });

        it('should throw if user already exists', async () => {
            const payload = {} as RegisterUserPayload;

            jest.spyOn(repository, 'findOneBy').mockResolvedValue({} as UserEntity);

            try {
                await authService.registerUser(payload);
                expect(authService.registerUser).toHaveBeenCalledWith(payload);
            } catch (err: any) {
                expect(err).toBeInstanceOf(CustomHttpError);
                expect(err.status).toEqual(400);
                expect(err.message).toEqual('User already exists!');


            }
        });
    });

    describe('authService.getUser', () => {
        afterEach(() => jest.clearAllMocks());

        it('should call and get the user', async () => {
            const id = 1;
            const username = 'asd';

            jest.spyOn(repository, 'findOneBy').mockResolvedValue(null);

            await authService.getUser(id, username);
            expect(repository.findOneBy).toHaveBeenCalledWith({ username, id }, ['id', 'username', 'role']);
        });

    });
});
