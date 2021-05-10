import request from 'supertest';
import { expect } from 'chai';
import createServer from '../server';

const app = createServer();

describe('server checks', function () {
    it('should responds to the post', function (done) {
        process.env.WH_AUTHORIZATION = 'Basic bTM6am9obmNhcm1hY2s=';
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
