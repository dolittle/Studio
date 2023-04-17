// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { Button } from '@dolittle/design-system';
import { TableToolbarButton } from './TableToolbarButton';

export type CopyMessagesProps = TableToolbarButton & {

};

export const CopyMessagesButton = (props: CopyMessagesProps) => {

    const hasSelectedMessages = props.selectedIds.length > 0;
    const hasMany = props.selectedIds.length > 1;

    const handleCopyMessages = () => {

    };


    return <Button
        label={`Copy message${hasMany ? 's' : ''} to...`}
        startWithIcon='CopyAllRounded'
        onClick={() => handleCopyMessages}
        disabled={!hasSelectedMessages}
    />;
};
