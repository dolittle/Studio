// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useRef } from 'react';

import { ComponentMeta } from '@storybook/react';

import { UploadRounded } from '@mui/icons-material';

import { Button, FileUploadForm, FileUploadFormProps } from '@dolittle/design-system';

import { FileUploadFormRef } from './FileUploadForm';

export default {
    title: 'File Upload Form',
    component: FileUploadForm,
    parameters: {
        controls: {
            include: ['allowMultipleFiles', 'hiddenFileBox']
        },
        docs: {
            description: {
                component: `A file upload box is a component that allows the user to upload files to the system.`,
            },
        },
    },
    argTypes: {},
    args: {
        onSelected: file => console.log(file),
        allowMultipleFiles: true,
        hideForm: false,

        // accept: '*',
        // dropzoneTextError: 'An error occurred while uploading the file',
    },
} as ComponentMeta<typeof FileUploadForm>;

export const Default = (args: FileUploadFormProps) => <FileUploadForm {...args} />;

export const HiddenForm = () => {
    const fileUploadRef = useRef<FileUploadFormRef>(null);

    return (
        <>
            <Button
                label='Upload file'
                type='submit'
                startWithIcon={<UploadRounded />}
                onClick={() => fileUploadRef.current?.showPrompt()}
            />

            <FileUploadForm
                ref={fileUploadRef}
                onSelected={file => console.log(file)}
                allowMultipleFiles
                hideForm
            />
        </>
    );
};
