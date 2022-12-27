// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { ShortInfoWithEnvironment } from '../../api/api';

import { List } from '@mui/material';

import { Button } from '@dolittle/design-system';

const styles = {
    list: {
        p: 0,
        mt: 2.5,
        display: 'inline-block'
    },
    button: {
        width: 1,
        mb: 2,
        minWidth: 155,
        minHeight: 36,
        display: 'block',
        letterSpacing: '0.06em'
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
                    variant='filled'
                    key={`${application.id}-${application.environment}`}
                    label={`${application.name}-${application.environment}`}
                    onClick={() => onChoose(application)}
                    sx={styles.button}
                />
            ))
        }
    </List>;
