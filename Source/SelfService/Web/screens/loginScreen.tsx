// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { PrimaryButton } from '@fluentui/react/lib/Button';

export const LoginScreen: React.FunctionComponent = () => {
    return (
        <>
            <PrimaryButton text="Login" onClick={() => window.location.href = '/'} />
        </>
    );
};
