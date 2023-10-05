// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Link } from '@dolittle/design-system';

export const AlertBoxErrorTitle = 'Oops, something went wrong';

export const AlertBoxErrorMessage = () =>
    <>
        Please try again later. If problem persists, please contact <Link href='#' message='Dolittle support'
            ariaLabel='To learn more, visit our website which opens in a new window.' />.
    </>;

export const AlertBoxInfoMessage = () =>
    <>
        For more information, please contact <Link href='#' message='Dolittle support'
            ariaLabel='To learn more, visit our website which opens in a new window.' />.
    </>;
