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
  ConnectionModelResult,
} from '../models/index';
import {
    ConnectionModelResultFromJSON,
    ConnectionModelResultToJSON,
} from '../models/index';

export interface ConnectionsIdControlResetPostRequest {
    id: string;
}

/**
 * 
 */
export class CommandApi extends runtime.BaseAPI {

    /**
     * POST to this resource to reset the connector exporter.  This will remove all exporter state, including data in topics and the entity cache in the exporter.  It will then re-export all configured message types from scratch
     */
    async connectionsIdControlResetPostRaw(requestParameters: ConnectionsIdControlResetPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ConnectionModelResult>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling connectionsIdControlResetPost.');
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
            path: `/connections/{id}/control/reset`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ConnectionModelResultFromJSON(jsonValue));
    }

    /**
     * POST to this resource to reset the connector exporter.  This will remove all exporter state, including data in topics and the entity cache in the exporter.  It will then re-export all configured message types from scratch
     */
    async connectionsIdControlResetPost(requestParameters: ConnectionsIdControlResetPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ConnectionModelResult> {
        const response = await this.connectionsIdControlResetPostRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
