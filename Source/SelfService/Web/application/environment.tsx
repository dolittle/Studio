// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { useParams, useHistory } from 'react-router-dom';

import { Stack } from '@fluentui/react/lib/Stack';

import { HttpResponseApplications2 } from '../api';
import { Dropdown } from '@fluentui/react/lib/Dropdown';
import { IDropdownOption } from '@fluentui/react';

const stackTokens = { childrenGap: 15 };


type Props = {
    application?: HttpResponseApplications2
};


export const EnvironmentChanger: React.FunctionComponent<Props> = (props) => {
    const history = useHistory() as any;
    const _props = props!;
    const { environment } = useParams() as any;
    const application = _props.application!;

    const environments = application.environments.map(env => {
        return { key: env.name, text: env.name } as IDropdownOption;
    });

    environments.push({ key: 'newEnvironment', text: 'Create new' } as IDropdownOption);

    const environmentChanged = (event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption, index?: number) => {
        const newEnvironment = option!.key as string;
        if (newEnvironment === environment) {
            return;
        }

        if (newEnvironment === 'newEnvironment') {
            // TODO I feel there is a better way
            window.location.href = `/application/${application.id}/environment/create`;
            return;
        }
    };

    if (!application.environments.some(e => e.name === environment)) {
        return null;
    }

    return (
        <Stack tokens={stackTokens}>
            <Dropdown placeholder="Select"
                dropdownWidth="auto"
                label="Change Environment"
                selectedKey={environment}
                options={environments}
                onChange={environmentChanged}
            />
        </Stack>
    );
};
