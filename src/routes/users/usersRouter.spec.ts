import app from "../../app";
import supertest from "supertest";
import { UserRole } from "../../schemas/models/userEntitySchema";
import { db } from "../../config/knex";
import { getAccessToken } from '../../../tests/utils/getAccessToken';
import { RepositoryManager } from "../../repository/RepositoryManager";
import { BookEntity } from "../../schemas/models/bookEntitySchema";

const USER = {
    username: 'asd',
    password: 'asd',
    role: UserRole.USER,
}
const BOOK = {
    title: 'asd',
    author: 'asd',
}


describe('/v1/users', () => {
    const request = supertest(app.callback());

    let token: string;

    beforeAll(async () => {
        token = await getAccessToken(request);
    })

    afterAll(async () => await db.destroy())

    describe('GET /:id/books', () => {
        it('should return the user\'s books', async () => {
            
            const [user] = (await db('users').insert(USER).returning('id'));
            const [book] = (await db('books').insert(BOOK).returning('id'));
            const [book2] = (await db('books').insert({
                title: 'asd2',
                author: 'asd2'
            }).returning('id'));

            await db('users_books').insert({
                user_id: user.id,
                book_id: book.id,
            })

            await db('users_books').insert({
                user_id: user.id,
                book_id: book2.id,
            })

            const res = await request.get(`/v1/users/${user.id}/books`).set('Authorization', `Bearer ${token}`)
            expect(res.status).toEqual(201);
            expect(res.body).toHaveProperty('data', expect.arrayContaining([
                expect.objectContaining({
                    id: book.id,
                }),
                expect.objectContaining({
                    id: book2.id,
                })
            ]))

            // cleanup
            await db('users').where({ id: user.id }).delete();
            await db('books').where({ id: book.id }).delete();
            await db('books').where({ id: book2.id }).delete();
        })
    })

    describe('POST /books/:id', () => {
        it('should add some book to the current logged user', async () => {
            const [book] = await db('books').insert(BOOK).returning(['id', 'title', 'author'])
            const [currentUser] = await db('users').select('id').where({ username: 'test', password: 'test' });

            const res = await request.post(`/v1/users/books/${book.id}`).set('Authorization', `Bearer ${token}`);

            expect(res.status).toEqual(200);
            expect(res.body).toHaveProperty('data', expect.objectContaining({
                user_id: currentUser.id,
                book_id: book.id
            }))

            await db('books').where({ id: book.id }).delete();
        })
    })

    describe('DELETE /books/:id', () => {
        it('should remove some book from the current logged user', async () => {
            const [book] = await db('books').insert(BOOK).returning(['id', 'title', 'author'])
            const [currentUser] = await db('users').select('id').where({ username: 'test', password: 'test' });

            await db('users_books').insert({
                book_id: book.id,
                user_id: currentUser.id
            })

            const res = await request.delete(`/v1/users/books/${book.id}`).set('Authorization', `Bearer ${token}`);

            const [isRemoved] = await db('users_books').where({ user_id: currentUser.id, book_id: book.id });

            expect(res.status).toEqual(201);
            expect(res.body).toHaveProperty('data', expect.objectContaining({
                user_id: currentUser.id,
                book_id: book.id
            }))

            expect(isRemoved).toBeUndefined();


            await db('books').where({ id: book.id }).delete();
        })
    })

    describe('POST /:id/books/:id', () => {
        it('should add some book to some user', async () => {
            const [book] = await db('books').insert(BOOK).returning(['id', 'title', 'author'])
            const [user] = await db('users').select('id').where({ username: 'sony', password: 'sony' });

            const res = await request.post(`/v1/users/${user.id}/books/${book.id}`).set('Authorization', `Bearer ${token}`);

            const [addedBook] = await db('users_books').where({
                user_id: user.id,
                book_id: book.id
            }).select(['user_id', 'book_id'])

            expect(res.status).toEqual(201);
            expect(res.body).toHaveProperty('data', expect.objectContaining({
                user_id: user.id,
                book_id: book.id
            }))

            expect(addedBook).toBeDefined();
            expect(addedBook).toEqual(expect.objectContaining({
                user_id: user.id,
                book_id: book.id
            }));

            await db('books').where({ id: book.id }).delete();
        })
    })

    describe('DELETE /:id/books/:id', () => {
        it('should delete some book from some user', async () => {
            const [book] = await db('books').insert(BOOK).returning(['id', 'title', 'author'])
            const [user] = await db('users').select('id').where({ username: 'sony', password: 'sony' });

            await db('users_books').insert({
                user_id: user.id,
                book_id: book.id
            })

            const res = await request.delete(`/v1/users/${user.id}/books/${book.id}`).set('Authorization', `Bearer ${token}`);

            const [isRemoved] = await db('users_books').where({
                user_id: user.id,
                book_id: book.id
            })

            expect(res.status).toEqual(201);
            expect(res.body).toHaveProperty('data', expect.objectContaining({
                user_id: user.id,
                book_id: book.id
            }))

            expect(isRemoved).toBeUndefined();

            await db('books').where({ id: book.id }).delete();
        })
    })

});