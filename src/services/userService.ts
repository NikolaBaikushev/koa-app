import { CustomHttpError } from '../common/HttpError';
import { User } from '../schemas/models/userEntitySchema';
import { RepositoryManager } from '../repository/RepositoryManager';

const repository = RepositoryManager.UsersRepository;
const usersBooksRepository = RepositoryManager.UsersBooksRepository;

const getUserById = async (id: number): Promise<User> => {
    const user = await repository.findById(id, ['id', 'username']);
    if (!user) {
        throw new CustomHttpError(404, `User with ID: ${id} Not Found!`);
    }
    return user;
};

const addBookToUser = async (bookId: number, userId: number) => {
    const book = await usersBooksRepository.findOneBy({user_id: userId, book_id: bookId});
    if (book) {
        throw new CustomHttpError(400, 'User already has this book!');
    }
    return await usersBooksRepository.create({
        user_id: userId,
        book_id: bookId
    })
}


const removeBookFromUser = async (bookId: number, userId: number) => {
    const book = await usersBooksRepository.findOneBy({book_id: bookId, user_id: userId});
    if (!book) {
        throw new CustomHttpError(404, 'Book doesn\'t belong to this user or doesn\'t exist at all');
    }
    return await usersBooksRepository.removeBookFromUser(book.user_id, book.book_id);
}


export const userService = {
    getUserById,
    addBookToUser,
    removeBookFromUser
};

