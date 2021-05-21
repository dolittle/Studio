// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { useParams, useHistory } from 'react-router-dom';

import { Stack } from '@fluentui/react/lib/Stack';

import { HttpResponseApplications2 } from '../api';
import { Dropdown } from '@fluentui/react/lib/Dropdown';
import { IDropdownOption } from '@fluentui/react';
import { uriWithAppPrefix } from '../store';

const stackTokens = { childrenGap: 15 };


type Props = {
    application: HttpResponseApplications2
    environment: string
};


export const EnvironmentChanger: React.FunctionComponent<Props> = (props) => {
    const _props = props!;
    const environment = _props.environment;
    const application = _props.application!;

    const environments = application.environments.map(env => {
        return { key: env.name, text: `${env.name} Environment` } as IDropdownOption;
    });

    environments.push({ key: 'newEnvironment', text: 'Create new' } as IDropdownOption);

    const environmentChanged = (event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption, index?: number) => {
        const newEnvironment = option!.key as string;
        if (newEnvironment === environment) {
            return;
        }

        if (newEnvironment === 'newEnvironment') {
            // TODO I feel there is a better way
            window.location.href = uriWithAppPrefix(`/application/${application.id}/environment/create`);
            return;
        }

        // TODO change based on the url
        const parts = window.location.pathname.split(`/${environment}/`);
        const href = `${parts[0]}/${newEnvironment}/${parts[1]}`;
        window.location.href = href;
    };

    if (!application.environments.some(e => e.name === environment)) {
        return null;
    }

    return (

        <Dropdown placeholder="Select"
            dropdownWidth="auto"
            selectedKey={environment}
            options={environments}
            onChange={environmentChanged}
        />

    );
};
