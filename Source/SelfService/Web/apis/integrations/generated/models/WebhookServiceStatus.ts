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


/**
 * 
 * @export
 */
export const WebhookServiceStatus = {
    Off: 'Off',
    Deploying: 'Deploying',
    Active: 'Active',
    Unhealthy: 'Unhealthy',
    Terminating: 'Terminating'
} as const;
export type WebhookServiceStatus = typeof WebhookServiceStatus[keyof typeof WebhookServiceStatus];


export function WebhookServiceStatusFromJSON(json: any): WebhookServiceStatus {
    return WebhookServiceStatusFromJSONTyped(json, false);
}

export function WebhookServiceStatusFromJSONTyped(json: any, ignoreDiscriminator: boolean): WebhookServiceStatus {
    return json as WebhookServiceStatus;
}

export function WebhookServiceStatusToJSON(value?: WebhookServiceStatus | null): any {
    return value as any;
}

