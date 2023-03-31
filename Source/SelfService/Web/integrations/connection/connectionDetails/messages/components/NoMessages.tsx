// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Icon } from '@dolittle/design-system';

import { NoEntityView } from '../../../../../components/noEntityView/noEntityView';

export type NoMessagesProps = {
    onCreateNew: () => void;
};

export const NoMessages = ({ onCreateNew }: NoMessagesProps) =>
    <NoEntityView
        title='No message types have been created yet...'
        createEntityProps={{
            createEntityText: 'create new message types',
            createEntityIcon: <Icon icon='MessageRounded' />,
            onCreateEntity: onCreateNew,
        }}
        description='Once you create your first message type, it will appear here.'
        subDescription={`To create a new message type, click on the ‘create new message type' button above.`}
    />;
