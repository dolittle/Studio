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
  DescribedJqDto,
  NoSuchReadModelResult,
  ProblemDetails,
} from '../models';
import {
    DescribedJqDtoFromJSON,
    DescribedJqDtoToJSON,
    NoSuchReadModelResultFromJSON,
    NoSuchReadModelResultToJSON,
    ProblemDetailsFromJSON,
    ProblemDetailsToJSON,
} from '../models';

export interface ConnectionsIdMessageMappingsTablesTableMessagesMessageAssistantCreateDescriptionPostRequest {
    id: string;
    table: string;
    message: string;
    jqExpression: string;
}

export interface ConnectionsIdMessageMappingsTablesTableMessagesMessageAssistantCreateJqPostRequest {
    id: string;
    table: string;
    message: string;
    request: string;
}

/**
 * 
 */
export class JqAssistantApi extends runtime.BaseAPI {

    /**
     * Create a JQ predicate for a message mapping, based on a user\'s request
     */
    async connectionsIdMessageMappingsTablesTableMessagesMessageAssistantCreateDescriptionPostRaw(requestParameters: ConnectionsIdMessageMappingsTablesTableMessagesMessageAssistantCreateDescriptionPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<DescribedJqDto>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling connectionsIdMessageMappingsTablesTableMessagesMessageAssistantCreateDescriptionPost.');
        }

        if (requestParameters.table === null || requestParameters.table === undefined) {
            throw new runtime.RequiredError('table','Required parameter requestParameters.table was null or undefined when calling connectionsIdMessageMappingsTablesTableMessagesMessageAssistantCreateDescriptionPost.');
        }

        if (requestParameters.message === null || requestParameters.message === undefined) {
            throw new runtime.RequiredError('message','Required parameter requestParameters.message was null or undefined when calling connectionsIdMessageMappingsTablesTableMessagesMessageAssistantCreateDescriptionPost.');
        }

        if (requestParameters.jqExpression === null || requestParameters.jqExpression === undefined) {
            throw new runtime.RequiredError('jqExpression','Required parameter requestParameters.jqExpression was null or undefined when calling connectionsIdMessageMappingsTablesTableMessagesMessageAssistantCreateDescriptionPost.');
        }

        const queryParameters: any = {};

        if (requestParameters.jqExpression !== undefined) {
            queryParameters['jqExpression'] = requestParameters.jqExpression;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["X-Organization-Id"] = this.configuration.apiKey("X-Organization-Id"); // X-Organization-Id authentication
        }

        const response = await this.request({
            path: `/connections/{id}/message-mappings/tables/{table}/messages/{message}/assistant/createDescription`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))).replace(`{${"table"}}`, encodeURIComponent(String(requestParameters.table))).replace(`{${"message"}}`, encodeURIComponent(String(requestParameters.message))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => DescribedJqDtoFromJSON(jsonValue));
    }

    /**
     * Create a JQ predicate for a message mapping, based on a user\'s request
     */
    async connectionsIdMessageMappingsTablesTableMessagesMessageAssistantCreateDescriptionPost(requestParameters: ConnectionsIdMessageMappingsTablesTableMessagesMessageAssistantCreateDescriptionPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<DescribedJqDto> {
        const response = await this.connectionsIdMessageMappingsTablesTableMessagesMessageAssistantCreateDescriptionPostRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Create a JQ predicate for a message mapping, based on a user\'s request
     */
    async connectionsIdMessageMappingsTablesTableMessagesMessageAssistantCreateJqPostRaw(requestParameters: ConnectionsIdMessageMappingsTablesTableMessagesMessageAssistantCreateJqPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<DescribedJqDto>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling connectionsIdMessageMappingsTablesTableMessagesMessageAssistantCreateJqPost.');
        }

        if (requestParameters.table === null || requestParameters.table === undefined) {
            throw new runtime.RequiredError('table','Required parameter requestParameters.table was null or undefined when calling connectionsIdMessageMappingsTablesTableMessagesMessageAssistantCreateJqPost.');
        }

        if (requestParameters.message === null || requestParameters.message === undefined) {
            throw new runtime.RequiredError('message','Required parameter requestParameters.message was null or undefined when calling connectionsIdMessageMappingsTablesTableMessagesMessageAssistantCreateJqPost.');
        }

        if (requestParameters.request === null || requestParameters.request === undefined) {
            throw new runtime.RequiredError('request','Required parameter requestParameters.request was null or undefined when calling connectionsIdMessageMappingsTablesTableMessagesMessageAssistantCreateJqPost.');
        }

        const queryParameters: any = {};

        if (requestParameters.request !== undefined) {
            queryParameters['request'] = requestParameters.request;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["X-Organization-Id"] = this.configuration.apiKey("X-Organization-Id"); // X-Organization-Id authentication
        }

        const response = await this.request({
            path: `/connections/{id}/message-mappings/tables/{table}/messages/{message}/assistant/createJq`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))).replace(`{${"table"}}`, encodeURIComponent(String(requestParameters.table))).replace(`{${"message"}}`, encodeURIComponent(String(requestParameters.message))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => DescribedJqDtoFromJSON(jsonValue));
    }

    /**
     * Create a JQ predicate for a message mapping, based on a user\'s request
     */
    async connectionsIdMessageMappingsTablesTableMessagesMessageAssistantCreateJqPost(requestParameters: ConnectionsIdMessageMappingsTablesTableMessagesMessageAssistantCreateJqPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<DescribedJqDto> {
        const response = await this.connectionsIdMessageMappingsTablesTableMessagesMessageAssistantCreateJqPostRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
