// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { Button, ButtonProps } from '@dolittle/design-system/';
import { SvgIcons } from '@dolittle/design-system/theming/Icons/Icons';

export type CreateConnectionButtonProps = {
    onClick: () => void;
    buttonProps?: Partial<ButtonProps>;
};

export const CreateConnectionButton = ({ onClick, buttonProps }: CreateConnectionButtonProps) => {
    return (
        <Button
            label='Set up new connection'
            variant='fullwidth'
            startWithIcon={SvgIcons.PolylineRounded}
            onClick={onClick}
            sx={{ mt: 2.125 }}
            {...buttonProps}
        />

    );
};

