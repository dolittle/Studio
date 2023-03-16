// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useRef } from 'react';

import { ComponentMeta } from '@storybook/react';

import { UploadRounded } from '@mui/icons-material';

import { Button, FileUploadBox, FileUploadFormProps } from '@dolittle/design-system';

import { FileUploadFormRef } from './FileUploadBox';

export default {
    title: 'File Upload Box',
    component: FileUploadBox,
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
        hiddenFileBox: false,

        // accept: '*',
        // dropzoneTextError: 'An error occurred while uploading the file',
    },
} as ComponentMeta<typeof FileUploadBox>;

export const Default = (args: FileUploadFormProps) => <FileUploadBox {...args} />;

export const HiddenFileBox = () => {
    const fileUploadRef = useRef<FileUploadFormRef>(null);

    return (
        <>
            <Button
                label='Upload file'
                type='submit'
                startWithIcon={<UploadRounded />}
                onClick={() => fileUploadRef.current?.showPrompt()}
            />

            <FileUploadBox
                ref={fileUploadRef}
                onSelected={file => console.log(file)}
                allowMultipleFiles
                hiddenFileBox
            />
        </>
    );
};
