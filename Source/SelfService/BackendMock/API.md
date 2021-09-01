# A list of the API endpoints we need to mock

## GET

### Get the applications http://localhost:9007/selfservice/api/applications

Returns JSON:

```json
{
    "id": "508c1745-5f2a-4b4c-b7a5-2fbb1484346d",
    "name": "Dolittle",
    "applications": [
        {
            "name": "Sentry",
            "environment": "Prod",
            "id": "215daeda-b2c7-4c8e-a305-586eb779733b"
        },
        {
            "name": "OCFEV",
            "environment": "Prod",
            "id": "9d30c634-c540-4202-8bcd-9e960f369c42"
        },
        {
            "name": "Studio",
            "environment": "Dev",
            "id": "fe7736bb-57fc-4166-bb91-6954f4dd4eb7"
        },
        {
            "name": "Studio",
            "environment": "Prod",
            "id": "fe7736bb-57fc-4166-bb91-6954f4dd4eb7"
        }
    ]
}
```

### Gets live applications http://localhost:9007/selfservice/api/live/applications

Returns JSON:

```json
{
    "id": "453e04a7-4f9d-42f2-b36c-d51fa2c83fa3",
    "name": "Customer-Chris",
    "applications": [
        {
            "name": "Taco",
            "environment": "Dev",
            "id": "11b6cf47-5d9f-438f-8116-0d9828654657"
        }
    ]
}
```

### Gets all microservices in an application http://localhost:9007/selfservice/api/application/{applicationID}/microservices

Returns JSON:

```json
[
    {
        "dolittle": {
            "applicationId": "11b6cf47-5d9f-438f-8116-0d9828654657",
            "tenantId": "453e04a7-4f9d-42f2-b36c-d51fa2c83fa3",
            "microserviceId": "70899a1b-5d80-6f4a-aa9f-3a144953f3e6"
        },
        "name": "RawDataLogIngestor",
        "kind": "raw-data-log-ingestor",
        "environment": "Dev",
        "extra": {
            "headImage": "453e04a74f9d42f2b36cd51fa2c83fa3.azurecr.io/dolittle/platform/platform-api:dev-x",
            "ingress": {
                "domainPrefix": "freshteapot-taco",
                "host": "freshteapot-taco.dolittle.cloud",
                "path": "/api/webhooks",
                "pathType": "Prefix",
                "secretNamePrefix": ""
            },
            "runtimeImage": "dolittle/runtime:5.6.0",
            "webhookStatsAuthorization": "Bearer TODO",
            "webhooks": [
                {
                    "authorization": "Basic am9objpjYXI=",
                    "kind": "m3/headline",
                    "uriSuffix": "m3/headline"
                },
                {
                    "authorization": "Bearer BubblegumPink",
                    "kind": "favouriteColour",
                    "uriSuffix": "favourite/colour"
                },
                {
                    "authorization": "",
                    "kind": "",
                    "uriSuffix": ""
                }
            ],
            "writeTo": "nats"
        }
    },
    {
        "dolittle": {
            "applicationId": "11b6cf47-5d9f-438f-8116-0d9828654657",
            "tenantId": "453e04a7-4f9d-42f2-b36c-d51fa2c83fa3",
            "microserviceId": "83d7569c-9142-fa4b-b9f9-aee40c2e7718"
        },
        "name": "Webhook-101",
        "kind": "business-moments-adaptor",
        "environment": "Dev",
        "extra": {
            "connector": {
                "config": {
                    "config": {
                        "password": "johncarmack",
                        "username": "m3"
                    },
                    "kind": "basic"
                },
                "kind": "webhook"
            },
            "entities": [],
            "headImage": "453e04a74f9d42f2b36cd51fa2c83fa3.azurecr.io/businessmomentsadaptor:latest",
            "ingress": {
                "domainPrefix": "freshteapot-taco",
                "host": "freshteapot-taco.dolittle.cloud",
                "path": "/api/webhooks-ingestor",
                "pathType": "Prefix",
                "secretNamePrefix": ""
            },
            "moments": [],
            "runtimeImage": "dolittle/runtime:5.6.0"
        }
    }
]
```

