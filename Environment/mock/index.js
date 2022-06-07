// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

const app = require('express')();

const applications = require('./api/applications');

app.use(applications);

app.use((req, res) => {
    console.error('Received request for', req.url, 'this endpoint is not implemented.');
    res.status(404).end('Not implemented!');
});

app.listen(3007, () => {
    console.log('Listening at http://localhost:3007');
});
