/* tslint:disable */
/* eslint-disable */
/**
 * Dolittle.Bridge.M3
 * Bridge API - made for Dolittle Studio
 *
 * The version of the OpenAPI document: 1.0.0.0
 * Contact: dolittle@dolittle.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as runtime from '../runtime';
import type {
  ConnectionConfigurationResult,
  ConnectionModelArrayResult,
  ConnectionModelResult,
  IonConfigRequest,
  IonConfigurationResult,
  MdpConfigurationResult,
  MetadataPublisherConfigRequest,
  ProblemDetails,
  StringResult,
} from '../models';
import {
    ConnectionConfigurationResultFromJSON,
    ConnectionConfigurationResultToJSON,
    ConnectionModelArrayResultFromJSON,
    ConnectionModelArrayResultToJSON,
    ConnectionModelResultFromJSON,
    ConnectionModelResultToJSON,
    IonConfigRequestFromJSON,
    IonConfigRequestToJSON,
    IonConfigurationResultFromJSON,
    IonConfigurationResultToJSON,
    MdpConfigurationResultFromJSON,
    MdpConfigurationResultToJSON,
    MetadataPublisherConfigRequestFromJSON,
    MetadataPublisherConfigRequestToJSON,
    ProblemDetailsFromJSON,
    ProblemDetailsToJSON,
    StringResultFromJSON,
    StringResultToJSON,
} from '../models';

export interface ConnectionsIdConfigurationGetRequest {
    id: string;
}

export interface ConnectionsIdConfigurationIonGetRequest {
    id: string;
}

export interface ConnectionsIdConfigurationIonPostRequest {
    id: string;
    ionConfigRequest?: IonConfigRequest;
}

export interface ConnectionsIdConfigurationMdpGetRequest {
    id: string;
}

export interface ConnectionsIdConfigurationMdpPostRequest {
    id: string;
    metadataPublisherConfigRequest?: MetadataPublisherConfigRequest;
}

export interface ConnectionsIdDeployCloudPostRequest {
    id: string;
}

export interface ConnectionsIdDeployOnPremisesPostRequest {
    id: string;
}

export interface ConnectionsIdGetRequest {
    id: string;
}

export interface ConnectionsIdNamePostRequest {
    id: string;
    body: string;
}

export interface ConnectionsIdPostRequest {
    id: string;
    body?: string;
}

export interface ConnectionsIdSimulateConnectionIonFailurePutRequest {
    id: string;
}

export interface ConnectionsIdSimulateConnectionIonSuccessPutRequest {
    id: string;
}

export interface ConnectionsIdSimulateConnectionMdpFailurePutRequest {
    id: string;
}

export interface ConnectionsIdSimulateConnectionMdpSuccessPutRequest {
    id: string;
}

export interface ConnectionsIdSimulateDeployAlivePutRequest {
    id: string;
}

/**
 * 
 */
export class ConnectionsApi extends runtime.BaseAPI {

