// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import TextareaAutosize from '@mui/material/TextareaAutosize';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getData, M3ConnectorData } from '../api/m3connector';

type Props = {
    applicationId: string
};

export const View: React.FunctionComponent<Props> = (props) => {
    const _props = props!;
    const applicationId = _props.applicationId;
    const { environment } = useParams();

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
            <h2>Config</h2>
            <TextareaAutosize
                value={JSON.stringify(data.config, null, '  ')}
                style={{ width: 600 }}
            />

            <h2>accessKey.pem</h2>
            <TextareaAutosize
                value={data.accessKey}
                style={{ width: 600 }}
            />

            <h2>ca.pem</h2>
            <TextareaAutosize
                value={data.ca}
                style={{ width: 600 }}
            />


            <h2>certificate.pem</h2>
            <TextareaAutosize
                value={data.certificate}
                style={{ width: 600 }}
            />

        </>
    );
};
