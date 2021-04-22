// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { ApplicationEventHandler } from '../../external/applications/ApplicationEventHandler';
import { ApplicationProjection } from './ApplicationProjection';
import { ApplicationStatisticsProjection } from './ApplicationStatisticsProjection';
import { ApplicationQueries } from './ApplicationQueries';

export const Queries = [
    ApplicationQueries
];

export const EventHandlers = [
    ApplicationEventHandler
];

export const Projections = [
    ApplicationProjection,
    ApplicationStatisticsProjection
];
