const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

describe('POST /api/webhooks-ingestor', function () {
    it('should not responds to the post', function (done) {
        request(app).post('/api/webhooks-ingestor').send({}).expect(404, done);
    });
});
