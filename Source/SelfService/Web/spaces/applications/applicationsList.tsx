// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { ShortInfo } from '../../apis/solutions/api';

import { List } from '@mui/material';

import { ApplicationsListItem } from './applicationsListItem';

export type ApplicationsListProps = {
    data: ShortInfo[];
};

export const ApplicationsList = ({ data }: ApplicationsListProps) =>
    <List>
        {data.map(application =>
            <ApplicationsListItem
                key={`${application.id}`}
                application={application}
            />
        )}
    </List>;
