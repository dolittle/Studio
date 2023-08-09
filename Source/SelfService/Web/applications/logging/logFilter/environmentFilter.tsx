// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { MenuItem, SelectChangeEvent } from '@mui/material';
import { ArrowDropDownRounded } from '@mui/icons-material';

import { FilterSelect } from './filterSelect';

export type EnvironmentFilterProps = {
    availableEnvironments: string[];
    selectedEnvironments?: string[];
    onSelectEnvironments: (selection: string[]) => void;
};

export const EnvironmentFilter = ({ availableEnvironments, selectedEnvironments, onSelectEnvironments }: EnvironmentFilterProps) => {
    const selectedEnvs = selectedEnvironments === undefined ? [] : selectedEnvironments.map(env => env);

    const handleOnChange = (event: SelectChangeEvent<string[]>): void => {
        const envs = Array.isArray(event.target.value) ? event.target.value : [event.target.value];
        const environments = availableEnvironments.filter(env => envs.includes(env));
        onSelectEnvironments(environments);
    };

    const renderValue = (selectedEnvironments: string[]) => {
        if (selectedEnvironments.length === 0) {
            return 'All environments';
        }

        if (selectedEnvironments.length === 1) {
            const selectedEnvironment = availableEnvironments.find(env => env === selectedEnvironments[0]);

            if (selectedEnvironment !== undefined) {
                return selectedEnvironment;
            }
        }

        return `${selectedEnvironments.length} environments`;
    };

    return (
        <FilterSelect
            multiple={true}
            displayEmpty
            value={selectedEnvs}
            renderValue={renderValue}
            onChange={handleOnChange}
            IconComponent={ArrowDropDownRounded}
        >
            {availableEnvironments.map(env =>
                // TODO: Add checkboxes here
                <MenuItem key={env} value={env}>{env}</MenuItem>
            )}
        </FilterSelect>
    );
};
