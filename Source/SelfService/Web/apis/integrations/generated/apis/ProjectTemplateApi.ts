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

export interface ConnectionsIdProjectTemplateServiceNamePostRequest {
    id: string;
    serviceName: string;
    serviceAccountName: string;
    description?: string;
}

/**
 * 
 */
export class ProjectTemplateApi extends runtime.BaseAPI {

    /**
     * Create a project template for a given connection / service account
     */
    async connectionsIdProjectTemplateServiceNamePostRaw(requestParameters: ConnectionsIdProjectTemplateServiceNamePostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling connectionsIdProjectTemplateServiceNamePost.');
        }

        if (requestParameters.serviceName === null || requestParameters.serviceName === undefined) {
            throw new runtime.RequiredError('serviceName','Required parameter requestParameters.serviceName was null or undefined when calling connectionsIdProjectTemplateServiceNamePost.');
        }

        if (requestParameters.serviceAccountName === null || requestParameters.serviceAccountName === undefined) {
            throw new runtime.RequiredError('serviceAccountName','Required parameter requestParameters.serviceAccountName was null or undefined when calling connectionsIdProjectTemplateServiceNamePost.');
        }

        const queryParameters: any = {};

        if (requestParameters.description !== undefined) {
            queryParameters['description'] = requestParameters.description;
        }

        if (requestParameters.serviceAccountName !== undefined) {
            queryParameters['serviceAccountName'] = requestParameters.serviceAccountName;
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
            path: `/connections/{id}/project-template/{serviceName}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))).replace(`{${"serviceName"}}`, encodeURIComponent(String(requestParameters.serviceName))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Create a project template for a given connection / service account
     */
    async connectionsIdProjectTemplateServiceNamePost(requestParameters: ConnectionsIdProjectTemplateServiceNamePostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.connectionsIdProjectTemplateServiceNamePostRaw(requestParameters, initOverrides);
    }

}
