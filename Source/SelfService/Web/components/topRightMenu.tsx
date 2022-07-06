// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { ShortInfoWithEnvironment } from '../api/api';
import { ApplicationsChanger } from '../application/applicationsChanger';
import { SxProps } from '@mui/material';

type Props = {
    applications: ShortInfoWithEnvironment[];
    applicationId: string;
    environment: string;
};

const styles = {
    iconButton: {
        padding: 0,
        marginRight: 1,
    } as SxProps,
    icon: {
        fill: 'white',
    } as SxProps,
};

export const TopRightMenu: React.FunctionComponent<Props> = (props) => {
    const _props = props!;

    return <>
        <ApplicationsChanger applications={_props.applications} applicationId={_props.applicationId} environment={_props.environment} />
    </>;
};
