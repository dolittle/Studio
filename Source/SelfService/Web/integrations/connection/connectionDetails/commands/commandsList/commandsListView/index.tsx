// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { ContentContainer, ContentDivider, ContentHeader, CreateButton } from '@dolittle/design-system';

import { CommandHeader } from '../../../../../../apis/integrations/generated';

import { CommandsListDataGrid } from './commandsListDataGrid';

export type CommandsListViewProps = {
    commandListRows: CommandHeader[];
    onNewCommandCreated: () => void;
};

export const CommandsListView = ({ commandListRows, onNewCommandCreated }: CommandsListViewProps) =>
    <>
        <ContentContainer>
            <ContentHeader title='Your Commands' titleTextVariant='subtitle' />

            <ContentDivider sx={{ mb: 2 }} />

            <CommandsListDataGrid commandListRows={commandListRows} />
        </ContentContainer>

        <CreateButton label='Create New Command' icon='AddCircle' onCreate={onNewCommandCreated} sx={{ maxWidth: 1200, mt: 0 }} />
    </>;
