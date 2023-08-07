// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { MenuItem, SelectChangeEvent } from '@mui/material';

import { LogFilterMicroservice } from './logFilterPanel';
import { FilterSelect } from './filterSelect';

export type MicroserviceFilterProps = {
    availableMicroservices: LogFilterMicroservice[];
    selectedMicroservices?: LogFilterMicroservice[];
    onSelectMicroservices: (selection: LogFilterMicroservice[]) => void;
};

export const MicroserviceFilter = ({ availableMicroservices, selectedMicroservices, onSelectMicroservices }: MicroserviceFilterProps) => {
    const selectedMicroserviceIds = selectedMicroservices === undefined ? [] : selectedMicroservices.map(_ => _.id);

    const handleOnChange = (event: SelectChangeEvent<string[]>): void => {
        const ids = Array.isArray(event.target.value) ? event.target.value : [event.target.value];
        const microservices = availableMicroservices.filter(_ => ids.includes(_.id));
        onSelectMicroservices(microservices);
    };

    const renderValue = (selectedIds: string[]) => {
        if (selectedIds.length === 0) {
            return 'All microservices';
        }

        if (selectedIds.length === 1) {
            const selectedMicroservice = availableMicroservices.find(_ => _.id === selectedIds[0]);

            if (selectedMicroservice !== undefined) {
                return selectedMicroservice.name;
            }
        }

        return `${selectedIds.length} microservices`;
    };

    return (
        <FilterSelect
            multiple={true}
            displayEmpty
            value={selectedMicroserviceIds}
            renderValue={renderValue}
            onChange={handleOnChange}
        >
            {availableMicroservices.map(microservice =>
                // TODO: Add checkboxes here
                <MenuItem key={microservice.id} value={microservice.id}>{microservice.name}</MenuItem>
            )}
        </FilterSelect>
    );
};
