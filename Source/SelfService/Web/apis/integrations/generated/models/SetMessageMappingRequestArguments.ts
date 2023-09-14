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

import { exists, mapValues } from '../runtime';
import type { FieldMapping } from './FieldMapping';
import {
    FieldMappingFromJSON,
    FieldMappingFromJSONTyped,
    FieldMappingToJSON,
} from './FieldMapping';

/**
 * Body of a request to set a message mapping.
 * @export
 * @interface SetMessageMappingRequestArguments
 */
export interface SetMessageMappingRequestArguments {
    /**
     * 
     * @type {Array<FieldMapping>}
     * @memberof SetMessageMappingRequestArguments
     */
    fields: Array<FieldMapping>;
    /**
     * 
     * @type {string}
     * @memberof SetMessageMappingRequestArguments
     */
    jqFilter?: string | null;
    /**
     * 
     * @type {string}
     * @memberof SetMessageMappingRequestArguments
     */
    description?: string | null;
}

/**
 * Check if a given object implements the SetMessageMappingRequestArguments interface.
 */
export function instanceOfSetMessageMappingRequestArguments(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "fields" in value;

    return isInstance;
}

export function SetMessageMappingRequestArgumentsFromJSON(json: any): SetMessageMappingRequestArguments {
    return SetMessageMappingRequestArgumentsFromJSONTyped(json, false);
}

export function SetMessageMappingRequestArgumentsFromJSONTyped(json: any, ignoreDiscriminator: boolean): SetMessageMappingRequestArguments {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'fields': ((json['fields'] as Array<any>).map(FieldMappingFromJSON)),
        'jqFilter': !exists(json, 'jqFilter') ? undefined : json['jqFilter'],
        'description': !exists(json, 'description') ? undefined : json['description'],
    };
}

export function SetMessageMappingRequestArgumentsToJSON(value?: SetMessageMappingRequestArguments | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'fields': ((value.fields as Array<any>).map(FieldMappingToJSON)),
        'jqFilter': value.jqFilter,
        'description': value.description,
    };
}

