// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { useLocation, useMatch, useParams } from 'react-router-dom';

export type DebugRouterProps = {
    children?: React.ReactNode;
};

export const DebugRouter = ({ children }: DebugRouterProps) => {
    const location = useLocation();
    const params = useParams();
    const match = useMatch(location.pathname);
    if (process.env.NODE_ENV === 'development') {
        console.log(`Location: ${JSON.stringify(location)}`);
        console.log(`Match: ${JSON.stringify(match)}`);
        console.log(`Params: ${JSON.stringify(params)}`);
    };

    return <>{children}</>;
};

