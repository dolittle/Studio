const request = require('supertest');
const express = require('express');

const app = express();

app.get('/api/webhooks-ingestor', function (req, res) {
    res.status(200).json({ name: 'john' });
});

request(app)
    .post('/api/webhooks-ingestor')
    .expect('Content-Type', /json/)
    .expect('Content-Length', '15')
    .expect(200)
    .end(function (err, res) {
        if (err) throw err;
    });
