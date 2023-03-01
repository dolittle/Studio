// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Typography } from '@mui/material';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getData, M3ConnectorData } from '../../apis/solutions/m3connector';

type Props = {
    applicationId: string
};

type ViewParams = {
    environment: string;
};

export const View: React.FunctionComponent<Props> = (props) => {
    const _props = props!;
    const applicationId = _props.applicationId;
    const { environment } = useParams<ViewParams>();
    if(!environment){
        return null;
    }

    const [loaded, setLoaded] = useState(false);
    const [data, setData] = useState({} as M3ConnectorData);

    useEffect(() => {
        Promise.all([
            getData(applicationId, environment)
        ]).then(values => {
            setData(values[0]);
            setLoaded(true);
        });
    }, []);


    if (!loaded) {
        return null;
    }

    return (
        <>
            <Typography variant='h2' my={2}>Config</Typography>
            <TextareaAutosize
                value={JSON.stringify(data.config, null, '  ')}
                style={{ width: '100%' }}
            />
            <p>Click on the links below, to reveal the content</p>

            <CollapsibleTextareaWithTitle title={'accessKey.pem'} value={data.accessKey} open={false} />
            <CollapsibleTextareaWithTitle title={'certificate.pem'} value={data.certificate} open={false} />
            <CollapsibleTextareaWithTitle title={'ca.pem'} value={data.ca} open={false} />
        </>
    );
};


type CollapsibleTextareaWithTitleProps = {
    value: string
    title: string
    open: boolean
};

function CollapsibleTextareaWithTitle(props: CollapsibleTextareaWithTitleProps) {
    const { title, value, open } = props!;
    const [_open, _setOpen] = React.useState(open);

    const handleClick = () => {
        _setOpen(!_open);
    };

    return (
        <div >
            <Typography variant='h2' my={2}
                onClick={handleClick}
                style={{
                    textDecoration: 'underline',
                    cursor: 'pointer'
                }}>{title}</Typography>
            {_open ?
                <TextareaAutosize
                    value={value}
                    style={{ width: '100%' }}
                /> : null}
        </div>
    );
}
