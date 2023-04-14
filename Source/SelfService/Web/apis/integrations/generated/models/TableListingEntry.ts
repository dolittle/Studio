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
 * @interface TableListingEntry
 */
export interface TableListingEntry {
    /**
     * 
     * @type {string}
     * @memberof TableListingEntry
     */
    name?: string | null;
    /**
     * 
     * @type {string}
     * @memberof TableListingEntry
     */
    description?: string | null;
    /**
     * 
     * @type {number}
     * @memberof TableListingEntry
     */
    numberOfColumns?: number;
    /**
     * 
     * @type {Date}
     * @memberof TableListingEntry
     */
    lastUsed?: Date | null;
    /**
     * 
     * @type {boolean}
     * @memberof TableListingEntry
     */
    webhookConnected?: boolean;
}

/**
 * Check if a given object implements the TableListingEntry interface.
 */
export function instanceOfTableListingEntry(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function TableListingEntryFromJSON(json: any): TableListingEntry {
    return TableListingEntryFromJSONTyped(json, false);
}

export function TableListingEntryFromJSONTyped(json: any, ignoreDiscriminator: boolean): TableListingEntry {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'name': !exists(json, 'name') ? undefined : json['name'],
        'description': !exists(json, 'description') ? undefined : json['description'],
        'numberOfColumns': !exists(json, 'numberOfColumns') ? undefined : json['numberOfColumns'],
        'lastUsed': !exists(json, 'lastUsed') ? undefined : (json['lastUsed'] === null ? null : new Date(json['lastUsed'])),
        'webhookConnected': !exists(json, 'webhookConnected') ? undefined : json['webhookConnected'],
    };
}

export function TableListingEntryToJSON(value?: TableListingEntry | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'name': value.name,
        'description': value.description,
        'numberOfColumns': value.numberOfColumns,
        'lastUsed': value.lastUsed === undefined ? undefined : (value.lastUsed === null ? null : value.lastUsed.toISOString()),
        'webhookConnected': value.webhookConnected,
    };
}

