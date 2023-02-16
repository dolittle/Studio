// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { ShortInfoWithEnvironment } from '../api/api';

import { ApplicationsChanger } from '../spaces/applications/applicationsChanger';

type TopRightMenuProps = {
    applications: ShortInfoWithEnvironment[];
    applicationId: string;
    environment: string;
};

export const TopRightMenu = ({ applications, applicationId, environment }: TopRightMenuProps) =>
    <ApplicationsChanger applications={applications} applicationId={applicationId} environment={environment} />;
