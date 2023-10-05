// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState } from 'react';
import { enqueueSnackbar } from 'notistack';
import { Button, StatusIndicator } from '@dolittle/design-system';
import { TableToolbarButton } from './TableToolbarButton';

export type CopyMessagesProps = TableToolbarButton & {

};

export const CopyMessagesButton = (props: CopyMessagesProps) => {

    const [isLoading, setIsLoading] = useState(false);

    const hasSelectedMessages = props.selectedMessageTypes.length > 0;
    const hasMany = props.selectedMessageTypes.length > 1;

    const handleCopyMessages = () => {
        setIsLoading(true);
        props.onActionExecuting();
        // eslint-disable-next-line no-restricted-globals
        setTimeout(() => {
            setIsLoading(false);
            enqueueSnackbar(`Message types${hasMany ? 's' : ''} successfully copied`);
            props.onActionCompleted();
        }, 2000);
    };

    return (
        <>
            {!isLoading
                ? <Button
                    label={`Copy message${hasMany ? 's' : ''} to...`}
                    startWithIcon='CopyAllRounded'
                    onClick={handleCopyMessages}
                    disabled={!hasSelectedMessages || props.disable}
                />
                :
                <StatusIndicator
                    label={`Copying message type${hasMany ? 's' : ''} to...`}
                    status='waiting'
                />
            }
        </>
    );
};
