// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

export type ConnectorWebhookConfigBearer = {
    token: string;
};

export type ConnectorWebhookConfigBasic = {
    username: string;
    password: string;
};

export type ConnectorWebhookConfig = {
    domain?: string;
    uriPrefix?: string;
    kind: string;

    // ConnectorWebhookConfigBasic
    // ConnectorWebhookConfigBearer
    config: any;
};

export type Connector = {
    id: string;
    name: string;
    kind: string;
    config: ConnectorWebhookConfig;
};

export type MicroserviceDolittle = {
    applicationId: string;
    customerId: string;
    microserviceId: string;
};

export type MicroserviceIngressPath = {
    path: string;
    pathType: string;
};

export type MicroserviceSimple = {
    dolittle: MicroserviceDolittle;
    name: string;
    kind: string;
    environment: string;
    extra: MicroserviceSimpleExtra;
};

export type MicroserviceSimpleExtra = {
    headImage: string;
    runtimeImage: string;
    ingress: MicroserviceIngressPath;
    isPublic: boolean;
};

export type MicroserviceBusinessMomentAdaptor = {
    dolittle: MicroserviceDolittle;
    name: string;
    kind: string;
    environment: string;
    extra: MicroserviceBusinessMomentAdaptorExtra;
};

export type MicroserviceBusinessMomentAdaptorExtra = {
    headImage: string;
    runtimeImage: string;
    ingress: MicroserviceIngressPath;
    connector: MicroserviceBusinessMomentAdaptorConnector;
    moments: BusinessMoment[];
    entities: BusinessMomentEntity[];
};

export type MicroserviceBusinessMomentAdaptorConnector = {
    kind: string;
    config: ConnectorWebhookConfig;
};

export type BusinessMoment = {
    name: string;
    uuid: string;
    entityTypeId: string;
    embeddingCode: string;
    projectionCode: string;
};

export type BusinessMomentEntity = {
    name: string;
    entityTypeId: string;
    idNameForRetrival: string;
    filterCode: string;
    transformCode: string;
};

export type HttpResponseBusinessMoments = {
    applicationId: string;
    environment: string;
    moments: HttpInputBusinessMoment[];
    entities: HttpInputBusinessMomentEntity[];
};

export type HttpInputBusinessMoment = {
    applicationId: string;
    environment: string;
    microserviceId: string;
    moment: BusinessMoment;
};

export type HttpInputBusinessMomentEntity = {
    applicationId: string;
    environment: string;
    microserviceId: string;
    entity: BusinessMomentEntity;
};

export type MicroserviceRawDataLogIngestor = {
    dolittle: MicroserviceDolittle;
    name: string;
    kind: string;
    environment: string;
    extra: MicroserviceRawDataLogIngestorExtra;
};

export type MicroserviceRawDataLogIngestorExtra = {
    headImage: string;
    runtimeImage: string;
    ingress: MicroserviceIngressPath;
    webhooks: MicroserviceRawDataLogIngestorWebhookConfig[];
    webhookStatsAuthorization: string;
    writeTo: string;
};

export type MicroserviceRawDataLogIngestorWebhookConfig = {
    kind: string;
    uriSuffix: string;
    authorization: string;
    // TODO should we add the microservice that created it?
    // It could be optional
};
export type MicroservicePurchaseOrder = {
    dolittle: MicroserviceDolittle;
    name: string;
    kind: string;
    environment: string;
    extra: MicroservicePurchaseOrderExtra;
};

export type MicroservicePurchaseOrderExtra = {
    ingress: MicroserviceIngressPath;
    headImage: string;
    runtimeImage: string;
    webhooks: MicroserviceRawDataLogIngestorWebhookConfig[]; // TODO We either need to store the webhooks to rebuild
    rawDataLogName: string;
};

// We want to know the state when in this microservice.
// When in rawdatlog we want to know the webhooks.
// We want to be able to update the webhooks, to update the webhooks, we need to know which rawDatelog to update the webhooks.

/* Purchase Order API - Input
    LOG_LEVEL: debug
    DATABASE_READMODELS_URL: "mongodb://dev-mongo.application-1649ad53-5200-4a42-bcd5-7d559e0eefd4.svc.cluster.local"
    DATABASE_READMODELS_NAME: "supplier_portal_dev_poapi_readmodels"
    NODE_ENV: "development"
    TENANT: "4d9bb23e-aa88-4be2-9dbd-f0bb3932e9d6"
    SERVER_PORT: "8080"
    NATS_CLUSTER_URL: "dev-rawdatalogv1-nats.application-1649ad53-5200-4a42-bcd5-7d559e0eefd4.svc.cluster.local:4222"
    NATS_START_FROM_BEGINNING: "false"
    LOG_OUTPUT_FORMAT: json

    https://github.com/dolittle/platform-api/blob/main/pkg/platform/doc.go
    https://github.com/dolittle/platform-api/blob/main/pkg/platform/doc.go#L197-L204 copy and paste to reflect the above

*/
