// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { ChangeEvent } from 'react';
import { SelectProps, Select } from 'Source/DesignSystem/atoms/Forms/Select';
import { M3EnvironmentListDto } from '../../api/generated';
import { OnEnvironmentSelected } from '../layout/Layout';

export type EnvironmentSelectorProps = {
    environments: M3EnvironmentListDto[];
    selectedEnvironment?: string | null | undefined;
    onEnvironmentSelected?: OnEnvironmentSelected;
};

export const EnvironmentSelector = ({environments, onEnvironmentSelected, selectedEnvironment}: EnvironmentSelectorProps) =>{
    const environmentsForSelect = environments.map((env) => ({ value: env.name ?? '' }));
    const selectProps: SelectProps = {
        label: 'Select environment' ,
        options: environmentsForSelect,
        onChange: (event: ChangeEvent<HTMLInputElement>) => {
            const selected = environments?.find(e => e.name === event.target.value);
            if(selected) {
                onEnvironmentSelected?.(selected);
            }
        },
        value: selectedEnvironment,
        disabled: environmentsForSelect.length === 0
    };
    return (
        <Select {...selectProps}  />
    );
};
