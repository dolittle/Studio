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
    description?: string;
    subDescription?: string;
};

export const NoEntityView = ({ title, createEntityProps, description, subDescription, children }: NoEntityViewProps) =>
    <Grid
        container
        spacing={0}
        direction='column'
        alignItems='center'
        justifyContent='center'
        textAlign='center'
        sx={{ height: 1 }}
    >
        <Typography variant='h2'>{title}</Typography>

        <CreateEntityBox {...createEntityProps} />

        <Typography sx={{ maxWidth: 543, mb: 2 }}>{description}</Typography>
        <Typography sx={{ maxWidth: 543 }}>{subDescription}</Typography>

        {children}
    </Grid>;
