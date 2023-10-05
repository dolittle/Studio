// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useRef, useState } from 'react';

import { ComponentMeta } from '@storybook/react';

import { Box, List } from '@mui/material';

import { Button, FileUploadForm, FileUploadFormProps } from '@dolittle/design-system';

import { FileUploadFormRef } from './FileUploadForm';

export default {
    title: 'File Upload Form',
    component: FileUploadForm,
    parameters: {
        controls: { include: [] },
        docs: {
            description: {
                component: `A file upload box is a component that allows the user to upload files to the system via a button click or the drag and drop functionality.
                The container of the upload box should fill its parent container and expand in height as needed when validating or displaying files that have been uploaded.
                Upload forms are preferred to the standard upload button when space permits as they offer two convenient ways to upload a file.`,
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
                startWithIcon='UploadRounded'
                onClick={() => fileUploadRef.current?.showPrompt()}
            />

            <FileUploadForm
                ref={fileUploadRef}
                onSelected={handleFileUpload}
                allowMultipleFiles
                hideDropArea
            />

            {files &&
                <List>
                    {files.map(file => <li key={file.name}>{file.name}</li>)}
                </List>
            }
        </>
    );
};
HiddenForm.parameters = {
    docs: {
        description: {
            story: 'When space does not permit, such as in a toolbar or when grouped with several other action items, a hidden form is preferred for uploading documents.',
        },
    },
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
WithValidation.parameters = {
    docs: {
        description: {
            story: 'The files uploaded should be validated. If they are incorrect (wrong file type or too many), then an error message should display inside the upload form.',
        },
    },
};

export const WithClearingFiles = () => {
    const [files, setFiles] = useState<File | FileList>();
    const fileUploadRef = useRef<FileUploadFormRef>(null);

    return (
        <Box>
            <Button
                label='Reset Files'
                onClick={() => {
                    fileUploadRef.current?.clearSelected();
                    setFiles(undefined);
                }}
                disabled={!files}
            ></Button>
            <FileUploadForm
                ref={fileUploadRef}
                onSelected={selected => setFiles(selected)}
                validFileExtensions={['json', 'yaml', 'yml']}
            />
        </Box>
    );
};
WithClearingFiles.parameters = {
    docs: {
        description: {
            story: `It's possible to clear the files that have been selected by calling the \`clearSelected\` method on the ref. This can be practical when successfully submitting a form.`,
        },
    },
};
