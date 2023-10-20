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
/**
 * 
 * @export
 * @interface ServiceAccountListDto
 */
export interface ServiceAccountListDto {
    /**
     * 
     * @type {string}
     * @memberof ServiceAccountListDto
     */
    serviceAccountName?: string;
    /**
     * 
     * @type {string}
     * @memberof ServiceAccountListDto
     */
    createdBy?: string;
    /**
     * 
     * @type {Date}
     * @memberof ServiceAccountListDto
     */
    createdAt?: Date;
    /**
     * 
     * @type {boolean}
     * @memberof ServiceAccountListDto
     */
    commandAccess?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof ServiceAccountListDto
     */
    auditAccess?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof ServiceAccountListDto
     */
    deleteAccess?: boolean;
    /**
     * 
     * @type {string}
     * @memberof ServiceAccountListDto
     */
    description?: string | null;
}

/**
 * Check if a given object implements the ServiceAccountListDto interface.
 */
export function instanceOfServiceAccountListDto(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function ServiceAccountListDtoFromJSON(json: any): ServiceAccountListDto {
    return ServiceAccountListDtoFromJSONTyped(json, false);
}

export function ServiceAccountListDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): ServiceAccountListDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'serviceAccountName': !exists(json, 'serviceAccountName') ? undefined : json['serviceAccountName'],
        'createdBy': !exists(json, 'createdBy') ? undefined : json['createdBy'],
        'createdAt': !exists(json, 'createdAt') ? undefined : (new Date(json['createdAt'])),
        'commandAccess': !exists(json, 'commandAccess') ? undefined : json['commandAccess'],
        'auditAccess': !exists(json, 'auditAccess') ? undefined : json['auditAccess'],
        'deleteAccess': !exists(json, 'deleteAccess') ? undefined : json['deleteAccess'],
        'description': !exists(json, 'description') ? undefined : json['description'],
    };
}

export function ServiceAccountListDtoToJSON(value?: ServiceAccountListDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'serviceAccountName': value.serviceAccountName,
        'createdBy': value.createdBy,
        'createdAt': value.createdAt === undefined ? undefined : (value.createdAt.toISOString()),
        'commandAccess': value.commandAccess,
        'auditAccess': value.auditAccess,
        'deleteAccess': value.deleteAccess,
        'description': value.description,
    };
}

