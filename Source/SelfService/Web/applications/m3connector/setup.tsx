// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { useParams, useNavigate } from 'react-router-dom';

import { Button } from '@dolittle/design-system';

import { HttpResponseApplication } from '../../apis/solutions/application';

type ViewParams = {
    environment: string;
};

export type M3ConnectorSetupProps = {
    application: HttpResponseApplication;
};

export const View = ({ application }: M3ConnectorSetupProps) => {
    const navigate = useNavigate();
    const { environment } = useParams<ViewParams>();

    const applicationId = application.id;
    const environmentInfo = application.environments.find(_environment => _environment.name === environment)!;

    if (!environmentInfo) return <p>Environment not found</p>;

    const isSetup = environmentInfo.connections.m3Connector;

    if (isSetup) {
        return (
            <>
                <p>Already setup</p>

                <Button
                    label='View Details'
                    onClick={async () => {
                        const href = `/m3connector/application/${applicationId}/${environment}/details`;
                        navigate(href);
                    }}
                />
            </>
        );
    }

    return (
        <>
            <p>Environment {environment}</p>
            <p>ApplicationId {applicationId}</p>
            <p>TODO: trigger creation of m3connector kafka setup (@joel)</p>
        </>
    );
};
