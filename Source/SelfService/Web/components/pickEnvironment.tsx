// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';


import { HttpResponseApplications2, ShortInfoWithEnvironment } from '../api/api';

import {
    Link,
} from '@fluentui/react';
import { List } from '@fluentui/react/lib/List';

type Props = {
    application: HttpResponseApplications2
    onClick: (applicationId: string, environment: string) => void;
};

export const PickEnvironment: React.FunctionComponent<Props> = (props) => {
    const _props = props!;
    const application = _props.application;

    const environments: ShortInfoWithEnvironment[] = application.environments.map((environment) => {
        return {
            id: application.id,
            name: application.name,
            environment: environment.name,
        } as ShortInfoWithEnvironment;
    });

    const onRenderCell = (item?: ShortInfoWithEnvironment, index?: number | undefined): JSX.Element => {
        const application = item!;
        return (
            <Link onClick={() => {
                _props.onClick(application.id, application.environment);
            }}
                underline>
                {application.name} {application.environment}
            </Link>
        );
    };


    return (
        <>
            <h1>Pick an environment</h1>
            <List items={environments} onRenderCell={onRenderCell} />
        </>
    );
};
