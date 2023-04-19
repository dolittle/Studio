// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useMemo, useState } from 'react';
import { MessageMappingModel } from '../../../../..//apis/integrations/generated';
import { ContentHeader } from '../../../../../components/layout/Content/ContentHeader';

import { DeployMessagesButton } from './Toolbar/DeployMessagesButton';
import { DeleteMessagesButton } from './Toolbar/DeleteMessagesButton';
import { CopyMessagesButton } from './Toolbar/CopyMessagesButton';

export type MessagesHeadeProps = {
    connectionId: string;
    selectedMessageTypes: MessageMappingModel[];
    onActionSuccess: () => void
};

export const MessagesHeader = (props: MessagesHeadeProps) => {

    const [isAnyActionExecuting, setIsAnyActionExecuting] = useState<boolean>(false);

    const handleSuccess = () => {
        props.onActionSuccess();
        setIsAnyActionExecuting(false);
    };

    const handleExecuting = () => {
        setIsAnyActionExecuting(true);
    };

    return (
        <ContentHeader
            title='Your Messages'
            buttonsSlot={
                <>
                    <DeleteMessagesButton
                        connectionId={props.connectionId}
                        selectedMessageTypes={props.selectedMessageTypes}
                        onSuccess={handleSuccess}
                        onActionExecuting={handleExecuting}
                        disable={true}
                    />
                    <CopyMessagesButton
                        connectionId={props.connectionId}
                        selectedMessageTypes={props.selectedMessageTypes}
                        onSuccess={handleSuccess}
                        onActionExecuting={handleExecuting}
                        disable={true}
                    />
                    <DeployMessagesButton
                        connectionId={props.connectionId}
                        selectedMessageTypes={props.selectedMessageTypes}
                        onSuccess={handleSuccess}
                        onActionExecuting={handleExecuting}
                        disable={isAnyActionExecuting}
                    />
                </>
            }
            titleTextVariant='subtitle'
            sx={{ minHeight: 64 }}
        />
    );

};
