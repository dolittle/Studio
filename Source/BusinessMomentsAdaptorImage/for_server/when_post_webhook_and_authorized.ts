// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import request from 'supertest';
import { createServer } from '../server';


describe('Post webhook', function () {
    let app: any;
    let authHeaderToSendInRequest: string;
    const configuredAuthHeader = 'Basic bTM6am9obmNhcm1hY2s=';

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
                    body: { foo: 'bar' }
                })
                .expect(200, done);
        });

    });

});
