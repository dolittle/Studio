// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { ListItem } from '@mui/material';

import { Button } from '@dolittle/design-system';

import { ShortInfoWithEnvironment } from '../../apis/solutions/api';

// Makes ListItem buttons as wide as the longest one.
const styles = {
    mb: 2,
    minWidth: 155,
    minHeight: 36,
    display: 'block',
};

export type ApplicationsListItemProps = {
    application: ShortInfoWithEnvironment;
    onClick: () => void;
};

export const ApplicationsListItem = ({ application, onClick }: ApplicationsListItemProps) =>
    <ListItem sx={{ p: 0 }}>
        <Button
            variant='filled'
            label={`${application.name}-${application.environment}`}
            isFullWidth
            onClick={onClick}
            sx={styles}
        />
    </ListItem>;
