const request = require('supertest');
const app = require('../../src/app');

describe('User API', () => {
    it('should register a user', async () => {
        const res = await request(app)
            .post('/api/users/register')
            .send({
                username: 'testuser',
                email: 'FwWtI@example.com',
                password: 'testpassword',
                role: 'user'
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('id');
        expect(res.body).toHaveProperty('username', 'testuser');
    });
});