### Get application with microservices http://localhost:9007/selfservice/api/live/application/{applicationID}/microservices

Returns JSON:

```json
{
    "application": {
        "name": "Taco",
        "id": "11b6cf47-5d9f-438f-8116-0d9828654657"
    },
    "microservices": [
        {
            "name": "FavouriteColour",
            "environment": "Dev",
            "id": "ee581646-9ba8-524d-8bbe-7d570a257aa0",
            "images": [
                {
                    "image": "453e04a74f9d42f2b36cd51fa2c83fa3.azurecr.io/dolittle/nats-reader:favouritecolour",
                    "name": "head"
                }
            ]
        },
        {
            "name": "Order",
            "environment": "Dev",
            "id": "9f6a613f-d969-4938-a1ac-5b7df199bc39",
            "images": [
                {
                    "image": "453e04a74f9d42f2b36cd51fa2c83fa3.azurecr.io/taco/order:1.0.6",
                    "name": "head"
                },
                {
                    "image": "dolittle/runtime:5.3.3",
                    "name": "runtime"
                }
            ]
        },
    ]
}
```

### Get application with environments and microservices http://localhost:9007/selfservice/api/application/{applicationID}

Returns JSON:

```json
{
    "id": "11b6cf47-5d9f-438f-8116-0d9828654657",
    "name": "Taco",
    "tenantId": "453e04a7-4f9d-42f2-b36c-d51fa2c83fa3",
    "environments": [
        {
            "name": "Dev",
            "domainPrefix": "freshteapot-taco",
            "host": "freshteapot-taco.dolittle.cloud",
            "tenantId": "453e04a7-4f9d-42f2-b36c-d51fa2c83fa3",
            "applicationId": "11b6cf47-5d9f-438f-8116-0d9828654657",
            "automationEnabled": true
        }
    ],
    "microservices": [
        {
            "dolittle": {
                "applicationId": "11b6cf47-5d9f-438f-8116-0d9828654657",
                "tenantId": "453e04a7-4f9d-42f2-b36c-d51fa2c83fa3",
                "microserviceId": "70899a1b-5d80-6f4a-aa9f-3a144953f3e6"
            },
            "name": "RawDataLogIngestor",
            "kind": "raw-data-log-ingestor",
            "environment": "Dev",
            "extra": {
                "headImage": "453e04a74f9d42f2b36cd51fa2c83fa3.azurecr.io/dolittle/platform/platform-api:dev-x",
                "ingress": {
                    "domainPrefix": "freshteapot-taco",
                    "host": "freshteapot-taco.dolittle.cloud",
                    "path": "/api/webhooks",
                    "pathType": "Prefix",
                    "secretNamePrefix": ""
                },
                "runtimeImage": "dolittle/runtime:5.6.0",
                "webhookStatsAuthorization": "Bearer TODO",
                "webhooks": [
                    {
                        "authorization": "Basic am9objpjYXI=",
                        "kind": "m3/headline",
                        "uriSuffix": "m3/headline"
                    },
                    {
                        "authorization": "Bearer BubblegumPink",
                        "kind": "favouriteColour",
                        "uriSuffix": "favourite/colour"
                    },
                    {
                        "authorization": "",
                        "kind": "",
                        "uriSuffix": ""
                    }
                ],
                "writeTo": "nats"
            }
        },
    ]
}
```


### Get pod status http://localhost:9007/selfservice/api/live/application/{applicationId}/environment/{environment}/microservice/{microserviceId}/podstatus

Returns JSON:

