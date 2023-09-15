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
import type { StatusMessage } from './StatusMessage';
import {
    StatusMessageFromJSON,
    StatusMessageFromJSONTyped,
    StatusMessageToJSON,
} from './StatusMessage';
import type { StatusSeverity } from './StatusSeverity';
import {
    StatusSeverityFromJSON,
    StatusSeverityFromJSONTyped,
    StatusSeverityToJSON,
} from './StatusSeverity';

/**
 * 
 * @export
 * @interface ConnectionStatus
 */
export interface ConnectionStatus {
    /**
     * 
     * @type {StatusSeverity}
     * @memberof ConnectionStatus
     */
    severity?: StatusSeverity;
    /**
     * 
     * @type {StatusMessage}
     * @memberof ConnectionStatus
     */
    statusMessage?: StatusMessage;
    /**
     * 
     * @type {string}
     * @memberof ConnectionStatus
     */
    readonly name: string;
    /**
     * 
     * @type {string}
     * @memberof ConnectionStatus
     */
    readonly description: string;
}

/**
 * Check if a given object implements the ConnectionStatus interface.
 */
export function instanceOfConnectionStatus(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "name" in value;
    isInstance = isInstance && "description" in value;

    return isInstance;
}

export function ConnectionStatusFromJSON(json: any): ConnectionStatus {
    return ConnectionStatusFromJSONTyped(json, false);
}

export function ConnectionStatusFromJSONTyped(json: any, ignoreDiscriminator: boolean): ConnectionStatus {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'severity': !exists(json, 'severity') ? undefined : StatusSeverityFromJSON(json['severity']),
        'statusMessage': !exists(json, 'statusMessage') ? undefined : StatusMessageFromJSON(json['statusMessage']),
        'name': json['name'],
        'description': json['description'],
    };
}

export function ConnectionStatusToJSON(value?: ConnectionStatus | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'severity': StatusSeverityToJSON(value.severity),
        'statusMessage': StatusMessageToJSON(value.statusMessage),
    };
}

