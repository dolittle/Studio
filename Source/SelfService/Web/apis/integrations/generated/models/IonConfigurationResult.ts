/* tslint:disable */
/* eslint-disable */
/**
 * Aigonix.Bridge.M3
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
import type { IonConfiguration } from './IonConfiguration';
import {
    IonConfigurationFromJSON,
    IonConfigurationFromJSONTyped,
    IonConfigurationToJSON,
} from './IonConfiguration';
import type { Link } from './Link';
import {
    LinkFromJSON,
    LinkFromJSONTyped,
    LinkToJSON,
} from './Link';

/**
 * A result with the value (if any) and links to other resources (if any)
 * @export
 * @interface IonConfigurationResult
 */
export interface IonConfigurationResult {
    /**
     * 
     * @type {IonConfiguration}
     * @memberof IonConfigurationResult
     */
    value?: IonConfiguration;
    /**
     * Links to other resources. There will usually be a self link, but there
     * may be other links as well with relations that indicate what the link is.
     * @type {Array<Link>}
     * @memberof IonConfigurationResult
     */
    links: Array<Link>;
}

/**
 * Check if a given object implements the IonConfigurationResult interface.
 */
export function instanceOfIonConfigurationResult(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "links" in value;

    return isInstance;
}

export function IonConfigurationResultFromJSON(json: any): IonConfigurationResult {
    return IonConfigurationResultFromJSONTyped(json, false);
}

export function IonConfigurationResultFromJSONTyped(json: any, ignoreDiscriminator: boolean): IonConfigurationResult {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'value': !exists(json, 'value') ? undefined : IonConfigurationFromJSON(json['value']),
        'links': ((json['links'] as Array<any>).map(LinkFromJSON)),
    };
}

export function IonConfigurationResultToJSON(value?: IonConfigurationResult | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'value': IonConfigurationToJSON(value.value),
        'links': ((value.links as Array<any>).map(LinkToJSON)),
    };
}

