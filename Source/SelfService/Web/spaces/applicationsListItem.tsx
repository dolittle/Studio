// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { useNavigate } from 'react-router-dom';

import { ListItem } from '@mui/material';

import { Button } from '@dolittle/design-system';

import { ShortInfo } from '../apis/solutions/api';

// Makes ListItem buttons as wide as the longest one.
const styles = {
    mb: 2,
    minWidth: 155,
    minHeight: 36,
};

export type ApplicationsListItemProps = {
    application: ShortInfo;
    liveApplicationsList: ShortInfo[];
};

export const ApplicationsListItem = ({ application, liveApplicationsList }: ApplicationsListItemProps) => {
    const navigate = useNavigate();

    const handleApplicationChange = () => {
        if (liveApplicationsList.some(app => app.id === application.id)) {
            navigate(`/microservices/application/${application.id}/overview`);
        } else {
            navigate(`/building`);
        }
    };

    return (
        <ListItem sx={{ p: 0 }}>
            <Button
                variant='filled'
                label={`${application.name}`}
                isFullWidth
                onClick={handleApplicationChange}
                sx={styles}
            />
        </ListItem>
    );
};
