// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

export type ConnectorWebhookConfigBearer = {
    token: string
};

export type ConnectorWebhookConfigBasic = {
    username: string
    password: string
};

export type ConnectorWebhookConfig = {
    domain?: string
    uriPrefix?: string
    kind: string

    // ConnectorWebhookConfigBasic
    // ConnectorWebhookConfigBearer
    config: any
};

export type Connector = {
    id: string
    name: string
    kind: string
    config: ConnectorWebhookConfig
};


export type MicroserviceDolittle = {
    applicationId: string
    tenantId: string
    microserviceId: string
};

export type MicroserviceIngressPath = {
    path: string
    host: string
    pathType: string
    domainPrefix: string
};

export type MicroserviceSimple = {
    dolittle: MicroserviceDolittle
    name: string
    kind: string
    environment: string
    extra: MicroserviceSimpleExtra
};

export type MicroserviceSimpleExtra = {
    headImage: string
    runtimeImage: string
    ingress: MicroserviceIngressPath
};


export type MicroserviceBusinessMomentAdaptor = {
    dolittle: MicroserviceDolittle
    name: string
    kind: string
    environment: string
    extra: MicroserviceBusinessMomentAdaptorExtra
};

export type MicroserviceBusinessMomentAdaptorExtra = {
    headImage: string
    runtimeImage: string
    ingress: MicroserviceIngressPath
    connector: MicroserviceBusinessMomentAdaptorConnector
    moments: BusinessMoment[]
};

export type MicroserviceBusinessMomentAdaptorConnector = {
    kind: string
    config: ConnectorWebhookConfig
};


export type BusinessMoment = {
    name: string
    uuid: string
    filter: string
    mapper: string
    transform: string
};
