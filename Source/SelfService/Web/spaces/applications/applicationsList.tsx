// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { ShortInfoWithEnvironment } from '../../apis/solutions/api';

import { List } from '@mui/material';

import { ApplicationsListItem } from './applicationsListItem';

export type ApplicationsListProps = {
    data: ShortInfoWithEnvironment[];
    onSelect: (application: ShortInfoWithEnvironment) => void;
};

export const ApplicationsList = ({ data, onSelect }: ApplicationsListProps) =>
    <List>
        {data.map(application =>
            <ApplicationsListItem
                key={`${application.id}-${application.environment}`}
                application={application}
                onClick={() => onSelect(application)}
            />
        )}
    </List>;
