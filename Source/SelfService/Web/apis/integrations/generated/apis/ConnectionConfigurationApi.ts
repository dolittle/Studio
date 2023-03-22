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
  ConnectionModelResult,
  IonConfigRequest,
  IonConfigurationResult,
  MdpConfigurationResult,
  MetadataPublisherConfigRequest,
  ProblemDetails,
} from '../models';
import {
    ConnectionConfigurationResultFromJSON,
    ConnectionConfigurationResultToJSON,
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

export interface ConnectionsIdConfigurationIonSimulateFailurePutRequest {
    id: string;
}

export interface ConnectionsIdConfigurationIonSimulateSuccessPutRequest {
    id: string;
}

export interface ConnectionsIdConfigurationMdpGetRequest {
    id: string;
}

export interface ConnectionsIdConfigurationMdpPostRequest {
    id: string;
    metadataPublisherConfigRequest?: MetadataPublisherConfigRequest;
}

export interface ConnectionsIdConfigurationMdpSimulateFailurePutRequest {
    id: string;
}

export interface ConnectionsIdConfigurationMdpSimulateSuccessPutRequest {
    id: string;
}

/**
 * 
 */
export class ConnectionConfigurationApi extends runtime.BaseAPI {

    /**
     * GET the configuration for a connection. Will include configurations of  different kinds that together make up the whole connection to M3.
     */
    async connectionsIdConfigurationGetRaw(requestParameters: ConnectionsIdConfigurationGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ConnectionConfigurationResult>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling connectionsIdConfigurationGet.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["X-Organization-Id"] = this.configuration.apiKey("X-Organization-Id"); // X-Organization-Id authentication
        }

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

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["X-Organization-Id"] = this.configuration.apiKey("X-Organization-Id"); // X-Organization-Id authentication
        }

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

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["X-Organization-Id"] = this.configuration.apiKey("X-Organization-Id"); // X-Organization-Id authentication
        }

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
     * PUT on this resource to simulate ION connection-failure
     */
    async connectionsIdConfigurationIonSimulateFailurePutRaw(requestParameters: ConnectionsIdConfigurationIonSimulateFailurePutRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ConnectionModelResult>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling connectionsIdConfigurationIonSimulateFailurePut.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["X-Organization-Id"] = this.configuration.apiKey("X-Organization-Id"); // X-Organization-Id authentication
        }

        const response = await this.request({
            path: `/connections/{id}/configuration/ion/simulate/failure`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ConnectionModelResultFromJSON(jsonValue));
    }

    /**
     * PUT on this resource to simulate ION connection-failure
     */
    async connectionsIdConfigurationIonSimulateFailurePut(requestParameters: ConnectionsIdConfigurationIonSimulateFailurePutRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ConnectionModelResult> {
        const response = await this.connectionsIdConfigurationIonSimulateFailurePutRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * PUT on this resource to simulate ION connection-success
     */
    async connectionsIdConfigurationIonSimulateSuccessPutRaw(requestParameters: ConnectionsIdConfigurationIonSimulateSuccessPutRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ConnectionModelResult>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling connectionsIdConfigurationIonSimulateSuccessPut.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["X-Organization-Id"] = this.configuration.apiKey("X-Organization-Id"); // X-Organization-Id authentication
        }

        const response = await this.request({
            path: `/connections/{id}/configuration/ion/simulate/success`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ConnectionModelResultFromJSON(jsonValue));
    }

    /**
     * PUT on this resource to simulate ION connection-success
     */
    async connectionsIdConfigurationIonSimulateSuccessPut(requestParameters: ConnectionsIdConfigurationIonSimulateSuccessPutRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ConnectionModelResult> {
        const response = await this.connectionsIdConfigurationIonSimulateSuccessPutRaw(requestParameters, initOverrides);
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

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["X-Organization-Id"] = this.configuration.apiKey("X-Organization-Id"); // X-Organization-Id authentication
        }

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

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["X-Organization-Id"] = this.configuration.apiKey("X-Organization-Id"); // X-Organization-Id authentication
        }

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
     * PUT on this resource to simulate the Metadata Publisher reporting  connection-failure
     */
    async connectionsIdConfigurationMdpSimulateFailurePutRaw(requestParameters: ConnectionsIdConfigurationMdpSimulateFailurePutRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ConnectionModelResult>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling connectionsIdConfigurationMdpSimulateFailurePut.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["X-Organization-Id"] = this.configuration.apiKey("X-Organization-Id"); // X-Organization-Id authentication
        }

        const response = await this.request({
            path: `/connections/{id}/configuration/mdp/simulate/failure`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ConnectionModelResultFromJSON(jsonValue));
    }

    /**
     * PUT on this resource to simulate the Metadata Publisher reporting  connection-failure
     */
    async connectionsIdConfigurationMdpSimulateFailurePut(requestParameters: ConnectionsIdConfigurationMdpSimulateFailurePutRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ConnectionModelResult> {
        const response = await this.connectionsIdConfigurationMdpSimulateFailurePutRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * PUT on this resource to simulate the Metadata Publisher reporting  connection-success
     */
    async connectionsIdConfigurationMdpSimulateSuccessPutRaw(requestParameters: ConnectionsIdConfigurationMdpSimulateSuccessPutRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ConnectionModelResult>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling connectionsIdConfigurationMdpSimulateSuccessPut.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["X-Organization-Id"] = this.configuration.apiKey("X-Organization-Id"); // X-Organization-Id authentication
        }

        const response = await this.request({
            path: `/connections/{id}/configuration/mdp/simulate/success`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ConnectionModelResultFromJSON(jsonValue));
    }

    /**
     * PUT on this resource to simulate the Metadata Publisher reporting  connection-success
     */
    async connectionsIdConfigurationMdpSimulateSuccessPut(requestParameters: ConnectionsIdConfigurationMdpSimulateSuccessPutRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ConnectionModelResult> {
        const response = await this.connectionsIdConfigurationMdpSimulateSuccessPutRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
