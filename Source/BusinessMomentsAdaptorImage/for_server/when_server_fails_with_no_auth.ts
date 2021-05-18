import request from 'supertest';
import { createServer } from '../server';


describe('server checks', function () {
    let app: any;

    beforeEach(() => {
        process.env.WH_AUTHORIZATION = 'Basic bTM6am9obmNhcm1hY2s=';
        app = createServer();
    });

    it('should fail due to lack of auth', function (done) {
        request(app)
            .post('/api/webhooks-ingestor')
            .send({
                headers: { authorization: 'Basic' },
                body: { foo: 'bar' },
            })
            .expect(401, done);
    });
});
