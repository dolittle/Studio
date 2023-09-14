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
  ProgramDetails,
  ProgramHeader,
} from '../models/index';
import {
    ProgramDetailsFromJSON,
    ProgramDetailsToJSON,
    ProgramHeaderFromJSON,
    ProgramHeaderToJSON,
} from '../models/index';

export interface ConnectionsIdMetadataEnvironmentsEnvironmentProgramsGetRequest {
    id: string;
    environment: string;
}

export interface ConnectionsIdMetadataEnvironmentsEnvironmentProgramsProgramGetRequest {
    id: string;
    environment: string;
    program: string;
}

/**
 * 
 */
export class ProgramMetadataApi extends runtime.BaseAPI {

    /**
     */
    async connectionsIdMetadataEnvironmentsEnvironmentProgramsGetRaw(requestParameters: ConnectionsIdMetadataEnvironmentsEnvironmentProgramsGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<ProgramHeader>>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling connectionsIdMetadataEnvironmentsEnvironmentProgramsGet.');
        }

        if (requestParameters.environment === null || requestParameters.environment === undefined) {
            throw new runtime.RequiredError('environment','Required parameter requestParameters.environment was null or undefined when calling connectionsIdMetadataEnvironmentsEnvironmentProgramsGet.');
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
            path: `/connections/{id}/metadata/environments/{environment}/programs`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))).replace(`{${"environment"}}`, encodeURIComponent(String(requestParameters.environment))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(ProgramHeaderFromJSON));
    }

    /**
     */
    async connectionsIdMetadataEnvironmentsEnvironmentProgramsGet(requestParameters: ConnectionsIdMetadataEnvironmentsEnvironmentProgramsGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<ProgramHeader>> {
        const response = await this.connectionsIdMetadataEnvironmentsEnvironmentProgramsGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async connectionsIdMetadataEnvironmentsEnvironmentProgramsProgramGetRaw(requestParameters: ConnectionsIdMetadataEnvironmentsEnvironmentProgramsProgramGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<ProgramDetails>>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling connectionsIdMetadataEnvironmentsEnvironmentProgramsProgramGet.');
        }

        if (requestParameters.environment === null || requestParameters.environment === undefined) {
            throw new runtime.RequiredError('environment','Required parameter requestParameters.environment was null or undefined when calling connectionsIdMetadataEnvironmentsEnvironmentProgramsProgramGet.');
        }

        if (requestParameters.program === null || requestParameters.program === undefined) {
            throw new runtime.RequiredError('program','Required parameter requestParameters.program was null or undefined when calling connectionsIdMetadataEnvironmentsEnvironmentProgramsProgramGet.');
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
            path: `/connections/{id}/metadata/environments/{environment}/programs/{program}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))).replace(`{${"environment"}}`, encodeURIComponent(String(requestParameters.environment))).replace(`{${"program"}}`, encodeURIComponent(String(requestParameters.program))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(ProgramDetailsFromJSON));
    }

    /**
     */
    async connectionsIdMetadataEnvironmentsEnvironmentProgramsProgramGet(requestParameters: ConnectionsIdMetadataEnvironmentsEnvironmentProgramsProgramGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<ProgramDetails>> {
        const response = await this.connectionsIdMetadataEnvironmentsEnvironmentProgramsProgramGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
