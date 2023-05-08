// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import React from 'react';
import { Box } from '@mui/material';
import { Button } from '@dolittle/design-system';

import { ServiceAccountListDto } from '../../../../../apis/integrations/generated';
import { formatDate } from '../../../../../utils/helpers/dates';

export type CredentialsListProps = {
    credentials: ServiceAccountListDto[];
    onDelete: (serviceAccountName: string) => void;
};

export const CredentialsList = (props: CredentialsListProps) => {


    return (
        <>
            {props.credentials.map((credential) => (
                <Box key={credential.serviceAccountName}>
                    {credential.serviceAccountName}
                    {credential.description}
                    {formatDate(credential.createdAt!)}
                    {credential.createdBy}
                    <Button label='Delete credentials' startWithIcon='DeleteRounded' onClick={() => props.onDelete(credential.serviceAccountName!)} />
                </Box>
            ))}
        </>
    );

};