```json
{
    "namespace": "application-11b6cf47-5d9f-438f-8116-0d9828654657",
    "microservice": {
        "name": "RawDataLogIngestor",
        "id": "70899a1b-5d80-6f4a-aa9f-3a144953f3e6"
    },
    "pods": [
        {
            "name": "dev-rawdatalogingestor-6dd8999646-dnsl7",
            "phase": "Running",
            "containers": [
                {
                    "image": "388c0cc724b246a78735b583ce21e01b.azurecr.io/dolittle/platform/platform-api:dev-x",
                    "name": "head",
                    "age": "1130h17m40.950472455s",
                    "state": "running",
                    "started": "2021-07-16 11:29:04 +0000 UTC",
                    "restarts": 0
                }
            ]
        }
    ]
}
```

### Get pod logs http://localhost:9007/selfservice/api/live/application/{applicationId}/pod/{podName}/logs

Returns JSON:

```json
{
    "applicationId": "11b6cf47-5d9f-438f-8116-0d9828654657",
    "microserviceId": "TODO",
    "podName": "dev-rawdatalogingestor-6dd8999646-dnsl7",
    "logs": ""
}
```

## POST

### Save microservice http://localhost:9007/selfservice/api/microservice

Body JSON:

```json
{
    "dolittle": {
        "applicationId": "application id",
        "tenantId": "tenant",
        "microserviceId": "microservice",
    },
    "name": "microservice name",
    "kind": "microservice kind",
    "environment": "environment",
    "extra": {
        "headImage": "image",
        "runtimeImage": "image",
        "ingress": {
            "path": "path",
            "host": "host",
            "pathType": "pathType",
            "domainPrefix": "domainPrefix"
        }
    }
}
```

Response:

```json
{
    //TODO Figure out what this is
}
```

## Delete

### Deletes a microservice http://localhost:9007/selfservice/api/application/{applicationId}/environment/{environment}/microservice/{microserviceId}

Response:

```json
{
    //TODO Figure out what this is
}
``´

## Platform API routes to document

```go
router.Handle("/microservice", stdChainWithJSON.ThenFunc(microserviceService.Create)).Methods("POST", "OPTIONS")
router.Handle("/application", stdChainWithJSON.ThenFunc(applicationService.Create)).Methods("POST", "OPTIONS")
router.Handle("/tenant", stdChainWithJSON.ThenFunc(tenantService.Create)).Methods("POST", "OPTIONS")
router.Handle("/environment", stdChainWithJSON.ThenFunc(applicationService.SaveEnvironment)).Methods("POST", "OPTIONS")

router.Handle("/application/{applicationID}/environment", stdChainWithJSON.ThenFunc(applicationService.SaveEnvironment)).Methods("POST", "OPTIONS")
router.Handle("/application/{applicationID}/microservices", stdChainWithJSON.ThenFunc(microserviceService.GetByApplicationID)).Methods("GET", "OPTIONS") // DOCUMENTED
router.Handle("/application/{applicationID}", stdChainWithJSON.ThenFunc(applicationService.GetByID)).Methods("GET", "OPTIONS") // DOCUMENTED
router.Handle("/applications", stdChainWithJSON.ThenFunc(applicationService.GetApplications)).Methods("GET", "OPTIONS") // DOCUMENTED
router.Handle("/application/{applicationID}/personalised-application-info", stdChainWithJSON.ThenFunc(applicationService.GetPersonalisedInfo)).Methods("GET", "OPTIONS")

router.Handle("/application/{applicationID}/environment/{environment}/microservice/{microserviceID}", stdChainWithJSON.ThenFunc(microserviceService.GetByID)).Methods("GET", "OPTIONS")
router.Handle("/application/{applicationID}/environment/{environment}/microservice/{microserviceID}", stdChainWithJSON.ThenFunc(microserviceService.Delete)).Methods("DELETE", "OPTIONS") // DOCUMENTED