    /**
     * GET all the connections the Bridge API knows about for the current  user/tenant/customer
     */
    async connectionsGetRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ConnectionModelArrayResult>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/connections`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ConnectionModelArrayResultFromJSON(jsonValue));
    }

    /**
     * GET all the connections the Bridge API knows about for the current  user/tenant/customer
     */
    async connectionsGet(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ConnectionModelArrayResult> {
        const response = await this.connectionsGetRaw(initOverrides);
        return await response.value();
    }

    /**
     * GET the configuration for a connection. Will include configurations of  different kinds that together make up the whole connection to M3.
     */
    async connectionsIdConfigurationGetRaw(requestParameters: ConnectionsIdConfigurationGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ConnectionConfigurationResult>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling connectionsIdConfigurationGet.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/connections/{id}/configuration`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ConnectionConfigurationResultFromJSON(jsonValue));
    }

    /**
     * GET the configuration for a connection. Will include configurations of  different kinds that together make up the whole connection to M3.
     */
    async connectionsIdConfigurationGet(requestParameters: ConnectionsIdConfigurationGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ConnectionConfigurationResult> {
        const response = await this.connectionsIdConfigurationGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * GET the Intelligent Open Network (ION) configuration for the connection
     */
    async connectionsIdConfigurationIonGetRaw(requestParameters: ConnectionsIdConfigurationIonGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<IonConfigurationResult>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling connectionsIdConfigurationIonGet.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/connections/{id}/configuration/ion`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => IonConfigurationResultFromJSON(jsonValue));
    }

    /**
     * GET the Intelligent Open Network (ION) configuration for the connection
     */
    async connectionsIdConfigurationIonGet(requestParameters: ConnectionsIdConfigurationIonGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<IonConfigurationResult> {
        const response = await this.connectionsIdConfigurationIonGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * POST to this resource to configure Intelligent Open Network (ION) for the  connection. ION is a gateway into M3 that the deployed Bridge -services use  to communicate with M3. Without this the Bridge will not work.
     */
    async connectionsIdConfigurationIonPostRaw(requestParameters: ConnectionsIdConfigurationIonPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<IonConfigurationResult>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling connectionsIdConfigurationIonPost.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/connections/{id}/configuration/ion`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: IonConfigRequestToJSON(requestParameters.ionConfigRequest),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => IonConfigurationResultFromJSON(jsonValue));
    }

    /**
     * POST to this resource to configure Intelligent Open Network (ION) for the  connection. ION is a gateway into M3 that the deployed Bridge -services use  to communicate with M3. Without this the Bridge will not work.
     */
    async connectionsIdConfigurationIonPost(requestParameters: ConnectionsIdConfigurationIonPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<IonConfigurationResult> {
        const response = await this.connectionsIdConfigurationIonPostRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * GET the Metadata Publisher (MDP) configuration for the connection
     */
    async connectionsIdConfigurationMdpGetRaw(requestParameters: ConnectionsIdConfigurationMdpGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<MdpConfigurationResult>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling connectionsIdConfigurationMdpGet.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/connections/{id}/configuration/mdp`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => MdpConfigurationResultFromJSON(jsonValue));
    }

    /**
     * GET the Metadata Publisher (MDP) configuration for the connection
     */
    async connectionsIdConfigurationMdpGet(requestParameters: ConnectionsIdConfigurationMdpGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<MdpConfigurationResult> {
        const response = await this.connectionsIdConfigurationMdpGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * POST to this resource to configure the Metadata Publisher (MDP) for the  connection. The MDP service is gives the Bridge API insight into the tables,  fields, programs and environments in the M3 -instance.
     */
    async connectionsIdConfigurationMdpPostRaw(requestParameters: ConnectionsIdConfigurationMdpPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<MdpConfigurationResult>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling connectionsIdConfigurationMdpPost.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/connections/{id}/configuration/mdp`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: MetadataPublisherConfigRequestToJSON(requestParameters.metadataPublisherConfigRequest),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => MdpConfigurationResultFromJSON(jsonValue));
    }

    /**
     * POST to this resource to configure the Metadata Publisher (MDP) for the  connection. The MDP service is gives the Bridge API insight into the tables,  fields, programs and environments in the M3 -instance.
     */
    async connectionsIdConfigurationMdpPost(requestParameters: ConnectionsIdConfigurationMdpPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<MdpConfigurationResult> {
        const response = await this.connectionsIdConfigurationMdpPostRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * * POST to this resource to deploy to the cloud  *
     */
    async connectionsIdDeployCloudPostRaw(requestParameters: ConnectionsIdDeployCloudPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ConnectionModelResult>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling connectionsIdDeployCloudPost.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/connections/{id}/deploy/cloud`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ConnectionModelResultFromJSON(jsonValue));
    }

    /**
     * * POST to this resource to deploy to the cloud  *
     */
    async connectionsIdDeployCloudPost(requestParameters: ConnectionsIdDeployCloudPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ConnectionModelResult> {
        const response = await this.connectionsIdDeployCloudPostRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * * POST to this resource to register deployment on premises. This is NOT  * the url to download the connector-bundle.  *
     */
    async connectionsIdDeployOnPremisesPostRaw(requestParameters: ConnectionsIdDeployOnPremisesPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ConnectionModelResult>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling connectionsIdDeployOnPremisesPost.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/connections/{id}/deploy/on-premises`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ConnectionModelResultFromJSON(jsonValue));
    }

    /**
     * * POST to this resource to register deployment on premises. This is NOT  * the url to download the connector-bundle.  *
     */
    async connectionsIdDeployOnPremisesPost(requestParameters: ConnectionsIdDeployOnPremisesPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ConnectionModelResult> {
        const response = await this.connectionsIdDeployOnPremisesPostRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * GET one specific connection
     */
    async connectionsIdGetRaw(requestParameters: ConnectionsIdGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ConnectionModelResult>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling connectionsIdGet.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/connections/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ConnectionModelResultFromJSON(jsonValue));
    }

    /**
     * GET one specific connection
     */
    async connectionsIdGet(requestParameters: ConnectionsIdGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ConnectionModelResult> {
        const response = await this.connectionsIdGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * POST to this resource to set the name of a connection
     */
    async connectionsIdNamePostRaw(requestParameters: ConnectionsIdNamePostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<StringResult>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling connectionsIdNamePost.');
        }

        if (requestParameters.body === null || requestParameters.body === undefined) {
            throw new runtime.RequiredError('body','Required parameter requestParameters.body was null or undefined when calling connectionsIdNamePost.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/connections/{id}/name`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: requestParameters.body as any,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => StringResultFromJSON(jsonValue));
    }

    /**
     * POST to this resource to set the name of a connection
     */
    async connectionsIdNamePost(requestParameters: ConnectionsIdNamePostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<StringResult> {
        const response = await this.connectionsIdNamePostRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * POST to this resources to register a connection. This connection can then  be configured, deployed and will hold mappings.
     */
    async connectionsIdPostRaw(requestParameters: ConnectionsIdPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ConnectionModelResult>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling connectionsIdPost.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/connections/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: requestParameters.body as any,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ConnectionModelResultFromJSON(jsonValue));
    }

    /**
     * POST to this resources to register a connection. This connection can then  be configured, deployed and will hold mappings.
     */
    async connectionsIdPost(requestParameters: ConnectionsIdPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ConnectionModelResult> {
        const response = await this.connectionsIdPostRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * PUT on this resource to simulate ION connection-failure
     */
    async connectionsIdSimulateConnectionIonFailurePutRaw(requestParameters: ConnectionsIdSimulateConnectionIonFailurePutRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ConnectionModelResult>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling connectionsIdSimulateConnectionIonFailurePut.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/connections/{id}/simulate/connection/ion/failure`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ConnectionModelResultFromJSON(jsonValue));
    }

    /**
     * PUT on this resource to simulate ION connection-failure
     */
    async connectionsIdSimulateConnectionIonFailurePut(requestParameters: ConnectionsIdSimulateConnectionIonFailurePutRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ConnectionModelResult> {
        const response = await this.connectionsIdSimulateConnectionIonFailurePutRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * PUT on this resource to simulate ION connection-success
     */
    async connectionsIdSimulateConnectionIonSuccessPutRaw(requestParameters: ConnectionsIdSimulateConnectionIonSuccessPutRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ConnectionModelResult>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling connectionsIdSimulateConnectionIonSuccessPut.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/connections/{id}/simulate/connection/ion/success`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ConnectionModelResultFromJSON(jsonValue));
    }

    /**
     * PUT on this resource to simulate ION connection-success
     */
    async connectionsIdSimulateConnectionIonSuccessPut(requestParameters: ConnectionsIdSimulateConnectionIonSuccessPutRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ConnectionModelResult> {
        const response = await this.connectionsIdSimulateConnectionIonSuccessPutRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * PUT on this resource to simulate the Metadata Publisher reporting  connection-failure
     */
    async connectionsIdSimulateConnectionMdpFailurePutRaw(requestParameters: ConnectionsIdSimulateConnectionMdpFailurePutRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ConnectionModelResult>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling connectionsIdSimulateConnectionMdpFailurePut.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/connections/{id}/simulate/connection/mdp/failure`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ConnectionModelResultFromJSON(jsonValue));
    }

    /**
     * PUT on this resource to simulate the Metadata Publisher reporting  connection-failure
     */
    async connectionsIdSimulateConnectionMdpFailurePut(requestParameters: ConnectionsIdSimulateConnectionMdpFailurePutRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ConnectionModelResult> {
        const response = await this.connectionsIdSimulateConnectionMdpFailurePutRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * PUT on this resource to simulate the Metadata Publisher reporting  connection-success
     */
    async connectionsIdSimulateConnectionMdpSuccessPutRaw(requestParameters: ConnectionsIdSimulateConnectionMdpSuccessPutRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ConnectionModelResult>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling connectionsIdSimulateConnectionMdpSuccessPut.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/connections/{id}/simulate/connection/mdp/success`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ConnectionModelResultFromJSON(jsonValue));
    }

    /**
     * PUT on this resource to simulate the Metadata Publisher reporting  connection-success
     */
    async connectionsIdSimulateConnectionMdpSuccessPut(requestParameters: ConnectionsIdSimulateConnectionMdpSuccessPutRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ConnectionModelResult> {
        const response = await this.connectionsIdSimulateConnectionMdpSuccessPutRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * PUT to this resource to deploy to the cloud - this is for simulation purposes
     */
    async connectionsIdSimulateDeployAlivePutRaw(requestParameters: ConnectionsIdSimulateDeployAlivePutRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ConnectionModelResult>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling connectionsIdSimulateDeployAlivePut.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/connections/{id}/simulate/deploy/alive`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ConnectionModelResultFromJSON(jsonValue));
    }

    /**
     * PUT to this resource to deploy to the cloud - this is for simulation purposes
     */
    async connectionsIdSimulateDeployAlivePut(requestParameters: ConnectionsIdSimulateDeployAlivePutRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ConnectionModelResult> {
        const response = await this.connectionsIdSimulateDeployAlivePutRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
