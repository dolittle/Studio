// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { useParams } from 'react-router-dom';

import { HttpResponseApplications2 } from '../api';
import { ViewCard } from '../backup/viewCard';

type Props = {
    application?: HttpResponseApplications2
};

export const BackupScreen: React.FunctionComponent<Props> = (props) => {
    const _props = props!;
    const application = _props.application!;
    const environments = application.environments;

    return (
        <>
            <h1>Your application backups</h1>

            <div className="serv">
                <ul>
                    {environments.map((environment) => {
                        return <li key={environment.name}>
                            <ViewCard application={application} environment={environment.name} />
                        </li>;
                    })}
                </ul>
            </div>
        </>
    );
};
