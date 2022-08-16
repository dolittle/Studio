// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { ShortInfoWithEnvironment } from '../../api/api';

import { Button, List } from '@mui/material';

const styles = {
    list: {
        p: 0,
        mt: 2.5,
        display: 'inline-block'
    },
    button: {
        display: 'block',
        inlineSize: '100%',
        minInlineSize: '9.6875rem',
        minBlockSize: '2.25rem',
        letterSpacing: '0.06em',
        typography: 'body2',
        fontWeight: 500,
    }
};

type ApplicationsListProps = {
    data: ShortInfoWithEnvironment[],
    handleClick: (application: ShortInfoWithEnvironment) => void;
};

export const ApplicationsList = ({ data, handleClick }: ApplicationsListProps) => (
    <List sx={styles.list}>
        {data.map(application => (
            <Button
                variant='contained'
                sx={styles.button}
                key={application.environment}
                onClick={() => handleClick(application)}
            >
                {application.name} - {application.environment}
            </Button>
        )
        )}
    </List>
);
