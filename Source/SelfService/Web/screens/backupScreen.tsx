// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { useLocation } from 'react-router-dom';

type Props = {
};

export const BackupScreen: React.FunctionComponent<Props> = (props) => {
    const location = useLocation();
    console.log(location);
    const _props = props!;
    return (
        <>
            <h1>Todo</h1>
        </>
    );
};
