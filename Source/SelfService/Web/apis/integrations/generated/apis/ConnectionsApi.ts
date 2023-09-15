/* tslint:disable */
/* eslint-disable */
/**
 * Aigonix.Bridge.M3
 * Bridge API - made for Aigonix Studio
 *
 * The version of the OpenAPI document: 0.0.1.356
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as runtime from '../runtime';
import type {
  ConnectionModelArrayResult,
  ConnectionModelResult,
  ProblemDetails,
  StringResult,
} from '../models/index';
import {
    ConnectionModelArrayResultFromJSON,
    ConnectionModelArrayResultToJSON,
    ConnectionModelResultFromJSON,
    ConnectionModelResultToJSON,
    ProblemDetailsFromJSON,
    ProblemDetailsToJSON,
    StringResultFromJSON,
    StringResultToJSON,
} from '../models/index';

export interface ConnectionsIdConnectorDeploymentGetRequest {
    id: string;
}

export interface ConnectionsIdDeleteRequest {
    id: string;
}

export interface ConnectionsIdGetRequest {
    id: string;
}

export interface ConnectionsIdNameGetRequest {
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

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["X-Organization-Id"] = this.configuration.apiKey("X-Organization-Id"); // X-Organization-Id authentication
        }

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("Bearer", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
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
     * Get connector bundle for an on-premises deployment
     */
    async connectionsIdConnectorDeploymentGetRaw(requestParameters: ConnectionsIdConnectorDeploymentGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling connectionsIdConnectorDeploymentGet.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["X-Organization-Id"] = this.configuration.apiKey("X-Organization-Id"); // X-Organization-Id authentication
        }

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("Bearer", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/connections/{id}/connector-deployment`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Get connector bundle for an on-premises deployment
     */
    async connectionsIdConnectorDeploymentGet(requestParameters: ConnectionsIdConnectorDeploymentGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.connectionsIdConnectorDeploymentGetRaw(requestParameters, initOverrides);
    }

    /**
     * DELETE to this resource to delete the connection
     */
    async connectionsIdDeleteRaw(requestParameters: ConnectionsIdDeleteRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling connectionsIdDelete.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["X-Organization-Id"] = this.configuration.apiKey("X-Organization-Id"); // X-Organization-Id authentication
        }

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("Bearer", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/connections/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * DELETE to this resource to delete the connection
     */
    async connectionsIdDelete(requestParameters: ConnectionsIdDeleteRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.connectionsIdDeleteRaw(requestParameters, initOverrides);
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

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["X-Organization-Id"] = this.configuration.apiKey("X-Organization-Id"); // X-Organization-Id authentication
        }

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("Bearer", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
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
     * GET the name of the connection
     */
    async connectionsIdNameGetRaw(requestParameters: ConnectionsIdNameGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<StringResult>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling connectionsIdNameGet.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["X-Organization-Id"] = this.configuration.apiKey("X-Organization-Id"); // X-Organization-Id authentication
        }

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("Bearer", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/connections/{id}/name`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => StringResultFromJSON(jsonValue));
    }

    /**
     * GET the name of the connection
     */
    async connectionsIdNameGet(requestParameters: ConnectionsIdNameGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<StringResult> {
        const response = await this.connectionsIdNameGetRaw(requestParameters, initOverrides);
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

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["X-Organization-Id"] = this.configuration.apiKey("X-Organization-Id"); // X-Organization-Id authentication
        }

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("Bearer", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
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

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["X-Organization-Id"] = this.configuration.apiKey("X-Organization-Id"); // X-Organization-Id authentication
        }

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("Bearer", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
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

}
