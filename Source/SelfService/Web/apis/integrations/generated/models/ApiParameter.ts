/* tslint:disable */
/* eslint-disable */
/**
 * Aigonix.Bridge.M3
 * Bridge API - made for Aigonix Studio
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
import type { FieldType } from './FieldType';
import {
    FieldTypeFromJSON,
    FieldTypeFromJSONTyped,
    FieldTypeToJSON,
} from './FieldType';

/**
 * 
 * @export
 * @interface ApiParameter
 */
export interface ApiParameter {
    /**
     * 
     * @type {string}
     * @memberof ApiParameter
     */
    name?: string;
    /**
     * 
     * @type {string}
     * @memberof ApiParameter
     */
    description?: string;
    /**
     * 
     * @type {FieldType}
     * @memberof ApiParameter
     */
    type?: FieldType;
    /**
     * 
     * @type {number}
     * @memberof ApiParameter
     */
    length?: number;
    /**
     * 
     * @type {boolean}
     * @memberof ApiParameter
     */
    required?: boolean;
}

/**
 * Check if a given object implements the ApiParameter interface.
 */
export function instanceOfApiParameter(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function ApiParameterFromJSON(json: any): ApiParameter {
    return ApiParameterFromJSONTyped(json, false);
}

export function ApiParameterFromJSONTyped(json: any, ignoreDiscriminator: boolean): ApiParameter {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'name': !exists(json, 'name') ? undefined : json['name'],
        'description': !exists(json, 'description') ? undefined : json['description'],
        'type': !exists(json, 'type') ? undefined : FieldTypeFromJSON(json['type']),
        'length': !exists(json, 'length') ? undefined : json['length'],
        'required': !exists(json, 'required') ? undefined : json['required'],
    };
}

export function ApiParameterToJSON(value?: ApiParameter | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'name': value.name,
        'description': value.description,
        'type': FieldTypeToJSON(value.type),
        'length': value.length,
        'required': value.required,
    };
}

