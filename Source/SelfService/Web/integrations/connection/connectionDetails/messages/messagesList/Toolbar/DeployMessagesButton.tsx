// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState } from 'react';
import { enqueueSnackbar} from 'notistack';
import { Button, StatusIndicator } from '@dolittle/design-system';
import { TableToolbarButton } from './TableToolbarButton';

export type DeployMessagesButtonProps = TableToolbarButton & {

};

export const DeployMessagesButton = (props: DeployMessagesButtonProps) => {

    const [isLoading, setIsLoading] = useState(false);
    const hasSelectedMessages = props.selectedIds.length > 0;
    const hasMany = props.selectedIds.length > 1;


    const handleDeployMessages = () => {
        setIsLoading(true);
        props.onActionExecuting();
        // eslint-disable-next-line no-restricted-globals
        setTimeout(() => {
            setIsLoading(false);
            enqueueSnackbar(`Message types${hasMany ? 's' : ''} successfully deployed`, { variant: 'success' });
            props.onSuccess();
        }, 2000);
    };


    return (
        <>
            {!isLoading
                ? <Button
                    label={`Deploy message types${hasMany ? 's' : ''}...`}
                    startWithIcon='RocketLaunch'
                    onClick={handleDeployMessages}
                    disabled={!hasSelectedMessages || props.isButtonActionExecuting}
                />
                : <StatusIndicator
                    label={`Deploying message type${hasMany ? 's' : ''}...`}
                    status='waiting'
                />}
        </>
    );
};
