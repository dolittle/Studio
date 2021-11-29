// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import React from 'react';
import { Stack } from '@fluentui/react/lib/Stack';

import { HttpResponseApplication } from '../../api/api';

const stackTokens = { childrenGap: 15 };

type Props = {
    application: HttpResponseApplication
    environment: string
};

export const Create: React.FunctionComponent<Props> = (props) => {
    const _props = props!;
    return (
        <Stack tokens={stackTokens}>
            <h1>TODO Static Site</h1>
            <h2>Env: {_props.environment}</h2>
            <h2>TenantID: {_props.application.tenantId}</h2>
        </Stack>
    );
};
