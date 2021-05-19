import request from 'supertest';
import { createServer } from '../server';


describe('Post webhook', function () {
    let app: any;
    let authHeaderToSendInRequest: string;

    beforeEach(() => {
        process.env.WH_AUTHORIZATION = 'Basic bTM6am9obmNhcm1hY2s=';
        app = createServer();
    });

    context('with invalid authorization header', () => {

        beforeEach(() => {
            authHeaderToSendInRequest = 'Basic invalidheader';
        });

        it('will return 401 Unauthorized', (done) => {
            request(app)
                .post('/api/webhooks-ingestor')
                .set('authorization', authHeaderToSendInRequest)
                .send({
                    body: { foo: 'bar' }
                })
                .expect(401, done);
        });

    });

});
