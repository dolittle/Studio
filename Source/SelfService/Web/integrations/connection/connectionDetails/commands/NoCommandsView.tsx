// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { NoContentView } from '@dolittle/design-system';

export type NoCommandsViewProps = {
    onCreateNew: () => void;
};

export const NoCommandsView = ({ onCreateNew }: NoCommandsViewProps) =>
    <NoContentView
        title='No commands have been created yet...'
        label='Create New Command'
        description='Once you create your first command, it will appear here.'
        subDescription={`To create a new command, click on the ‘Create New Command' button above.`}
        onCreate={onCreateNew}
    />;
