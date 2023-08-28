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
import type { Link } from './Link';
import {
    LinkFromJSON,
    LinkFromJSONTyped,
    LinkToJSON,
} from './Link';

/**
 * A result with the value (if any) and links to other resources (if any)
 * @export
 * @interface StringResult
 */
export interface StringResult {
    /**
     * The value of the result - may be null if no value is present (yet)
     * @type {string}
     * @memberof StringResult
     */
    value?: string | null;
    /**
     * Links to other resources. There will usually be a self link, but there
     * may be other links as well with relations that indicate what the link is.
     * @type {Array<Link>}
     * @memberof StringResult
     */
    links: Array<Link>;
}

/**
 * Check if a given object implements the StringResult interface.
 */
export function instanceOfStringResult(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "links" in value;

    return isInstance;
}

export function StringResultFromJSON(json: any): StringResult {
    return StringResultFromJSONTyped(json, false);
}

export function StringResultFromJSONTyped(json: any, ignoreDiscriminator: boolean): StringResult {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'value': !exists(json, 'value') ? undefined : json['value'],
        'links': ((json['links'] as Array<any>).map(LinkFromJSON)),
    };
}

export function StringResultToJSON(value?: StringResult | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'value': value.value,
        'links': ((value.links as Array<any>).map(LinkToJSON)),
    };
}

