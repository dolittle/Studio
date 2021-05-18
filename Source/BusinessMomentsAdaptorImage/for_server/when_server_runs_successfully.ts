import request from 'supertest';
import { createServer } from '../server';


describe('server checks', function () {
    let app: any;

    beforeEach(() => {
        process.env.WH_AUTHORIZATION = 'Basic bTM6am9obmNhcm1hY2s=';
        app = createServer();
    });

    it('should responds to the post', function (done) {
        request(app)
            .post('/api/webhooks-ingestor')
            .set('authorization', 'Basic bTM6am9obmNhcm1hY2s=')
            .send({
                headers: { authorization: 'Basic' },
                body: { foo: 'bar' },
            })
            .expect(200, done);
    });
});
