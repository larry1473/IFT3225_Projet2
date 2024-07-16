import { Server } from '../Server';
import request from 'supertest';
let server: Server = new Server();
describe('Server', () => {
    it('should start the server', async () => {
        const res = await request(server.app).get('/');
        expect(res.status).toEqual(200);
    });
});