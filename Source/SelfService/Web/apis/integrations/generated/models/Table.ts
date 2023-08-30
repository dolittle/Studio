/* tslint:disable */
/* eslint-disable */
/**
 * Aigonix.Bridge.M3
 * Bridge API - made for Aigonix Studio
 *
 * The version of the OpenAPI document: 0.0.1.320
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface Table
 */
export interface Table {
    /**
     * 
     * @type {string}
     * @memberof Table
     */
    name?: string | null;
    /**
     * 
     * @type {string}
     * @memberof Table
     */
    usage?: string | null;
}

/**
 * Check if a given object implements the Table interface.
 */
export function instanceOfTable(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function TableFromJSON(json: any): Table {
    return TableFromJSONTyped(json, false);
}

export function TableFromJSONTyped(json: any, ignoreDiscriminator: boolean): Table {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'name': !exists(json, 'name') ? undefined : json['name'],
        'usage': !exists(json, 'usage') ? undefined : json['usage'],
    };
}

export function TableToJSON(value?: Table | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'name': value.name,
        'usage': value.usage,
    };
}

