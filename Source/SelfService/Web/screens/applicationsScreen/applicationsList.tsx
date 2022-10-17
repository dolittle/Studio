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
        width: 1,
        minWidth: 19.375,
        minHeight: 4.5,
        letterSpacing: '0.06em',
        typography: 'body2',
        fontWeight: 500,
        mb: 2,
    }
};

type ApplicationsListProps = {
    data: ShortInfoWithEnvironment[];
    onChoose: (application: ShortInfoWithEnvironment) => void;
};

export const ApplicationsList = ({ data, onChoose }: ApplicationsListProps) =>
    <List sx={styles.list}>
        {
            data.map(application => (
                <Button
                    variant='contained'
                    sx={styles.button}
                    key={`${application.id}-${application.environment}`}
                    onClick={() => onChoose(application)}
                >
                    {application.name} - {application.environment}
                </Button>
            )
            )
        }
    </List>;
