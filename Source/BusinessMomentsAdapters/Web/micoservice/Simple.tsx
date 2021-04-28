// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import React from 'react';
import { Stack } from '@fluentui/react/lib/Stack';

const stackTokens = { childrenGap: 15 };

export const Microservice: React.FunctionComponent = () => {
    return (
        <Stack tokens={stackTokens}>
            <h1>TODO Simple</h1>
        </Stack>
    );
};
