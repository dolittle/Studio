// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { ApplicationForListingQueries } from './listing/ApplicationForListingQueries';
import { BackupForListingQueries } from './backups/BackupForListingQueries';
import { TenantQueries } from './backups/TenantQueries';

export default [
    ApplicationForListingQueries, BackupForListingQueries, TenantQueries
];
