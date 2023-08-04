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
export const TableKind = {
    Std: 'Std',
    Mod: 'Mod',
    Custom: 'Custom'
} as const;
export type TableKind = typeof TableKind[keyof typeof TableKind];


export function TableKindFromJSON(json: any): TableKind {
    return TableKindFromJSONTyped(json, false);
}

export function TableKindFromJSONTyped(json: any, ignoreDiscriminator: boolean): TableKind {
    return json as TableKind;
}

export function TableKindToJSON(value?: TableKind | null): any {
    return value as any;
}

