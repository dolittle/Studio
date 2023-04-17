// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useMemo } from 'react';
import { ContentHeader } from '../../../../../components/layout/Content/ContentHeader';
import { DeployMessagesButton } from './Toolbar/DeployMessagesButton';
import { DeleteMessagesButton } from './Toolbar/DeleteMessagesButton';
import { CopyMessagesButton } from './Toolbar/CopyMessagesButton';

export type MessagesHeadeProps = {
    selectedMessageTypeIds: string[];
};

export const MessagesHeader = (props: MessagesHeadeProps) => {

    return (
        <ContentHeader
            title='Your Messages'
            buttonsSlot={<>
                <DeleteMessagesButton selectedIds={props.selectedMessageTypeIds} />
                <CopyMessagesButton selectedIds={props.selectedMessageTypeIds} />
                <DeployMessagesButton selectedIds={props.selectedMessageTypeIds} />
            </>}
            titleTextVariant='subtitle'
            sx={{ minHeight: 64 }}
        />
    );

};
