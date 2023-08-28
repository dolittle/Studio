/* tslint:disable */
/* eslint-disable */
/**
 * Aigonix.Bridge.M3
 * Bridge API - made for Aigonix Studio
 *
 * The version of the OpenAPI document: 0.0.1.301
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
import type { ConnectionConfiguration } from './ConnectionConfiguration';
import {
    ConnectionConfigurationFromJSON,
    ConnectionConfigurationFromJSONTyped,
    ConnectionConfigurationToJSON,
} from './ConnectionConfiguration';
import type { Link } from './Link';
import {
    LinkFromJSON,
    LinkFromJSONTyped,
    LinkToJSON,
} from './Link';

/**
 * A result with the value (if any) and links to other resources (if any)
 * @export
 * @interface ConnectionConfigurationResult
 */
export interface ConnectionConfigurationResult {
    /**
     * 
     * @type {ConnectionConfiguration}
     * @memberof ConnectionConfigurationResult
     */
    value?: ConnectionConfiguration;
    /**
     * Links to other resources. There will usually be a self link, but there
     * may be other links as well with relations that indicate what the link is.
     * @type {Array<Link>}
     * @memberof ConnectionConfigurationResult
     */
    links: Array<Link>;
}

/**
 * Check if a given object implements the ConnectionConfigurationResult interface.
 */
export function instanceOfConnectionConfigurationResult(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "links" in value;

    return isInstance;
}

export function ConnectionConfigurationResultFromJSON(json: any): ConnectionConfigurationResult {
    return ConnectionConfigurationResultFromJSONTyped(json, false);
}

export function ConnectionConfigurationResultFromJSONTyped(json: any, ignoreDiscriminator: boolean): ConnectionConfigurationResult {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'value': !exists(json, 'value') ? undefined : ConnectionConfigurationFromJSON(json['value']),
        'links': ((json['links'] as Array<any>).map(LinkFromJSON)),
    };
}

export function ConnectionConfigurationResultToJSON(value?: ConnectionConfigurationResult | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'value': ConnectionConfigurationToJSON(value.value),
        'links': ((value.links as Array<any>).map(LinkToJSON)),
    };
}

