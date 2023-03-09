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


/**
 * 
 * @export
 */
export const FieldType = {
    StringType: 'StringType',
    NumberType: 'NumberType'
} as const;
export type FieldType = typeof FieldType[keyof typeof FieldType];


export function FieldTypeFromJSON(json: any): FieldType {
    return FieldTypeFromJSONTyped(json, false);
}

export function FieldTypeFromJSONTyped(json: any, ignoreDiscriminator: boolean): FieldType {
    return json as FieldType;
}

export function FieldTypeToJSON(value?: FieldType | null): any {
    return value as any;
}

