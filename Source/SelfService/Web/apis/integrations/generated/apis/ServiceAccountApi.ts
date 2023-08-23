/* tslint:disable */
/* eslint-disable */
/**
 * Aigonix.Bridge.M3
 * Bridge API - made for Aigonix Studio
 *
 * The version of the OpenAPI document: 0.0.1.292
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as runtime from '../runtime';
import type {
  ServiceAccountCreatedDto,
  ServiceAccountListDto,
} from '../models/index';
import {
    ServiceAccountCreatedDtoFromJSON,
    ServiceAccountCreatedDtoToJSON,
    ServiceAccountListDtoFromJSON,
    ServiceAccountListDtoToJSON,
} from '../models/index';

export interface ConnectionsIdServiceAccountsGetRequest {
    id: string;
}

export interface ConnectionsIdServiceAccountsServiceAccountNameDeleteRequest {
    id: string;
    serviceAccountName: string;
}

export interface ConnectionsIdServiceAccountsServiceAccountNamePostRequest {
    id: string;
    serviceAccountName: string;
    description?: string;
}

/**
 * 
 */
export class ServiceAccountApi extends runtime.BaseAPI {

    /**
     * List all read-model -service-accounts for a connection.
     */
    async connectionsIdServiceAccountsGetRaw(requestParameters: ConnectionsIdServiceAccountsGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<ServiceAccountListDto>>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling connectionsIdServiceAccountsGet.');
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
            path: `/connections/{id}/serviceAccounts`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(ServiceAccountListDtoFromJSON));
    }

    /**
     * List all read-model -service-accounts for a connection.
     */
    async connectionsIdServiceAccountsGet(requestParameters: ConnectionsIdServiceAccountsGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<ServiceAccountListDto>> {
        const response = await this.connectionsIdServiceAccountsGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Delete a given service account for a connection
     */
    async connectionsIdServiceAccountsServiceAccountNameDeleteRaw(requestParameters: ConnectionsIdServiceAccountsServiceAccountNameDeleteRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling connectionsIdServiceAccountsServiceAccountNameDelete.');
        }

        if (requestParameters.serviceAccountName === null || requestParameters.serviceAccountName === undefined) {
            throw new runtime.RequiredError('serviceAccountName','Required parameter requestParameters.serviceAccountName was null or undefined when calling connectionsIdServiceAccountsServiceAccountNameDelete.');
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
            path: `/connections/{id}/serviceAccounts/{serviceAccountName}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))).replace(`{${"serviceAccountName"}}`, encodeURIComponent(String(requestParameters.serviceAccountName))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Delete a given service account for a connection
     */
    async connectionsIdServiceAccountsServiceAccountNameDelete(requestParameters: ConnectionsIdServiceAccountsServiceAccountNameDeleteRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.connectionsIdServiceAccountsServiceAccountNameDeleteRaw(requestParameters, initOverrides);
    }

    /**
     * Create a service account for a connection to allow users and services to  use the read-model -service, and return the token.  Ensure to save the token, as it will not be retrievable later
     */
    async connectionsIdServiceAccountsServiceAccountNamePostRaw(requestParameters: ConnectionsIdServiceAccountsServiceAccountNamePostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ServiceAccountCreatedDto>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling connectionsIdServiceAccountsServiceAccountNamePost.');
        }

        if (requestParameters.serviceAccountName === null || requestParameters.serviceAccountName === undefined) {
            throw new runtime.RequiredError('serviceAccountName','Required parameter requestParameters.serviceAccountName was null or undefined when calling connectionsIdServiceAccountsServiceAccountNamePost.');
        }

        const queryParameters: any = {};

        if (requestParameters.description !== undefined) {
            queryParameters['description'] = requestParameters.description;
        }

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
            path: `/connections/{id}/serviceAccounts/{serviceAccountName}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))).replace(`{${"serviceAccountName"}}`, encodeURIComponent(String(requestParameters.serviceAccountName))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ServiceAccountCreatedDtoFromJSON(jsonValue));
    }

    /**
     * Create a service account for a connection to allow users and services to  use the read-model -service, and return the token.  Ensure to save the token, as it will not be retrievable later
     */
    async connectionsIdServiceAccountsServiceAccountNamePost(requestParameters: ConnectionsIdServiceAccountsServiceAccountNamePostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ServiceAccountCreatedDto> {
        const response = await this.connectionsIdServiceAccountsServiceAccountNamePostRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
