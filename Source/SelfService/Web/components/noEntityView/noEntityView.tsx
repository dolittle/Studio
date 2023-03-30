// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Grid, Typography } from '@mui/material';

import { CreateEntityBox, CreateEntityBoxProps } from './createEntityBox';

/**
 * The props for the {@link NoEntityView} component.
 */
export type NoEntityViewProps = {
    /**
     * Title to be displayed
     */
    title: string;

    /**
     * The props for the {@link CreateEntityBox} component.
     */
    createEntityProps: CreateEntityBoxProps;

    /**
     * Children to display addition text or information at the bottom of the view.
     *
     * Use this space for descriptive text that helps explain what it means to not have an entity to the user.
     */
    children?: React.ReactNode;
};

export const NoEntityView = ({ title, createEntityProps, children }: NoEntityViewProps) =>
    <Grid
        container
        spacing={0}
        direction='column'
        alignItems='center'
        justifyContent='center'
        sx={{ minHeight: '80vh' }}
    >
        <Typography variant='h2'>{title}</Typography>

        <CreateEntityBox {...createEntityProps} />

        {children}
    </Grid>;
