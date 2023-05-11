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
 * @interface DescribedJqDto
 */
export interface DescribedJqDto {
    /**
     * 
     * @type {string}
     * @memberof DescribedJqDto
     */
    jqExpression?: string | null;
    /**
     * 
     * @type {string}
     * @memberof DescribedJqDto
     */
    description?: string;
}

/**
 * Check if a given object implements the DescribedJqDto interface.
 */
export function instanceOfDescribedJqDto(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function DescribedJqDtoFromJSON(json: any): DescribedJqDto {
    return DescribedJqDtoFromJSONTyped(json, false);
}

export function DescribedJqDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): DescribedJqDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'jqExpression': !exists(json, 'jqExpression') ? undefined : json['jqExpression'],
        'description': !exists(json, 'description') ? undefined : json['description'],
    };
}

export function DescribedJqDtoToJSON(value?: DescribedJqDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'jqExpression': value.jqExpression,
        'description': value.description,
    };
}

