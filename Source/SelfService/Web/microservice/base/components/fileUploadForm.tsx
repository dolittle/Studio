// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useRef, useImperativeHandle } from 'react';

export type OnFileAdd = (form: FormData, event?) => void;
export type OnFileSelect = (file: File | FileList, event?) => void;

export interface FileUploadFormProps {
    onFileAdded: OnFileAdd;
    onFileSelected: OnFileSelect;
    allowMultipleFiles: boolean;
};

export type FileUploadFormRef = {
    promptForFile: () => void;
    confirmSelectedFile: () => void;
};

/**
 * Prevents default behaviour causing firefox to redirect on submit
 *
 * @param props
 * @returns
 */
export const FileUploadForm = React.forwardRef<FileUploadFormRef, FileUploadFormProps>(
    function FileUploadForm({ onFileAdded, onFileSelected, allowMultipleFiles = false }: FileUploadFormProps, ref: React.ForwardedRef<FileUploadFormRef>) {
        const formRef = useRef<HTMLFormElement>(null);
        const fileInputRef = useRef<HTMLInputElement>(null);

        useImperativeHandle(
            ref,
            (): FileUploadFormRef => ({
                promptForFile: () => fileInputRef?.current?.click(),
                confirmSelectedFile: () => {
                    const event = new Event('submit', { bubbles: true, cancelable: true });
                    formRef?.current?.dispatchEvent(event);
                }
            })
        );

        /**
         *
         * @param event Serves submit event and formdata to client
         */
        const onFileSubmitted = (event) => {
            event.preventDefault();
            const form = new FormData(event.target as HTMLFormElement);
            onFileAdded(form, event);
        };

        /**
         * Serves change event and file from target
         * @param event
         */
        const onFileSelect = (event: React.FormEvent<HTMLInputElement>) => {
            const files = (event?.target as HTMLInputElement)?.files;

            if (!files || files.length === 0) return;

            //console.log(files);

            onFileSelected(allowMultipleFiles ? files : files[0], event);
        };

        return (
            <form ref={formRef} method="put" id="file-selector-form" hidden onSubmit={onFileSubmitted}>
                <input
                    type="file"
                    multiple={allowMultipleFiles}
                    id="file-selector"
                    name='file'
                    onChange={onFileSelect}
                    ref={fileInputRef}
                />
                <input type="submit" id="file-submit" value="Submit" />
            </form>
        );
    });
