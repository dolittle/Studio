// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useRef, useState } from 'react';

import { ComponentMeta } from '@storybook/react';

import { List } from '@mui/material';
import { UploadRounded } from '@mui/icons-material';

import { Button, FileUploadForm, FileUploadFormProps } from '@dolittle/design-system';

import { FileUploadFormRef } from './FileUploadForm';

export default {
    title: 'File Upload Form',
    component: FileUploadForm,
    parameters: {
        controls: { include: [] },
        docs: {
            description: {
                component: `A file upload box is a component that allows the user to upload files to the system.`,
            },
        },
    },
    args: {
        ref: (fileUploadRef: FileUploadFormRef) => fileUploadRef,
        onSelected: file => console.log(file),
    },
} as ComponentMeta<typeof FileUploadForm>;

export const Default = (args: FileUploadFormProps) => <FileUploadForm {...args} />;

export const HiddenForm = () => {
    const fileUploadRef = useRef<FileUploadFormRef>(null);
    const [files, setFiles] = useState<File[]>([]);

    const handleFileUpload = (selected: File | FileList) => {
        const files = selected instanceof FileList ? Array.from(selected) : [selected];

        for (const file of files) {
            setFiles(prev => [...prev, file]);
        }
    };

    return (
        <>
            <Button
                label='Upload file(s)'
                type='submit'
                startWithIcon={<UploadRounded />}
                onClick={() => fileUploadRef.current?.showPrompt()}
            />

            <FileUploadForm
                ref={fileUploadRef}
                onSelected={handleFileUpload}
                allowMultipleFiles
                hideForm
            />

            {files &&
                <List>
                    {files.map(file => <li key={file.name}>{file.name}</li>)}
                </List>
            }
        </>
    );
};

export const WithValidation = () => {
    const fileUploadRef = useRef<FileUploadFormRef>(null);

    return (
        <FileUploadForm
            ref={fileUploadRef}
            onSelected={file => console.log(file)}
            validFileExtensions={['json', 'yaml', 'yml']}
        />
    );
};
