// Copyright (c) Aigonix. All rights reserved.
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
        },
        {
            id: '11b6cf47-5d9f-438f-8116-0d9828654657',
            name: 'Taco',
            environment: 'Prod',
        },
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
            {
                name: 'Prod',
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
            {
                dolittle: {
                    applicationId: '11b6cf47-5d9f-438f-8116-0d9828654657',
                    customerId: '453e04a7-4f9d-42f2-b36c-d51fa2c83fa3',
                    microserviceId: '16965610-e419-40f1-b550-4841e93553b9',
                },
                name: 'Goodbye',
                kind: 'simple',
                environment: 'Dev',
                extra: {
                    headCommand: { args: null, command: null },
                    headImage: 'bye-world',
                    headPort: 80,
                    ingress: { path: '/', pathType: 'Prefix' },
                    isPublic: false,
                    runtimeImage: 'dolittle/runtime:1337.0.0',
                },
            },
            {
                dolittle: {
                    applicationId: '11b6cf47-5d9f-438f-8116-0d9828654657',
                    customerId: '453e04a7-4f9d-42f2-b36c-d51fa2c83fa3',
                    // microserviceId: '7e78b802-e246-467b-9946-1deabf8042ef',
                    microserviceId: 'f2a36f3e-4052-4007-bb22-c6ae56cde1b3',
                },
                name: 'Welcome',
                kind: 'simple',
                environment: 'Prod',
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
            },
            {
                id: '16965610-e419-40f1-b550-4841e93553b9',
                name: 'Goodbye',
                kind: 'simple',
                environment: 'Dev',
                images: [
                    {
                        name: 'head',
                        image: 'bye-world',
                    },
                    {
                        name: 'runtime',
                        image: 'dolittle/runtime:1337.0.0',
                    }
                ],
                ingressUrls: [],
                ingressPaths: [],
            },
            {
                // id: '7e78b802-e246-467b-9946-1deabf8042ef',
                id: 'f2a36f3e-4052-4007-bb22-c6ae56cde1b3',
                name: 'Welcome',
                kind: 'simple',
                environment: 'Prod',
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
            },
        ],
    },
};

const liveApplicationEnvironmentPodstatuses = {
    '11b6cf47-5d9f-438f-8116-0d9828654657': {
        dev: {
            '7e78b802-e246-467b-9946-1deabf8042ef': {
                namespace: 'application-11b6cf47-5d9f-438f-8116-0d9828654657',
                microservice: {
                    name: 'Welcome',
                    id: '7e78b802-e246-467b-9946-1deabf8042ef',
                },
                pods: [
                    {
                        name: 'dev-welcome-66d98f6b6d-fcj6n',
                        phase: 'Running',
                        containers: [
                            {
                                image: 'docker.io/hello-world',
                                name: 'head',
                                age: '331h13m59.578599665s',
                                state: 'running',
                                started: '2022-08-31 12:46:44 +0000 UTC',
                                restarts: 3,
                            },
                            {
                                image: 'docker.io/dolittle/runtime:1337.0.0',
                                name: 'runtime',
                                age: '331h13m59.578599665s',
                                state: 'running',
                                started: '2022-08-31 12:46:44 +0000 UTC',
                                restarts: 0,
                            },
                        ],
                    },
                ],
            },
            '16965610-e419-40f1-b550-4841e93553b9': {
                namespace: 'application-11b6cf47-5d9f-438f-8116-0d9828654657',
                microservice: {
                    name: 'Goodbye',
                    id: '16965610-e419-40f1-b550-4841e93553b9',
                },
                pods: [
                    {
                        name: 'dev-goodbye-7d85ff568c-chkk6',
                        phase: 'Pending',
                        containers: [
                            {
                                image: 'docker.io/bye-world',
                                name: 'head',
                                age: '311h38m39.364647036s',
                                state: 'waiting',
                                started: '2022-09-01 07:07:20 +0000 UTC',
                                restarts: 3,
                            },
                            {
                                image: 'docker.io/dolittle/runtime:1337.0.0',
                                name: 'runtime',
                                age: '311h38m39.364647036s',
                                state: 'waiting',
                                started: '2022-09-01 07:07:20 +0000 UTC',
                                restarts: 0,
                            },
                        ],
                    },
                ],
            },
        },
        prod: {
            'f2a36f3e-4052-4007-bb22-c6ae56cde1b3': {
                // '7e78b802-e246-467b-9946-1deabf8042ef': {
                namespace: 'application-11b6cf47-5d9f-438f-8116-0d9828654657',
                microservice: {
                    name: 'Welcome',
                    // id: '7e78b802-e246-467b-9946-1deabf8042ef',
                    id: 'f2a36f3e-4052-4007-bb22-c6ae56cde1b3',
                },
                pods: [
                    {
                        name: 'prod-welcome-85876d868c-gdp8z',
                        phase: 'Running',
                        containers: [
                            {
                                image: 'docker.io/hello-world',
                                name: 'head',
                                age: '352h22m53.58002507s',
                                state: 'running',
                                started: '2022-08-30 14:07:59 +0000 UTC',
                                restarts: 3,
                            },
                            {
                                image: 'docker.io/dolittle/runtime:1337.0.0',
                                name: 'runtime',
                                age: '352h22m53.58002507s',
                                state: 'running',
                                started: '2022-08-30 14:07:59 +0000 UTC',
                                restarts: 0,
                            },
                        ],
                    },
                ],
            },
        },
    },
};

