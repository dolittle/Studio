// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Button, ButtonProps } from '@dolittle/design-system';

export type ButtonLinkProps = ButtonProps & {
    href: string
};

export const ButtonLink = ({ href, ...props }: ButtonLinkProps) => {
    return (
        <Button
            {...props}
            overrides={{
                to: href,
                component: RouterLink,
            }}
        />
    );
};
