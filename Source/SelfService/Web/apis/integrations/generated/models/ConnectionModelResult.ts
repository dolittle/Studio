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
import type { ConnectionModel } from './ConnectionModel';
import {
    ConnectionModelFromJSON,
    ConnectionModelFromJSONTyped,
    ConnectionModelToJSON,
} from './ConnectionModel';
import type { Link } from './Link';
import {
    LinkFromJSON,
    LinkFromJSONTyped,
    LinkToJSON,
} from './Link';

/**
 * A result with the value (if any) and links to other resources (if any)
 * @export
 * @interface ConnectionModelResult
 */
export interface ConnectionModelResult {
    /**
     * 
     * @type {ConnectionModel}
     * @memberof ConnectionModelResult
     */
    value?: ConnectionModel;
    /**
     * Links to other resources. There will usually be a self link, but there
     * may be other links as well with relations that indicate what the link is.
     * @type {Array<Link>}
     * @memberof ConnectionModelResult
     */
    links?: Array<Link> | null;
}

/**
 * Check if a given object implements the ConnectionModelResult interface.
 */
export function instanceOfConnectionModelResult(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function ConnectionModelResultFromJSON(json: any): ConnectionModelResult {
    return ConnectionModelResultFromJSONTyped(json, false);
}

export function ConnectionModelResultFromJSONTyped(json: any, ignoreDiscriminator: boolean): ConnectionModelResult {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'value': !exists(json, 'value') ? undefined : ConnectionModelFromJSON(json['value']),
        'links': !exists(json, 'links') ? undefined : (json['links'] === null ? null : (json['links'] as Array<any>).map(LinkFromJSON)),
    };
}

export function ConnectionModelResultToJSON(value?: ConnectionModelResult | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'value': ConnectionModelToJSON(value.value),
        'links': value.links === undefined ? undefined : (value.links === null ? null : (value.links as Array<any>).map(LinkToJSON)),
    };
}

