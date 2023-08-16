// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { QueryLabels } from '../loki/queries';
import { LogFilterObject } from './logFilterPanel';

/**
 * Constructs query labels and filtering pipeline to fetch logs for an application, environment and provided filters.
 * @param applicationId The application ID to get logs for.
 * @param filters The filters to apply.
 * @returns The query labels and filter pipeline to use in Loki requests.
 */
export const logFilterToLabelsAndPipeline = (applicationId: string, filters: LogFilterObject): [QueryLabels, string[]] => {
    const labels = {
        job: 'microservice',
        application_id: applicationId,
        //environment,
        microservice_id:
            filters.microservice !== undefined && filters.microservice.length > 0
                ? filters.microservice.map(ms => ms.id)
                : undefined,
    };

    const pipeline = filters.searchTerms
        .map(term => term.replace(/[.*+?^${}()|[\]\\"]/g, '\\\\$&'))
        .map(term => `|~"(?i)${term}"`);

    return [labels, pipeline];
};
