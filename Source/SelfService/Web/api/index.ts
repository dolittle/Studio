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
    entities: BusinessMomentEntity[]
};

export type MicroserviceBusinessMomentAdaptorConnector = {
    kind: string
    config: ConnectorWebhookConfig
};


export type BusinessMoment = {
    name: string
    uuid: string
    entityTypeId: string
    embeddingCode: string
    projectionCode: string
};

export type BusinessMomentEntity = {
    name: string
    entityTypeId: string
    idNameForRetrival: string
    filterCode: string
    transformCode: string
};

export type HttpResponseBusinessMoments = {
    applicationId: string
    environment: string
    moments: HttpInputBusinessMoment[]
    entities: HttpInputBusinessMomentEntity[]
};

export type HttpInputBusinessMoment = {
    applicationId: string
    environment: string
    microserviceId: string
    moment: BusinessMoment
};

export type HttpInputBusinessMomentEntity = {
    applicationId: string
    environment: string
    microserviceId: string
    entity: BusinessMomentEntity
};


export type MicroserviceRawDataLogIngestor = {
    dolittle: MicroserviceDolittle
    name: string
    kind: string
    environment: string
    extra: MicroserviceRawDataLogIngestorExtra
};

export type MicroserviceRawDataLogIngestorExtra = {
    headImage: string
    runtimeImage: string
    ingress: MicroserviceIngressPath
    webhooks: MicroserviceRawDataLogIngestorWebhookConfig[]
};

export type MicroserviceRawDataLogIngestorWebhookConfig = {
    kind: string
    suffix: string // TODO maybe uriSuffix
    // ConnectorWebhookConfigBasic
    // ConnectorWebhookConfigBearer
    config: any
};
