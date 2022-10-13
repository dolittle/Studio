// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

const { Router } = require('express');

const routes = module.exports = Router();


routes.get('/proxy/:applicationId/:environment/:microserviceId/:port/', (req, res) => {
    const { applicationId, environment, microserviceId, port } = req.params;

    console.log('Getting proxy to', applicationId, environment, microserviceId, port);
    res.status(200).end(`
        <!DOCTYPE html>
        <html>
            <head>
                <style>
                    html {
                        color: white;
                    }
                </style>
            </head>
            <body>
                <h1>This would be a proxy to:</h1>
                <ul>
                    <li>Application: ${applicationId}</li>
                    <li>Environment: ${environment}</li>
                    <li>Microservice: ${microserviceId}</li>
                    <li>Port: ${port}</li>
                </ul>
                <img src="https://media.tenor.com/u9XnPveDa9AAAAAC/rick-rickroll.gif" />
            </body>
        </html>
    `);
});