router.Handle("/live/applications", stdChainWithJSON.ThenFunc(applicationService.GetLiveApplications)).Methods("GET", "OPTIONS") // DOCUMENTED
router.Handle("/live/application/{applicationID}/microservices", stdChainWithJSON.ThenFunc(microserviceService.GetLiveByApplicationID)).Methods("GET", "OPTIONS") // DOCUMENTED
router.Handle("/live/application/{applicationID}/environment/{environment}/microservice/{microserviceID}/podstatus", stdChainWithJSON.ThenFunc(microserviceService.GetPodStatus)).Methods("GET", "OPTIONS")
router.Handle("/live/application/{applicationID}/pod/{podName}/logs", stdChainBase.ThenFunc(microserviceService.GetPodLogs)).Methods("GET", "OPTIONS")
router.Handle("/live/application/{applicationID}/configmap/{configMapName}", stdChainBase.ThenFunc(microserviceService.GetConfigMap)).Methods("GET", "OPTIONS")
router.Handle("/live/application/{applicationID}/secret/{secretName}", stdChainBase.ThenFunc(microserviceService.GetSecret)).Methods("GET", "OPTIONS")

router.Handle("/live/application/{applicationID}/environment/{environment}/insights/runtime-v1", stdChainWithJSON.ThenFunc(insightsService.GetRuntimeV1)).Methods("GET", "OPTIONS")
router.Handle("/live/insights/loki/api/v1/query_range", stdChainWithJSON.ThenFunc(insightsService.ProxyLoki)).Methods("GET", "OPTIONS")

// kubectl auth can-i list pods --namespace application-11b6cf47-5d9f-438f-8116-0d9828654657 --as be194a45-24b4-4911-9c8d-37125d132b0b --as-group cc3d1c06-ffeb-488c-8b90-a4536c3e6dfa
router.Handle("/test/can-i", stdChainWithJSON.ThenFunc(microserviceService.CanI)).Methods("POST")

// dev-web-adpator.application-{applicationID}.svc.local - kubernetes
// Lookup service not
router.Handle("/application/{applicationID}/environment/{environment}/businessmomentsadaptor/{microserviceID}/save", stdChainWithJSON.ThenFunc(microserviceService.BusinessMomentsAdaptorSave)).Methods("POST", "OPTIONS")
router.Handle("/application/{applicationID}/environment/{environment}/businessmomentsadaptor/{microserviceID}/rawdata", stdChainWithJSON.ThenFunc(microserviceService.BusinessMomentsAdaptorRawData)).Methods("GET", "OPTIONS")
router.Handle("/application/{applicationID}/environment/{environment}/businessmomentsadaptor/{microserviceID}/sync", stdChainWithJSON.ThenFunc(microserviceService.BusinessMomentsAdaptorSync)).Methods("GET", "OPTIONS")

router.Handle(
    "/businessmomententity",
    stdChainWithJSON.ThenFunc(businessMomentsService.SaveEntity),
).Methods("POST", "OPTIONS")

router.Handle(
    "/businessmoment",
    stdChainWithJSON.ThenFunc(businessMomentsService.SaveMoment),
).Methods("POST", "OPTIONS")
router.Handle(
    "/application/{applicationID}/environment/{environment}/businessmoments",
    stdChainWithJSON.ThenFunc(businessMomentsService.GetMoments),
).Methods("GET", "OPTIONS")

router.Handle(
    "/application/{applicationID}/environment/{environment}/businessmoments/microservice/{microserviceID}/entity/{entityID}",
    stdChainWithJSON.ThenFunc(businessMomentsService.DeleteEntity),
).Methods("DELETE", "OPTIONS")

router.Handle(
    "/application/{applicationID}/environment/{environment}/businessmoments/microservice/{microserviceID}/moment/{momentID}",
    stdChainWithJSON.ThenFunc(businessMomentsService.DeleteMoment),
).Methods("DELETE", "OPTIONS")

router.Handle("/backups/logs/latest/by/app/{applicationID}/{environment}", stdChainWithJSON.ThenFunc(backupService.GetLatestByApplication)).Methods("GET", "OPTIONS")
router.Handle("/backups/logs/link", stdChainWithJSON.ThenFunc(backupService.CreateLink)).Methods("POST", "OPTIONS")
```
