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
 * @interface ConnectionModelArrayResult
 */
export interface ConnectionModelArrayResult {
    /**
     * The value of the result - may be null if no value is present (yet)
     * @type {Array<ConnectionModel>}
     * @memberof ConnectionModelArrayResult
     */
    value?: Array<ConnectionModel> | null;
    /**
     * Links to other resources. There will usually be a self link, but there
     * may be other links as well with relations that indicate what the link is.
     * @type {Array<Link>}
     * @memberof ConnectionModelArrayResult
     */
    links?: Array<Link>;
}

/**
 * Check if a given object implements the ConnectionModelArrayResult interface.
 */
export function instanceOfConnectionModelArrayResult(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function ConnectionModelArrayResultFromJSON(json: any): ConnectionModelArrayResult {
    return ConnectionModelArrayResultFromJSONTyped(json, false);
}

export function ConnectionModelArrayResultFromJSONTyped(json: any, ignoreDiscriminator: boolean): ConnectionModelArrayResult {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'value': !exists(json, 'value') ? undefined : (json['value'] === null ? null : (json['value'] as Array<any>).map(ConnectionModelFromJSON)),
        'links': !exists(json, 'links') ? undefined : ((json['links'] as Array<any>).map(LinkFromJSON)),
    };
}

export function ConnectionModelArrayResultToJSON(value?: ConnectionModelArrayResult | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'value': value.value === undefined ? undefined : (value.value === null ? null : (value.value as Array<any>).map(ConnectionModelToJSON)),
        'links': value.links === undefined ? undefined : ((value.links as Array<any>).map(LinkToJSON)),
    };
}