const liveMicroservicesConfigFiles = {
    '11b6cf47-5d9f-438f-8116-0d9828654657': {
        Dev: {
            '7e78b802-e246-467b-9946-1deabf8042ef': {
                data: [],
            },
            '16965610-e419-40f1-b550-4841e93553b9': {
                data: [],
            },
        },
        Prod: {
            'f2a36f3e-4052-4007-bb22-c6ae56cde1b3': {
                // '7e78b802-e246-467b-9946-1deabf8042ef': {
                data: [],
            },
        },
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

routes.post('/application', (req, res) => {
    const application = req.body;
    console.log('Creating application', application);

    if (application.name === 'fail') {
        res.status(500).json({ message: 'Mock failing intentionally for application name "fail"' }).end();
        return;
    }

    res.status(200).json({}).end();
})

routes.get('/live/application/:id/microservices', (req, res) => {
    const applicationId = req.params.id;

    console.log('Getting live application', applicationId, 'microservices');
    if (applicationId in liveApplications) {
        res.status(200).json(liveApplications[applicationId]).end();
        return;
    }
    res.status(404).end(`Application ${applicationId} not found`);
});

routes.get('/live/application/:applicationId/environment/:environmentId/microservice/:microserviceId/podstatus', (req, res) => {
    const { applicationId, environmentId, microserviceId } = req.params;

    console.log('Getting live microservice Pod status', applicationId, environmentId, microserviceId);
    if (applicationId in liveApplicationEnvironmentPodstatuses) {
        const application = liveApplicationEnvironmentPodstatuses[applicationId];
        if (environmentId in application) {
            const environment = application[environmentId];
            if (microserviceId in environment) {
                const podstatus = environment[microserviceId];
                res.status(200).json(podstatus).end();
                return;
            }
        }
    }

    // TODO: WÆT!?
    const notFoundData = {
        namespace: `application-${applicationId}`,
        microservice: {
            name: '',
            id: microserviceId,
        },
        pods: [],
    }

    res.status(200).json(notFoundData).end();
});

routes.get('/live/application/:applicationId/pod/:podName/logs', (req, res) => {
    const { applicationId, podName } = req.params;
    const { containerName } = req.query;

    console.warn('Getting live microservice Pod logs', applicationId, podName, containerName, '. This will only return empty data.');
    res.status(200).json({
        applicationId,
        podName,
        logs: 'This Kubernetes logs endpoint is not implemented in the mocked backed...',
    }).end();
});

routes.get('/live/application/:applicationId/environment/:environmentId/microservice/:microserviceId/config-files/list', (req, res) => {

    const { applicationId, environmentId, microserviceId } = req.params;

    console.log('Getting live microservice ConfigFiles', applicationId, environmentId, microserviceId);
    if (applicationId in liveMicroservicesConfigFiles) {
        const application = liveMicroservicesConfigFiles[applicationId];
        if (environmentId in application) {
            const environment = application[environmentId];
            if (microserviceId in environment) {
                const configFiles = { applicationId, microserviceId, environment: environmentId, ...environment[microserviceId] };
                res.status(200).json(configFiles).end();
                return;
            }
        }
    }

    res.status(500).json({ message: 'not-found' }).end();
});
