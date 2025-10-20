import { Server } from "http";
import TestAgent from "supertest/lib/agent";
import app from "../../app";
import supertest from "supertest";
import { UserRole } from "../../schemas/models/userEntitySchema";
import { db } from "../../config/knex";
import { getAccessToken } from '../../../tests/utils/getAccessToken';
import { RepositoryManager } from "../../repository/RepositoryManager";
import { BookEntity } from "../../schemas/models/bookEntitySchema";

const BOOK = {
    title: 'asd',
    author: 'asd'
}

const DELETE_BOOK = async () => {
    await db('books').where(BOOK).delete();
}

describe('/v1/books', () => {
    const request = supertest(app.callback());

    let token: string;

    beforeAll(async () => {
        token = await getAccessToken(request);
    })

    afterAll(async () => await db.destroy())


    describe('GET /all', () => {
        it('should return all books', async () => {
            const expectedAllBooksCount = await db('books').select('*');

            const res = await request.get(`/v1/books/all`).set('Authorization', `Bearer ${token}`);

            expect(res.status).toBe(201);
            expect(res.body).toHaveProperty('success', true)
            expect(res.body).toHaveProperty('data');
            expect(res.body.data.length).toBe(expectedAllBooksCount.length);
        });
    });

    describe('GET /:id', () => {
        it('should return book by id books', async () => {
            const insertedBook = await db('books').insert(BOOK).returning('id').then(rows => rows[0])

            const res = await request.get(`/v1/books/${insertedBook.id}`).set('Authorization', `Bearer ${token}`);

            expect(res.status).toBe(201);
            expect(res.body).toHaveProperty('success', true)
            expect(res.body).toHaveProperty('data', expect.objectContaining({
                id: insertedBook.id,
                ...BOOK
            }));
        });

        afterAll(async () => {
            await DELETE_BOOK();
        })
    });

    describe('GET /', () => {
        it('should return current users books', async () => {
            const [expectedUser] = await db('users').where({ username: 'test' }).select('*');
            const expectedBooks = await RepositoryManager.UsersBooksRepository.find({ user_id: expectedUser.id });

            const res = await request.get('/v1/books').set('Authorization', `Bearer ${token}`);

            expect(res.status).toBe(201);
            expect(res.body).toHaveProperty('data');
            expect(res.body.data.length).toBe(expectedBooks.length);
        })
    })

    describe('POST /', () => {
        afterAll(async () => {
            await DELETE_BOOK();
        })

        it('should create book', async () => {
            const payload = {
                title: 'asd',
                author: 'asd'
            }

            const res = (await request.post('/v1/books').set('Authorization', `Bearer ${token}`).send(payload));

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('data', expect.objectContaining({
                id: expect.any(Number),
                ...payload
            }));

            const createdBook = await db('books').where({ id: res.body.data.id }).first();

            expect(createdBook).toMatchObject(payload);
        })

        it('should not create book due to isAuthor guard', async () => {
            const token = await getAccessToken(request, 'sony', 'sony');

            const res = await request.post('/v1/books').set('Authorization', `Bearer ${token}`);

            expect(res.status).toBe(403);
            expect(res.body).toHaveProperty('errors', expect.objectContaining({
                message: 'Only authors have access to this resource!'
            }));
            expect(res.body).toHaveProperty('message', 'Forbidden Resource')
        })
    })


    describe('PUT /:id', () => {

        afterEach(async () => {
            await DELETE_BOOK();
        })

        it('should update book', async () => {
            const insertedBook = await db('books').insert(BOOK).returning('id').then(rows => rows[0])

            const updatePayload = {
                title: 'Updated Book',
                author: 'Updated Author'
            }
            const res = (await request.put(`/v1/books/${insertedBook.id}`).set('Authorization', `Bearer ${token}`).send(updatePayload));

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('data', expect.objectContaining({
                id: insertedBook.id,
                ...updatePayload
            }));

            const updated = await db('books').select(['title', 'author']).where({
                title: updatePayload.title,
                author: updatePayload.author
            }).first()

            expect(updated).toMatchObject(updatePayload)
        })

        it('should not update book due to isAuthor guard', async () => {
            const insertedBook = await db('books').insert(BOOK).returning('id').then(rows => rows[0])

            const token = await getAccessToken(request, 'sony', 'sony');

            const res = await request.put(`/v1/books/${insertedBook.id}`).set('Authorization', `Bearer ${token}`);

            expect(res.status).toBe(403);
            expect(res.body).toHaveProperty('errors', expect.objectContaining({
                message: 'Only authors have access to this resource!'
            }));
            expect(res.body).toHaveProperty('message', 'Forbidden Resource')
        })
    })

    describe('DELETE /:id', () => {
        afterEach(async () => {
            await DELETE_BOOK();
        })

        it('should delete book', async () => {
            const insertedBook: BookEntity = await db('books').insert(BOOK).returning(['id', 'title', 'author']).then(rows => rows[0])

            const res = await request.delete(`/v1/books/${insertedBook.id}`).set('Authorization', `Bearer ${token}`);

            expect(res.status).toBe(201);
            expect(res.body).toHaveProperty('data', expect.objectContaining({
                id: insertedBook.id,
                ...insertedBook,
            }));

            const deleted = await db('books').select('*').where({
                title: insertedBook.title,
                author: insertedBook.author
            }).first() || undefined;

            expect(deleted).toBeUndefined()
        })

        it('should not delete book due to isAuthor guard', async () => {
            const insertedBook = await db('books').insert(BOOK).returning('*').then(rows => rows[0])

            const token = await getAccessToken(request, 'sony', 'sony');

            const res = await request.put(`/v1/books/${insertedBook.id}`).set('Authorization', `Bearer ${token}`);

            expect(res.status).toBe(403);
            expect(res.body).toHaveProperty('errors', expect.objectContaining({
                message: 'Only authors have access to this resource!'
            }));
            expect(res.body).toHaveProperty('message', 'Forbidden Resource')
        })
    })
});