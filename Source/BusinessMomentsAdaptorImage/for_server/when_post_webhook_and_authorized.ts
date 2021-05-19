import request from 'supertest';
import { createServer } from '../server';


describe('Post webhook', function () {
    let app: any;
    let authHeaderToSendInRequest: string;
    let configuredAuthHeader = 'Basic bTM6am9obmNhcm1hY2s=';

    beforeEach(() => {
        process.env.WH_AUTHORIZATION = configuredAuthHeader;
        app = createServer();
    });

    context('with valid authorization header', () => {

        beforeEach(() => {
            authHeaderToSendInRequest = configuredAuthHeader;
        });

        it('will return 200 OK', function (done) {
            request(app)
                .post('/api/webhooks-ingestor')
                .set('authorization', authHeaderToSendInRequest)
                .send({
                    headers: { authorization: 'Basic' },
                    body: { foo: 'bar' },
                })
                .expect(200, done);
        });

    });

});
