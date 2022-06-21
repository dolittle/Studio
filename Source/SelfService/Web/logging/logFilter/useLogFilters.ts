// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { useQueryParams, ArrayParam, StringParam, withDefault } from 'use-query-params';

import { LogFilterDateRange, LogFilterMicroservice, LogFilterObject } from './logFilterPanel';

export const useLogFilters = (initialFilters: LogFilterObject, availableMicroservices: LogFilterMicroservice[]): [LogFilterObject, React.Dispatch<React.SetStateAction<LogFilterObject>>] => {
    const [query, setQuery] = useQueryParams({
        range: withDefault(StringParam, initialFilters.dateRange === 'live' ? 'live' : 'daterange'),
        from: withDefault(StringParam, initialFilters.dateRange === 'live' ? undefined : initialFilters.dateRange.start.toString()),
        to: withDefault(StringParam, initialFilters.dateRange === 'live' ? undefined : initialFilters.dateRange.stop.toString()),
        search: withDefault(ArrayParam, initialFilters.searchTerms),
        microservice: withDefault(ArrayParam, initialFilters.microservice?.map(_ => _.id)),
    });

    let dateRange: LogFilterDateRange = 'live';
    if (query.range === 'daterange') {
        try {
            dateRange = {
                start: BigInt(query.from!),
                stop: BigInt(query.to!),
            };
        } catch {
            dateRange = 'live';
        }
    }

    let searchTerms: string[] = [];
    if (query) {
        searchTerms = query.search.filter(_ => _ !== null && _.length > 0) as string[];
    }

    let microservice: LogFilterMicroservice[] | undefined;
    if (query.microservice !== undefined && query.microservice !== null) {
        microservice = query.microservice
            .filter(_ => _ !== null && _.length > 0 && availableMicroservices.some(ms => ms.id === _))
            .map(id => availableMicroservices.find(ms => ms.id === id)!);
    }

    const filters: LogFilterObject = { dateRange, searchTerms, microservice };

    const setFilters = (action: React.SetStateAction<LogFilterObject>) => {
        const { dateRange, searchTerms, microservice } = typeof action === 'function' ? action(filters) : action;
        setQuery({
            range: dateRange === 'live' ? 'live' : 'daterange',
            from: dateRange === 'live' ? undefined : dateRange.start.toString(),
            to: dateRange === 'live' ? undefined : dateRange.stop.toString(),
            search: searchTerms.length > 0 ? searchTerms : undefined,
            microservice: microservice !== undefined && microservice.length > 0 ? microservice.map(_ => _.id) : undefined,
        }, 'replace');
    };

    return [filters, setFilters];
};
