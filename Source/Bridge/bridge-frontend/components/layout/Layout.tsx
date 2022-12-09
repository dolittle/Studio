// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import { Box } from '@mui/material';
import { ChangeEvent } from 'react';
import { Select, SelectProps } from 'Source/DesignSystem/atoms/Forms/Select';
import { useEnvironments } from '../../api/environments/useEnvironments';
import { M3EnvironmentListDto } from '../../api/generated';
import { Navigation } from './Navigation/Navigation';

export type OnEnvironmentSelected = (environment: M3EnvironmentListDto) => void;

export type LayoutProps = {
    onEnvironmentSelected?: OnEnvironmentSelected;
    selectedEnvironment?: string | null | undefined;
    children?: React.ReactNode;
};

export const Layout = ({ children, selectedEnvironment, onEnvironmentSelected }: LayoutProps) => {
    const { data: environments } = useEnvironments();
    const selectProps: SelectProps = {
        label: 'Select environment' ,
        options: environments?.map((env) => ({ value: env.name ?? '' })) ?? [],
        onChange: (event: ChangeEvent<HTMLInputElement>) => {
            const selected = environments?.find(e => e.name === event.target.value);
            if(selected) {
                onEnvironmentSelected?.(selected);
            }
        },
        value: selectedEnvironment
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <Navigation>
                <Select {...selectProps}  />
            </Navigation>
            <Box component='section' sx={{ flexGrow: 1, mx: 3 }}>
                {children}
            </Box>
        </Box>
    );
};
