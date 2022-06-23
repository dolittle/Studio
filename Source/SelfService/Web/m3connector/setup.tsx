// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { HttpResponseApplication } from '../api/application';
import { useParams, useHistory } from 'react-router-dom';
import { ButtonText } from '../theme/buttonText';

type Props = {
    application: HttpResponseApplication
};

type ViewParams = {
    environment: string;
};

export const View: React.FunctionComponent<Props> = (props) => {
    const history = useHistory();
    const { environment } = useParams<ViewParams>();
    const _props = props!;
    const application = _props.application;
    const applicationId = application.id;

    console.log('environment', environment);

    const environmentInfo = application.environments.find(_environment => _environment.name === environment)!;
    if (!environmentInfo) {
        return <p>Environment not found</p>;
    }

    const isSetup = environmentInfo.connections.m3Connector;

    if (isSetup) {
        return (
            <>
                <p>Already setup</p>
                <ButtonText onClick={async () => {
                    const href = `/m3connector/application/${applicationId}/${environment}/details`;
                    history.push(href);
                }}>View Details</ButtonText>
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



