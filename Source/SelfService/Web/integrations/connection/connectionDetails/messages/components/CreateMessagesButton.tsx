// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Button, Icon } from '@dolittle/design-system/';

export type CreateConnectionButtonProps = {
    onClick: () => void;
};

export const CreateMessagesButton = ({ onClick }: CreateConnectionButtonProps) =>
    <Button
        label='Create new message'
        variant='fullwidth'
        startWithIcon={<Icon icon='MessageRounded' />}
        onClick={onClick}
        sx={{ mt: 2.125 }}
    />;
