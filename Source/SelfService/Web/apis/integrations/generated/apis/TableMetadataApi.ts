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
  ListTable,
  RelatedTable,
  TableDto,
} from '../models';
import {
    ListTableFromJSON,
    ListTableToJSON,
    RelatedTableFromJSON,
    RelatedTableToJSON,
    TableDtoFromJSON,
    TableDtoToJSON,
} from '../models';

export interface ConnectionsIdMetadataEnvironmentsEnvironmentTablesGetRequest {
    id: string;
    environment: string;
}

export interface ConnectionsIdMetadataEnvironmentsEnvironmentTablesTableNameGetRequest {
    id: string;
    environment: string;
    tableName: string;
}

export interface ConnectionsIdMetadataEnvironmentsEnvironmentTablesTableNameRelatedTablesGetRequest {
    id: string;
    environment: string;
    tableName: string;
}

/**
 * 
 */
export class TableMetadataApi extends runtime.BaseAPI {

    /**
     */
    async connectionsIdMetadataEnvironmentsEnvironmentTablesGetRaw(requestParameters: ConnectionsIdMetadataEnvironmentsEnvironmentTablesGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<ListTable>>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling connectionsIdMetadataEnvironmentsEnvironmentTablesGet.');
        }

        if (requestParameters.environment === null || requestParameters.environment === undefined) {
            throw new runtime.RequiredError('environment','Required parameter requestParameters.environment was null or undefined when calling connectionsIdMetadataEnvironmentsEnvironmentTablesGet.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["X-Organization-Id"] = this.configuration.apiKey("X-Organization-Id"); // X-Organization-Id authentication
        }

        const response = await this.request({
            path: `/connections/{id}/metadata/environments/{environment}/tables`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))).replace(`{${"environment"}}`, encodeURIComponent(String(requestParameters.environment))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(ListTableFromJSON));
    }

    /**
     */
    async connectionsIdMetadataEnvironmentsEnvironmentTablesGet(requestParameters: ConnectionsIdMetadataEnvironmentsEnvironmentTablesGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<ListTable>> {
        const response = await this.connectionsIdMetadataEnvironmentsEnvironmentTablesGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async connectionsIdMetadataEnvironmentsEnvironmentTablesTableNameGetRaw(requestParameters: ConnectionsIdMetadataEnvironmentsEnvironmentTablesTableNameGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<TableDto>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling connectionsIdMetadataEnvironmentsEnvironmentTablesTableNameGet.');
        }

        if (requestParameters.environment === null || requestParameters.environment === undefined) {
            throw new runtime.RequiredError('environment','Required parameter requestParameters.environment was null or undefined when calling connectionsIdMetadataEnvironmentsEnvironmentTablesTableNameGet.');
        }

        if (requestParameters.tableName === null || requestParameters.tableName === undefined) {
            throw new runtime.RequiredError('tableName','Required parameter requestParameters.tableName was null or undefined when calling connectionsIdMetadataEnvironmentsEnvironmentTablesTableNameGet.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["X-Organization-Id"] = this.configuration.apiKey("X-Organization-Id"); // X-Organization-Id authentication
        }

        const response = await this.request({
            path: `/connections/{id}/metadata/environments/{environment}/tables/{tableName}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))).replace(`{${"environment"}}`, encodeURIComponent(String(requestParameters.environment))).replace(`{${"tableName"}}`, encodeURIComponent(String(requestParameters.tableName))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => TableDtoFromJSON(jsonValue));
    }

    /**
     */
    async connectionsIdMetadataEnvironmentsEnvironmentTablesTableNameGet(requestParameters: ConnectionsIdMetadataEnvironmentsEnvironmentTablesTableNameGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<TableDto> {
        const response = await this.connectionsIdMetadataEnvironmentsEnvironmentTablesTableNameGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async connectionsIdMetadataEnvironmentsEnvironmentTablesTableNameRelatedTablesGetRaw(requestParameters: ConnectionsIdMetadataEnvironmentsEnvironmentTablesTableNameRelatedTablesGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<RelatedTable>>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling connectionsIdMetadataEnvironmentsEnvironmentTablesTableNameRelatedTablesGet.');
        }

        if (requestParameters.environment === null || requestParameters.environment === undefined) {
            throw new runtime.RequiredError('environment','Required parameter requestParameters.environment was null or undefined when calling connectionsIdMetadataEnvironmentsEnvironmentTablesTableNameRelatedTablesGet.');
        }

        if (requestParameters.tableName === null || requestParameters.tableName === undefined) {
            throw new runtime.RequiredError('tableName','Required parameter requestParameters.tableName was null or undefined when calling connectionsIdMetadataEnvironmentsEnvironmentTablesTableNameRelatedTablesGet.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["X-Organization-Id"] = this.configuration.apiKey("X-Organization-Id"); // X-Organization-Id authentication
        }

        const response = await this.request({
            path: `/connections/{id}/metadata/environments/{environment}/tables/{tableName}/related-tables`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))).replace(`{${"environment"}}`, encodeURIComponent(String(requestParameters.environment))).replace(`{${"tableName"}}`, encodeURIComponent(String(requestParameters.tableName))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(RelatedTableFromJSON));
    }

    /**
     */
    async connectionsIdMetadataEnvironmentsEnvironmentTablesTableNameRelatedTablesGet(requestParameters: ConnectionsIdMetadataEnvironmentsEnvironmentTablesTableNameRelatedTablesGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<RelatedTable>> {
        const response = await this.connectionsIdMetadataEnvironmentsEnvironmentTablesTableNameRelatedTablesGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
