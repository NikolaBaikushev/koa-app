
import {KnexRepository} from '../../src/repository/Repository';
type AsyncFn<T> = jest.Mock<Promise<T>, any[]>;

export class MockKnexRepository<T> implements Partial<KnexRepository<T>> {
    create: AsyncFn<T> = jest.fn();
    update: AsyncFn<T> = jest.fn();
    delete: AsyncFn<T> = jest.fn();
    find: jest.Mock<Promise<T[]>, any[]> = jest.fn();
    findById: AsyncFn<T> = jest.fn();
    findOneBy: jest.Mock<Promise<T | null>, any[]> = jest.fn();
    getAll: jest.Mock<Promise<T[]>, any[]> = jest.fn();

    get qb() {
        return {
            where: jest.fn().mockReturnThis(),
            update: jest.fn().mockReturnThis(),
            delete: jest.fn().mockReturnThis(),
            insert: jest.fn().mockReturnThis(),
            returning: jest.fn().mockReturnThis(),
            then: jest.fn(),
            select: jest.fn().mockReturnThis(),
            first: jest.fn(),
            from: jest.fn().mockReturnThis(),
        } as any;
    }
}
