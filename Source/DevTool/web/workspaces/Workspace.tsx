// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect } from 'react';
import { withViewModel } from '@dolittle/vanir-react';
import { WorkspaceViewModel } from './WorkspaceViewModel';
import { BrowserRouter as Router, Route, useParams, useRouteMatch } from 'react-router-dom';
import { Application } from './applications/Application';

type WorkspaceRouteParams = {
    workspaceId: string;
};

export const Workspace = withViewModel(WorkspaceViewModel, ({ viewModel }) => {
    const { path } = useRouteMatch();
    const params = useParams<WorkspaceRouteParams>();
    viewModel.setWorkspaceId(params.workspaceId);

    return (
        <>
            <Route path={`${path}/application/:applicationId`}>
                <Application workspace={viewModel.workspace} />
            </Route>
        </>
    );
});
