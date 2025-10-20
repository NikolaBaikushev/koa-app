import app from '../../app';
import supertest from 'supertest';
import { UserRole } from '../../schemas/models/userEntitySchema';
import { db } from '../../config/knex';

describe('/v1/auth', () => {
    const request = supertest(app.callback());

    afterAll(async () => await db.destroy());


    describe('login', () => {
        it('should return accessToken', async () => {
            const res = await request.post('/v1/auth/login').send({
                username: 'test',
                password: 'test'
            });

            expect(res.status).toBe(201);
            expect(res.body).toHaveProperty('success', true);
            expect(res.body).toHaveProperty('data', expect.objectContaining({
                accessToken: expect.any(String)
            }));
        });
    });

    describe('register', () => {
        it('should return accessToken', async () => {
            const res = await request.post('/v1/auth/register').send({
                username: 'test2',
                password: 'test2',
                confirmPassword: 'test2'
            });

            const expectedResult = {
                id: expect.any(Number),
                username: 'test2',
                role: UserRole.USER
            };

            expect(res.status).toBe(201);
            expect(res.body).toHaveProperty('success', true);
            expect(res.body).toHaveProperty('data', expect.objectContaining(expectedResult));

            const users = await db('users').where({username: expectedResult.username}).select('*');
            expect(users.length).toBe(1);
            expect(users[0]).toMatchObject(expectedResult);
            
        });
    });
});