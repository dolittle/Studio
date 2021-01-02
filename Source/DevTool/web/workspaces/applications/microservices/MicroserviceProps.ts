// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Application } from '@dolittle/vanir-common';
import { Workspace } from '../../../../common/workspaces';

export interface MicroserviceProps {
    workspace: Workspace;
    application: Application;
}
