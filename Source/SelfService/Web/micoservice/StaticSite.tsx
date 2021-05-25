// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import React from 'react';
import { Stack } from '@fluentui/react/lib/Stack';

const stackTokens = { childrenGap: 15 };

type Props = {
    applicationId: string
    environment: string
};

export const Microservice: React.FunctionComponent<Props> = (props) => {
    const _props = props!;
    return (
        <Stack tokens={stackTokens}>
            <h1>TODO Static Site</h1>
        </Stack>
    );
};
