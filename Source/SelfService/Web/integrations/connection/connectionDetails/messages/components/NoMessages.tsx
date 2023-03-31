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
        title='No messages created yet...'
        createEntityProps={{
            createEntityText: 'Create new message',
            createEntityIcon: <Icon icon='MessageRounded' />,
            onCreateEntity: onCreateNew,
        }}
        description='After you create your first message it will appear here.'
    // subDescription='The Dolittle platform currently supports M3 integrations. We are looking to expand this in the future to other ERP systems,
    //     so be sure to check back in or let us know what your needs are!'
    />;
