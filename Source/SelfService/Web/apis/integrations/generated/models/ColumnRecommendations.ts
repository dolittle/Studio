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
import type { ColumnRecommendation } from './ColumnRecommendation';
import {
    ColumnRecommendationFromJSON,
    ColumnRecommendationFromJSONTyped,
    ColumnRecommendationToJSON,
} from './ColumnRecommendation';

/**
 * 
 * @export
 * @interface ColumnRecommendations
 */
export interface ColumnRecommendations {
    /**
     * 
     * @type {Array<ColumnRecommendation>}
     * @memberof ColumnRecommendations
     */
    recommendations?: Array<ColumnRecommendation>;
}

/**
 * Check if a given object implements the ColumnRecommendations interface.
 */
export function instanceOfColumnRecommendations(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function ColumnRecommendationsFromJSON(json: any): ColumnRecommendations {
    return ColumnRecommendationsFromJSONTyped(json, false);
}

export function ColumnRecommendationsFromJSONTyped(json: any, ignoreDiscriminator: boolean): ColumnRecommendations {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'recommendations': !exists(json, 'recommendations') ? undefined : ((json['recommendations'] as Array<any>).map(ColumnRecommendationFromJSON)),
    };
}

export function ColumnRecommendationsToJSON(value?: ColumnRecommendations | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'recommendations': value.recommendations === undefined ? undefined : ((value.recommendations as Array<any>).map(ColumnRecommendationToJSON)),
    };
}

