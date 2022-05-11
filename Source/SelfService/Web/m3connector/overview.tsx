// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { HttpResponseApplication } from '../api/application';
import { useHistory } from 'react-router-dom';
import { ButtonText } from '../theme/buttonText';

type Props = {
    application: HttpResponseApplication
};

type EnvironmentInfo = {
    name: string
    connected: boolean
};

export const View: React.FunctionComponent<Props> = (props) => {
    const history = useHistory();
    const _props = props!;
    const application = _props.application;
    const applicationId = application.id;

    const environments = application.environments.map(_environment => ({
        name: _environment.name,
        connected: _environment.connections.m3Connector,
    })) as EnvironmentInfo[];

    return (
        <>
            <h1>Overview</h1>


            {environments.map(row => (
                <>
                    <h2>{row.name}</h2>

                    <ButtonText onClick={async () => {
                        const environment = row.name;
                        const href = row.connected ?
                            `/m3connector/application/${applicationId}/${environment}/details` :
                            `/m3connector/application/${applicationId}/${environment}/setup`;
                        history.push(href);
                    }}>{row.connected ? 'View Details' : 'Setup'}</ButtonText>
                </>
            ))
            }
        </>
    );
};



