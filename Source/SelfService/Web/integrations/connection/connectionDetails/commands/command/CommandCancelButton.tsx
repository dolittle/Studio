// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { useNavigate } from 'react-router-dom';

import { Button } from '@dolittle/design-system';

export const CommandCancelButton = () => {
    const navigate = useNavigate();

    const handleCommandCancel = () => {
        navigate('..');
    };

    return (
        <Button label='Cancel' startWithIcon='CancelRounded' color='subtle' onClick={handleCommandCancel} />
    );
};
