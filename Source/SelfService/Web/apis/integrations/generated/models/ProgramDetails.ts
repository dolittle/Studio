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
import type { Table } from './Table';
import {
    TableFromJSON,
    TableFromJSONTyped,
    TableToJSON,
} from './Table';

/**
 * 
 * @export
 * @interface ProgramDetails
 */
export interface ProgramDetails {
    /**
     * 
     * @type {string}
     * @memberof ProgramDetails
     */
    name?: string;
    /**
     * 
     * @type {string}
     * @memberof ProgramDetails
     */
    description?: string;
    /**
     * 
     * @type {string}
     * @memberof ProgramDetails
     */
    component?: string;
    /**
     * 
     * @type {Array<Table>}
     * @memberof ProgramDetails
     */
    tables?: Array<Table>;
}

/**
 * Check if a given object implements the ProgramDetails interface.
 */
export function instanceOfProgramDetails(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function ProgramDetailsFromJSON(json: any): ProgramDetails {
    return ProgramDetailsFromJSONTyped(json, false);
}

export function ProgramDetailsFromJSONTyped(json: any, ignoreDiscriminator: boolean): ProgramDetails {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'name': !exists(json, 'name') ? undefined : json['name'],
        'description': !exists(json, 'description') ? undefined : json['description'],
        'component': !exists(json, 'component') ? undefined : json['component'],
        'tables': !exists(json, 'tables') ? undefined : ((json['tables'] as Array<any>).map(TableFromJSON)),
    };
}

export function ProgramDetailsToJSON(value?: ProgramDetails | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'name': value.name,
        'description': value.description,
        'component': value.component,
        'tables': value.tables === undefined ? undefined : ((value.tables as Array<any>).map(TableToJSON)),
    };
}

