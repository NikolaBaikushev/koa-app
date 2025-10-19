import { CustomHttpError } from '../common/HttpError';
import { RepositoryManager } from '../repository/RepositoryManager';
import { BookEntity } from '../schemas/models/bookEntitySchema';
import { UserBookEntity } from '../schemas/models/userBookEntitySchema';
import { UserEntity } from '../schemas/models/userEntitySchema';
import { userService } from './userService';

/* eslint-disable @typescript-eslint/no-explicit-any */

describe('userService', () => {
    const repository = RepositoryManager.UsersRepository;
    const usersBooksRepository = RepositoryManager.UsersBooksRepository;

    afterEach(() => jest.clearAllMocks());

    describe('userService.getUserById', () => {
        afterEach(() => jest.clearAllMocks());
        it('should return user', async () => {
            const id = 1;
            jest.spyOn(repository, 'findById').mockResolvedValue({ id: id, username: 'asd' } as UserEntity);
            const result = await userService.getUserById(id);

            expect(result).toMatchObject({ id, username: 'asd' });
            expect(repository.findById).toHaveBeenCalledWith(id, ['id', 'username']);
        });

        it('should throw error when user not found', async () => {
            const id = 1;

            jest.spyOn(repository, 'findById').mockResolvedValue(null);

            try {
                await userService.getUserById(id);
                expect(repository.findById).toHaveBeenCalledWith(id, ['id', 'username']);
            } catch (err: any) {
                expect(err).toBeInstanceOf(CustomHttpError);
                expect(err.status).toEqual(404);
                expect(err.message).toEqual(`User with ID: ${id} Not Found!`);
            }
        });
    });

    describe('userService.addBookToUser', () => {
        const userId = 1;
        const bookId = 1;

        afterEach(() => jest.clearAllMocks());
        
        it('should add book to user', async () => {
            const createResult = { user_id: userId, book_id: bookId } as UserBookEntity;
            
            jest.spyOn(repository, 'findById').mockResolvedValue({id: userId} as UserEntity);
            jest.spyOn(usersBooksRepository, 'findOneBy').mockResolvedValue(null);
            jest.spyOn(usersBooksRepository, 'create').mockResolvedValue(createResult);

            const result = await userService.addBookToUser(bookId, userId);

            expect(result).toMatchObject(createResult);
            expect(repository.findById).toHaveBeenCalledWith(userId);
            expect(usersBooksRepository.findOneBy).toHaveBeenCalledWith(createResult);
            expect(usersBooksRepository.create).toHaveBeenCalledWith(createResult);
        });

        it('should throw error when user is not found', async () => {

            jest.spyOn(repository, 'findById').mockResolvedValue(null);

            try {
                await userService.addBookToUser(bookId, userId);
                expect(repository.findById).toHaveBeenCalledWith(userId);
            } catch (err: any) {
                expect(err).toBeInstanceOf(CustomHttpError);
                expect(err.status).toEqual(404);
                expect(err.message).toEqual('User doesn\'t exist!');
            }
        });

        it('should throw error when user already has the book', async () => {
            jest.spyOn(repository, 'findById').mockResolvedValue({id: userId} as UserEntity);
            jest.spyOn(usersBooksRepository, 'findOneBy').mockResolvedValue({user_id: 1, book_id: 1} as UserBookEntity);

            try {
                await userService.addBookToUser(bookId, userId);
                expect(repository.findById).toHaveBeenCalledWith(userId);
                expect(usersBooksRepository.findOneBy).toHaveBeenCalled();
            } catch (err: any) {
                expect(err).toBeInstanceOf(CustomHttpError);
                expect(err.status).toEqual(400);
                expect(err.message).toEqual('User already has this book!');
            }
        });
    });
    describe('userService.removeBookFromUser', () => {
        const userId = 1;
        const bookId = 1;

        afterEach(() => jest.clearAllMocks());
        
        it('should remove book from user', async () => {
            const returned = { user_id: userId, book_id: bookId } as UserBookEntity;
            
            jest.spyOn(repository, 'findById').mockResolvedValue({id: userId} as UserEntity);
            jest.spyOn(usersBooksRepository, 'findOneBy').mockResolvedValue(returned);
            jest.spyOn(usersBooksRepository, 'removeBookFromUser').mockResolvedValue(returned);

            const result = await userService.removeBookFromUser(bookId, userId);

            expect(result).toMatchObject(returned);
            expect(repository.findById).toHaveBeenCalledWith(userId);
            expect(usersBooksRepository.findOneBy).toHaveBeenCalledWith(returned);
            expect(usersBooksRepository.removeBookFromUser).toHaveBeenCalledWith(returned.book_id, returned.user_id);
        });

        it('should throw error when user is not found', async () => {
            jest.spyOn(repository, 'findById').mockResolvedValue(null);

            try {
                await userService.removeBookFromUser(bookId, userId);
                expect(repository.findById).toHaveBeenCalledWith(userId);
            } catch (err: any) {
                expect(err).toBeInstanceOf(CustomHttpError);
                expect(err.status).toEqual(404);
                expect(err.message).toEqual('User doesn\'t exist!');
            }
        });

        it('should throw error when book is not found', async () => {
            jest.spyOn(repository, 'findById').mockResolvedValue({id: userId} as UserEntity);
            jest.spyOn(usersBooksRepository, 'findOneBy').mockResolvedValue(null);

            try {
                await userService.removeBookFromUser(bookId, userId);
                expect(repository.findById).toHaveBeenCalledWith(userId);
                expect(usersBooksRepository.findOneBy).toHaveBeenCalled();
            } catch (err: any) {
                expect(err).toBeInstanceOf(CustomHttpError);
                expect(err.status).toEqual(404);
                expect(err.message).toEqual('Book doesn\'t belong to this user or doesn\'t exist at all');
            }
        });
    });
});