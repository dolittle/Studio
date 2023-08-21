// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { ListItem } from '@mui/material';
import { useHref } from 'react-router-dom';
import { Button } from '@dolittle/design-system';

import { ShortInfo } from '../../apis/solutions/api';

// Makes ListItem buttons as wide as the longest one.
const styles = {
    mb: 2,
    minWidth: 155,
    minHeight: 36,
};

export type ApplicationsListItemProps = {
    application: ShortInfo;
};

export const ApplicationsListItem = ({ application }: ApplicationsListItemProps) => {
    const microservicesHref = useHref(`/microservices/application/${application.id}/overview`);

    return (
        <ListItem sx={{ p: 0 }}>
            <Button
                variant='filled'
                label={`${application.name}`}
                isFullWidth
                href={microservicesHref}
                sx={styles}
            />
        </ListItem>
    );
};
