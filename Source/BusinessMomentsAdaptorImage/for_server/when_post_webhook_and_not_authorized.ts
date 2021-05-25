// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import supertest from 'supertest';
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
            supertest(app)
                .post('/api/webhooks-ingestor')
                .set('authorization', authHeaderToSendInRequest)
                .send({
                    body: { foo: 'bar' }
                })
                .expect(401, done);
        });

    });

    it('will return 401 Unauthorized when Authorization header is not set', (done) => {
        supertest(app)
            .post('/api/webhooks-ingestor')
            .send({
                body: { foo: 'bar' }
            })
            .expect(401, done);
    });

});
