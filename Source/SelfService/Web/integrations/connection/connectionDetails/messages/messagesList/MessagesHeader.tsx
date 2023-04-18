// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useMemo, useState } from 'react';
import { ContentHeader } from '../../../../../components/layout/Content/ContentHeader';
import { DeployMessagesButton } from './Toolbar/DeployMessagesButton';
import { DeleteMessagesButton } from './Toolbar/DeleteMessagesButton';
import { CopyMessagesButton } from './Toolbar/CopyMessagesButton';

export type MessagesHeadeProps = {
    selectedMessageTypeIds: string[];
    onActionSuccess: () => void
};

export const MessagesHeader = (props: MessagesHeadeProps) => {

    const [isActionExecuting, setIsActionExecuting] = useState<boolean>(false);


    const handleSuccess = () => {
        props.onActionSuccess();
        setIsActionExecuting(false);
    };

    const handleExecuting = () => {
        setIsActionExecuting(true);
    };

    return (
        <ContentHeader
            title='Your Messages'
            buttonsSlot={
                <>
                    <DeleteMessagesButton
                        selectedIds={props.selectedMessageTypeIds}
                        onSuccess={handleSuccess}
                        onActionExecuting={handleExecuting}
                        isButtonActionExecuting={isActionExecuting}
                    />
                    <CopyMessagesButton
                        selectedIds={props.selectedMessageTypeIds}
                        onSuccess={handleSuccess}
                        onActionExecuting={handleExecuting}
                        isButtonActionExecuting={isActionExecuting}
                    />
                    <DeployMessagesButton
                        selectedIds={props.selectedMessageTypeIds}
                        onSuccess={handleSuccess}
                        onActionExecuting={handleExecuting}
                        isButtonActionExecuting={isActionExecuting}
                    />
                </>
            }
            titleTextVariant='subtitle'
            sx={{ minHeight: 64 }}
        />
    );

};
