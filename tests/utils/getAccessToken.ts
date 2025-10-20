import TestAgent from 'supertest/lib/agent';

export const getAccessToken = async (request: TestAgent, username?: string, password?: string) => {
    return (await request.post('/v1/auth/login').send({
        username: username || 'test',
        password: password || 'test'
    })).body.data.accessToken;
};