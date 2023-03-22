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

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface RemoteServiceStatus
 */
export interface RemoteServiceStatus {
    /**
     * 
     * @type {string}
     * @memberof RemoteServiceStatus
     */
    readonly name?: string | null;
    /**
     * 
     * @type {string}
     * @memberof RemoteServiceStatus
     */
    readonly description?: string | null;
}

/**
 * Check if a given object implements the RemoteServiceStatus interface.
 */
export function instanceOfRemoteServiceStatus(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function RemoteServiceStatusFromJSON(json: any): RemoteServiceStatus {
    return RemoteServiceStatusFromJSONTyped(json, false);
}

export function RemoteServiceStatusFromJSONTyped(json: any, ignoreDiscriminator: boolean): RemoteServiceStatus {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'name': !exists(json, 'name') ? undefined : json['name'],
        'description': !exists(json, 'description') ? undefined : json['description'],
    };
}

export function RemoteServiceStatusToJSON(value?: RemoteServiceStatus | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
    };
}

