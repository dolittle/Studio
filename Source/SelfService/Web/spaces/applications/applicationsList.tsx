// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { ShortInfoWithEnvironment } from '../../apis/solutions/api';

import { List } from '@mui/material';

import { Button } from '@dolittle/design-system';

// Make buttons as wide as the longest one
const styles = {
    list: {
        p: 0,
        mt: 2.5,
        display: 'inline-block',
    },
    button: {
        mb: 2,
        minWidth: 155,
        minHeight: 36,
        display: 'block',
    },
};

export type ApplicationsListProps = {
    data: ShortInfoWithEnvironment[];
    onChoose: (application: ShortInfoWithEnvironment) => void;
};

export const ApplicationsList = ({ data, onChoose }: ApplicationsListProps) =>
    <List sx={styles.list}>
        {
            data.map(application => (
                <Button
                    variant='filled'
                    key={`${application.id}-${application.environment}`}
                    label={`${application.name}-${application.environment}`}
                    isFullWidth
                    onClick={() => onChoose(application)}
                    sx={styles.button}
                />
            ))
        }
        <Button label='Create new Application' variant='outlined' isFullWidth />
    </List>;
