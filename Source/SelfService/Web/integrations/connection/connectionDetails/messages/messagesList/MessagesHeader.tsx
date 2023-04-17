// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useMemo } from 'react';
import { ContentHeader } from '../../../../../components/layout/Content/ContentHeader';

export type MessagesHeadeProps = {
    selectedMessageTypeIds: string[];
};

export const MessagesHeader = (props: MessagesHeadeProps) => {

    const hasSelectedMessages = props.selectedMessageTypeIds.length > 0;

    const messagesToolbarButtons = useMemo(() => [
        {
            label: 'Delete messages',
            startWithIcon: 'DeleteRounded',
            disabled: true,
        } as const,
        {
            label: 'Copy Messages to...',
            startWithIcon: 'CopyAllRounded',
            disabled: true,
        } as const,
        {
            label: 'Deploy message(s)...',
            startWithIcon: 'RocketLaunch',
            disabled: !hasSelectedMessages,
        } as const,
    ], [hasSelectedMessages]);

    return (
        <ContentHeader
            title='Your Messages'
            buttons={messagesToolbarButtons}
            titleTextVariant='subtitle'
            sx={{ minHeight: 64 }}
        />
    );

};
