// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState, useEffect } from 'react';
import { Box } from '@material-ui/core';
import { getFiles, addFile, StaticFiles } from '../../../api/staticFiles';
import { ListView } from './listView';
import { UploadButton } from './upload';

type Props = {
    applicationId: string
    environment: string
    microserviceId: string
};

export type CdnInfo = {
    domain: string
    prefix: string
    path: string
};

export const View: React.FunctionComponent<Props> = (props) => {
    // TODO this should not be hardcoded
    // TODO Make sure we remove trailing slash
    const cdnInfo = {
        domain: 'https://freshteapot-taco.dolittle.cloud',
        prefix: '/doc/',
        path: '',
    } as CdnInfo;
    cdnInfo.path = `${cdnInfo.domain}${cdnInfo.prefix}`;

    const _props = props!;
    const applicationId = _props.applicationId;
    const microserviceId = _props.microserviceId;
    const environment = _props.environment;

    const [selectedFile, setSelectedFile] = useState(null);
    const [fileName, setFileName] = useState('');
    const [loading, setLoading] = useState(true);
    const [reset, setReset] = useState(false);

    const [runtimeError, setRuntimeError] = React.useState(null as any);
    const [currentFiles, setCurrentFiles] = useState({ files: [] } as StaticFiles);


    const loadData = async () => {
        try {
            const data = await getFiles(applicationId, environment, microserviceId);
            setCurrentFiles(data);
            setLoading(false);
        } catch (e) {
            console.error(e);
            setLoading(false);
            setRuntimeError(e);
        }
    };

    useEffect(() => {
        (async () => {
            loadData();
        })();
    }, []);

    if (runtimeError) {
        return <h1>Error</h1>;
    }

    const handleAfterFileDelete = async () => {
        console.log('here');
        setLoading(true);
        await loadData();
    };

    const handleCapture = ({ target }: any) => {
        setSelectedFile(target.files[0]);
    };

    const handleFileNameChange = (newValue: string) => {
        setFileName(newValue);
    };

    const handleSubmit = async () => {
        let suffix = fileName.replace(cdnInfo.path, '');
        suffix = suffix.startsWith('/') ? suffix.substring(1) : suffix;

        await addFile(applicationId, environment, microserviceId, suffix, selectedFile! as File);
        setLoading(true);
        await loadData();
        setFileName('');
        setSelectedFile(null);
        setReset(true);
    };


    let message: React.ReactNode = null;

    if (loading) {
        message = <h1>Loading files</h1>;
    }

    if (runtimeError) {
        message = <h1>Error loading files</h1>;
    }

    return (
        <>
            {message}
            <Box m={2}>
                <p>{cdnInfo.path}</p>
            </Box>

            <h1>Upload file</h1>
            <UploadButton reset={reset} cdnInfo={cdnInfo} onClick={handleSubmit} onChange={handleCapture} onNameChange={handleFileNameChange} />

            {!loading && (
                <>
                    <h1>List files</h1>
                    <ListView
                        environment={environment}
                        microserviceId={microserviceId}
                        applicationId={applicationId}
                        cdnInfo={cdnInfo}
                        data={currentFiles}
                        afterDelete={handleAfterFileDelete}
                    />
                </>
            )}
        </>

    );
};
