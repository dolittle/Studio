// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { Button } from '@dolittle/design-system';
import { TableToolbarButton } from './TableToolbarButton';

export type DeployMessagesButtonProps = TableToolbarButton & {

};

export const DeployMessagesButton = (props: DeployMessagesButtonProps) => {

    const hasSelectedMessages = props.selectedIds.length > 0;
    const hasMany = props.selectedIds.length > 1;


    const handleDeployMessages = () => {

    };


    return <Button
        label={`Deploy message${hasMany ? 's' : ''}...`}
        startWithIcon='RocketLaunch'
        onClick={() => handleDeployMessages}
        disabled={!hasSelectedMessages}
    />;
};
