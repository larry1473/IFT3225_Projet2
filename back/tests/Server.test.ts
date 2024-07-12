import { server } from '../src/Server';
import request from 'supertest';

describe('Server', () => {
    it('should start the server', async () => {
        const res = await request(server.app).get('/');
        expect(res.status).toEqual(200);
    });
});