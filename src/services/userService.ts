import { CustomHttpError } from '../common/HttpError';
import { User } from '../schemas/models/userEntitySchema';
import { RepositoryManager } from '../repository/RepositoryManager';

const repository = RepositoryManager.UsersRepository;

const getUserById = async (id: number): Promise<User> => {
    const user = await repository.findById(id, ['id', 'username']);
    if (!user) {
        throw new CustomHttpError(404, `User with ID: ${id} Not Found!`);
    }
    return user;
};

const addBookToUser = async (bookId: number, userId: number) => {
}

export const userService = {
    getUserById,
};

