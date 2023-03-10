// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { HttpResponseApplication } from '../../apis/solutions/application';
import { useNavigate } from 'react-router-dom';
import { ButtonText } from '../../components/theme-legacy/buttonText';
import { Typography } from '@mui/material';

type Props = {
    application: HttpResponseApplication
};

type EnvironmentInfo = {
    name: string
    connected: boolean
};

export const View: React.FunctionComponent<Props> = (props) => {
    const navigate = useNavigate();
    const _props = props!;
    const application = _props.application;
    const applicationId = application.id;

    const environments = application.environments.map(_environment => ({
        name: _environment.name,
        connected: _environment.connections.m3Connector,
    })) as EnvironmentInfo[];

    return (
        <>
            <Typography variant='h1' my={2}>Overview</Typography>


            {environments.map(row => (
                <>
                    <Typography variant='h2' my={2}>{row.name}</Typography>

                    <ButtonText onClick={async () => {
                        const environment = row.name;
                        const href = row.connected ?
                            `/m3connector/application/${applicationId}/${environment}/details` :
                            `/m3connector/application/${applicationId}/${environment}/setup`;
                        navigate(href);
                    }}>{row.connected ? 'View Details' : 'Setup'}</ButtonText>
                </>
            ))
            }
        </>
    );
};



