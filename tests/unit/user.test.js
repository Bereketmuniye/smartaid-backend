const { hashPassword } = require('../../src/services/authService');
const bcypt = require('bcryptjs');

describe('Auth Service ',() => {
    it('should hash password correctly', async () => {
        const hashed = await hashPassword('myPassword123');
        expect(bcypt.compareSync('myPassword123', hashed)).toBe(true);
    });
});