// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { MenuItem, Select, SelectChangeEvent } from '@mui/material';

import { LogFilterMicroservice } from './logFilterPanel';

export type MicroserviceFilterProps = {
    availableMicroservices: LogFilterMicroservice[];
    selectedMicroservices?: LogFilterMicroservice[];
    onSelectMicroservices: (selection: LogFilterMicroservice[]) => void;
};

export const MicroserviceFilter = (props: MicroserviceFilterProps) => {

    const selectedMicroserviceIds = props.selectedMicroservices === undefined
        ? []
        : props.selectedMicroservices.map(_ => _.id);

    const handleOnChange = (event: SelectChangeEvent<string[]>): void => {
        const ids = Array.isArray(event.target.value) ? event.target.value : [event.target.value];
        const microservices = props.availableMicroservices.filter(_ => ids.includes(_.id));
        props.onSelectMicroservices(microservices);
    };

    const renderValue = (selectedIds: string[]) => {
        if (selectedIds.length === 0) {
            return 'All microservices';
        }

        if (selectedIds.length === 1) {
            const selectedMicroservice = props.availableMicroservices.find(_ => _.id === selectedIds[0]);
            if (selectedMicroservice !== undefined) {
                return selectedMicroservice.name;
            }
        }

        return `${selectedIds.length} microservices`;
    };

    return (
        <Select
            variant='standard'
            multiple={true}
            displayEmpty
            value={selectedMicroserviceIds}
            renderValue={renderValue}
            onChange={handleOnChange}
        >
            {props.availableMicroservices.map((microservice, i) => (
                // TODO: Add checkboxes here
                <MenuItem key={i} value={microservice.id}>{microservice.name}</MenuItem>
            ))}
        </Select>
    );
};
