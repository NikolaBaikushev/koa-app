import TestAgent from "supertest/lib/agent";

export const getAccessToken = async (request: TestAgent) => {
     return (await request.post('/v1/auth/login').send({
        username: 'test',
        password: 'test'
    })).body.data.accessToken
}