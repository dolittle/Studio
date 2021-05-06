const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

describe('POST /api/webhooks-ingestor', function() {
    it('should responds to the post', function(done) {
      request(app)
        .post('/api/webhooks-ingestor')
        .send({
            'headers':{'authorization':'Basic bTM6am9obmNhcm1hY2s='},
            'body':{'foo':'bar'}
        })
        .expect(200,done)

    });
  });
