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


/**
 * 
 * @export
 */
export const SortDirection = {
    Ascending: 'Ascending',
    Descending: 'Descending'
} as const;
export type SortDirection = typeof SortDirection[keyof typeof SortDirection];


export function SortDirectionFromJSON(json: any): SortDirection {
    return SortDirectionFromJSONTyped(json, false);
}

export function SortDirectionFromJSONTyped(json: any, ignoreDiscriminator: boolean): SortDirection {
    return json as SortDirection;
}

export function SortDirectionToJSON(value?: SortDirection | null): any {
    return value as any;
}

