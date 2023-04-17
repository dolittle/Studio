// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { Button } from '@dolittle/design-system';
import { TableToolbarButton } from './TableToolbarButton';

export type DeleteMessagesProps = TableToolbarButton & {

};

export const DeleteMessagesButton = (props: DeleteMessagesProps) => {

    const hasSelectedMessages = props.selectedIds.length > 0;
    const hasMany = props.selectedIds.length > 1;

    const handleDeleteMessages = () => {

    };


    return <Button
        label={`Delete message${hasMany ? 's' : ''}...`}
        startWithIcon='DeleteRounded'
        onClick={() => handleDeleteMessages}
        disabled={!hasSelectedMessages}
    />;
};
