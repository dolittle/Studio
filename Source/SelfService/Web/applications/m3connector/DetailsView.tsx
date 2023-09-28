// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';

import { TextareaAutosize, Typography } from '@mui/material';

import { getData, M3ConnectorData } from '../../apis/solutions/m3connector';

import { CollapsibleTextareaWithTitle } from './CollapsibleTextareaWithTitle';

type DetailsViewParams = {
    environment: string;
};

export type DetailsViewProps = {
    applicationId: string;
};

export const DetailsView = ({ applicationId }: DetailsViewProps) => {
    const { environment } = useParams<DetailsViewParams>();

    if (!environment) return null;

    const [data, setData] = useState({} as M3ConnectorData);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        Promise.all([getData(applicationId, environment)])
            .then(values => {
                setData(values[0]);
                setIsLoaded(true);
            });
    }, []);

    if (!isLoaded) return null;

    return (
        <>
            <Typography variant='h2' my={2}>Config</Typography>

            <TextareaAutosize value={JSON.stringify(data.config, null, '  ')} style={{ width: 1 }} />

            <Typography>Click on the links below, to reveal the content</Typography>

            <CollapsibleTextareaWithTitle title={'accessKey.pem'} value={data.accessKey} open={false} />
            <CollapsibleTextareaWithTitle title={'certificate.pem'} value={data.certificate} open={false} />
            <CollapsibleTextareaWithTitle title={'ca.pem'} value={data.ca} open={false} />
        </>
    );
};
