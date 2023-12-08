// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { NoContentSection } from '@dolittle/design-system';

export type NoCredentialsProps = {
    onCredentialCreate: () => void;
};

export const NoCredentials = ({ onCredentialCreate }: NoCredentialsProps) =>
    <NoContentSection
        title='No credentials yet...'
        description={`To generate your first credentials, select 'Generate New Credentials'. Provide a name, description and set its access rights.`}
        label='Generate new credentials'
        onCreate={onCredentialCreate}
    />;
