// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { ConnectorQueries } from './ConnectorQueries';
import { ConnectorProjection } from './ConnectorProjection';
import { ConnectorTypeQueries } from './ConnectorTypeQueries';

export const Queries = [
    ConnectorQueries,
    ConnectorTypeQueries
];

export const Projections = [
    ConnectorProjection
];
