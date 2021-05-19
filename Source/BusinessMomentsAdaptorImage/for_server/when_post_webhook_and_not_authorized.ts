import request from 'supertest';
import { createServer } from '../server';


describe('Post webhook', function () {
    let app: any;
    let authHeader: string;

    beforeEach(() => {
        process.env.WH_AUTHORIZATION = 'Basic bTM6am9obmNhcm1hY2s=';
        app = createServer();
    });

    context('with invalid authorization header', () => {

        beforeEach(() => {
            authHeader = 'Basic invalidheader';
        });

        it('will return 401 Unauthorized', (done) => {
            request(app)
                .post('/api/webhooks-ingestor')
                .send({
                    headers: { authorization: authHeader },
                    body: { foo: 'bar' },
                })
                .expect(401, done);
        });

    });

});
