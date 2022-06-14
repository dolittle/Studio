// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

const { Router } = require('express');

const routes = module.exports = Router();

const customer = {
    id: '453e04a7-4f9d-42f2-b36c-d51fa2c83fa3',
    name: 'Customer-Chris',
    canCreateApplication: true,
    applications: [
        {
            id: '11b6cf47-5d9f-438f-8116-0d9828654657',
            name: 'Taco',
            environment: 'Dev',
        }
    ],
};

const applications = {
    '11b6cf47-5d9f-438f-8116-0d9828654657': {
        id: '11b6cf47-5d9f-438f-8116-0d9828654657',
        name: 'Taco',
        customerId: '453e04a7-4f9d-42f2-b36c-d51fa2c83fa3',
        customerName: 'Customer-Chris',
        environments: [
            {
                name: 'Dev',
                automationEnabled: true,
                connections: {
                    m3Connector: false,
                },
            },
        ],
        microservices: [
            {
                dolittle: {
                    applicationId: '11b6cf47-5d9f-438f-8116-0d9828654657',
                    customerId: '453e04a7-4f9d-42f2-b36c-d51fa2c83fa3',
                    microserviceId: '7e78b802-e246-467b-9946-1deabf8042ef',
                },
                name: 'Welcome',
                kind: 'simple',
                environment: 'Dev',
                extra: {
                    headCommand: { args: null, command: null },
                    headImage: 'hello-world',
                    headPort: 80,
                    ingress: { path: '/', pathType: 'Prefix' },
                    isPublic: false,
                    runtimeImage: 'dolittle/runtime:1337.0.0',
                },
            },
        ],
    },
};

const liveApplications = {
    '11b6cf47-5d9f-438f-8116-0d9828654657': {
        application: {
            id: '11b6cf47-5d9f-438f-8116-0d9828654657',
            name: 'Taco',
        },
        microservices: [
            {
                id: '7e78b802-e246-467b-9946-1deabf8042ef',
                name: 'Welcome',
                kind: 'simple',
                environment: 'Dev',
                images: [
                    {
                        name: 'head',
                        image: 'hello-world',
                    },
                    {
                        name: 'runtime',
                        image: 'dolittle/runtime:1337.0.0',
                    }
                ],
                ingressUrls: [],
                ingressPaths: [],
            }
        ],
    },
};

routes.get('/applications', (req, res) => {
    console.log('Getting applications');
    res.status(200).json(customer).end();
});

routes.get('/application/:id', (req, res) => {
    const applicationId = req.params.id;

    console.log('Getting application', applicationId);
    if (applicationId in applications) {
        res.status(200).json(applications[applicationId]).end();
        return;
    }
    res.status(404).end(`Application ${applicationId} not found`);
});

routes.get('/live/application/:id/microservices', (req, res) => {
    const applicationId = req.params.id;

    console.log('Getting live application', applicationId, 'microservices');
    if (applicationId in liveApplications) {
        res.status(200).json(liveApplications[applicationId]).end();
        return;
    }
    res.status(404).end(`Application ${applicationId} not found`);
});
