/* tslint:disable */
/* eslint-disable */
/**
 * Aigonix.Bridge.M3
 * Bridge API - made for Aigonix Studio
 *
 * The version of the OpenAPI document: 0.0.1.301
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface IonConfiguration
 */
export interface IonConfiguration {
    /**
     * 
     * @type {string}
     * @memberof IonConfiguration
     */
    gatewayUrl: string;
    /**
     * 
     * @type {string}
     * @memberof IonConfiguration
     */
    username: string;
    /**
     * 
     * @type {string}
     * @memberof IonConfiguration
     */
    password: string;
    /**
     * 
     * @type {string}
     * @memberof IonConfiguration
     */
    clientId: string;
    /**
     * 
     * @type {string}
     * @memberof IonConfiguration
     */
    clientSecret: string;
    /**
     * 
     * @type {string}
     * @memberof IonConfiguration
     */
    oauthTokenUrl: string;
    /**
     * 
     * @type {string}
     * @memberof IonConfiguration
     */
    byUser: string;
}

/**
 * Check if a given object implements the IonConfiguration interface.
 */
export function instanceOfIonConfiguration(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "gatewayUrl" in value;
    isInstance = isInstance && "username" in value;
    isInstance = isInstance && "password" in value;
    isInstance = isInstance && "clientId" in value;
    isInstance = isInstance && "clientSecret" in value;
    isInstance = isInstance && "oauthTokenUrl" in value;
    isInstance = isInstance && "byUser" in value;

    return isInstance;
}

export function IonConfigurationFromJSON(json: any): IonConfiguration {
    return IonConfigurationFromJSONTyped(json, false);
}

export function IonConfigurationFromJSONTyped(json: any, ignoreDiscriminator: boolean): IonConfiguration {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'gatewayUrl': json['gatewayUrl'],
        'username': json['username'],
        'password': json['password'],
        'clientId': json['clientId'],
        'clientSecret': json['clientSecret'],
        'oauthTokenUrl': json['oauthTokenUrl'],
        'byUser': json['byUser'],
    };
}

export function IonConfigurationToJSON(value?: IonConfiguration | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'gatewayUrl': value.gatewayUrl,
        'username': value.username,
        'password': value.password,
        'clientId': value.clientId,
        'clientSecret': value.clientSecret,
        'oauthTokenUrl': value.oauthTokenUrl,
        'byUser': value.byUser,
    };
}

