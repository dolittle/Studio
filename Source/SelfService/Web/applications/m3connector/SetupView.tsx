// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import { Button } from '@dolittle/design-system';

import { HttpResponseApplication } from '../../apis/solutions/application';

type SetupViewParams = {
    environment: string;
};

export type SetupViewProps = {
    application: HttpResponseApplication;
};

export const SetupView = ({ application }: SetupViewProps) => {
    const navigate = useNavigate();
    const { environment } = useParams<SetupViewParams>();

    const applicationId = application.id;
    const environmentInfo = application.environments.find(env => env.name === environment)!;

    if (!environmentInfo) return <p>Environment not found</p>;

    const isSetup = environmentInfo.connections.m3Connector;

    if (isSetup) {
        return (
            <>
                <p>Already setup.</p>

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
