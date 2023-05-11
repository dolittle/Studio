// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import React from 'react';
import { Box, Typography } from '@mui/material';
import { Button, ContentDivider } from '@dolittle/design-system';

import { ServiceAccountListDto } from '../../../../../apis/integrations/generated';
import { formatDate } from '../../../../../utils/helpers/dates';

export type CredentialsListProps = {
    credentials: ServiceAccountListDto[];
    onDelete: (serviceAccountName: string) => void;
};

export const CredentialsList = (props: CredentialsListProps) => {


    return (
        <>
            {props.credentials.map((credential, index) => (
                <React.Fragment key={credential.serviceAccountName}>
                    {index > 0 ? <ContentDivider sx={{ my: 2 }} /> : null}
                    <Box display='flex' flexDirection='column' gap={3} alignItems='flex-start'>
                        <Box>
                            Name: {credential.serviceAccountName}
                            <br />
                            Description: {credential.description}
                        </Box>
                        <Typography variant='body2' color='text.secondary'>These credentials were created on {formatDate(credential.createdAt!)}</Typography>
                        <Button
                            label='Delete credentials'
                            variant='outlined'
                            onClick={() => props.onDelete(credential.serviceAccountName!)}
                        />
                    </Box>
                </React.Fragment>
            ))}
        </>
    );

};

