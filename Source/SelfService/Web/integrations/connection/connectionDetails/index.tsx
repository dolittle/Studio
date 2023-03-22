// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { Outlet } from 'react-router-dom';

export const ConnectionDetails = () => {
    return (
        <>
            Connection Details

            <Outlet />
        </>
    );
};
