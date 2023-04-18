// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState} from 'react';
import { enqueueSnackbar } from 'notistack';
import { Button, StatusIndicator } from '@dolittle/design-system';
import { TableToolbarButton } from './TableToolbarButton';

export type DeleteMessagesProps = TableToolbarButton & {

};

export const DeleteMessagesButton = (props: DeleteMessagesProps) => {
    const [isLoading, setIsLoading] = useState(false);

    const hasSelectedMessages = props.selectedMessageTypes.length > 0;
    const hasMany = props.selectedMessageTypes.length > 1;

    const handleDeleteMessages = () => {
        setIsLoading(true);
        props.onActionExecuting();
        // eslint-disable-next-line no-restricted-globals
        setTimeout(() => {
            setIsLoading(false);
            enqueueSnackbar(`Message types${hasMany ? 's' : ''} successfully deleted`, { variant: 'success' });
            props.onSuccess();
        }, 2000);
    };


    return (
        <>
            {!isLoading
                ? <Button
                    label={`Delete message type${hasMany ? 's' : ''}...`}
                    startWithIcon='DeleteRounded'
                    onClick={handleDeleteMessages}
                    disabled={true}
                    // disabled={!hasSelectedMessages || props.isButtonActionExecuting}
                />
                :
                <StatusIndicator
                    label={`Deleting message type${hasMany ? 's' : ''}...`}
                    status='waiting'
                />
            }
        </>
    );
};
