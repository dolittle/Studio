// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';

import { TextareaAutosize, Typography } from '@mui/material';

import { getData, M3ConnectorData } from '../../apis/solutions/m3connector';

type ViewParams = {
    environment: string;
};

export type ViewParamsProps = {
    applicationId: string;
};

export const View = ({ applicationId }: ViewParamsProps) => {
    const { environment } = useParams<ViewParams>();

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

            <TextareaAutosize value={JSON.stringify(data.config, null, '  ')} style={{ width: '100%' }} />

            <Typography>Click on the links below, to reveal the content</Typography>

            <CollapsibleTextareaWithTitle title={'accessKey.pem'} value={data.accessKey} open={false} />
            <CollapsibleTextareaWithTitle title={'certificate.pem'} value={data.certificate} open={false} />
            <CollapsibleTextareaWithTitle title={'ca.pem'} value={data.ca} open={false} />
        </>
    );
};

type CollapsibleTextareaWithTitleProps = {
    value: string;
    title: string;
    open: boolean;
};

function CollapsibleTextareaWithTitle({ value, title, open }: CollapsibleTextareaWithTitleProps) {
    const [_open, _setOpen] = useState(open);

    return (
        <>
            <Typography variant='h2' onClick={() => _setOpen(!_open)} sx={{ my: 2, textDecoration: 'underline', cursor: 'pointer' }}>
                {title}
            </Typography>

            {_open ? <TextareaAutosize value={value} style={{ width: '100%' }} /> : null}
        </>
    );
};
