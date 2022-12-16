// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { FormEvent, useRef, useImperativeHandle } from 'react';

export type OnFileConfirmCallback = (form: FormData, event?) => void;
export type OnFileSelectCallback = (file: File | FileList, event?) => void;

export type FileUploadFormProps = {
    onSelected: OnFileSelectCallback;
    onConfirmed?: OnFileConfirmCallback;
    allowMultipleFiles: boolean;
};

export type FileUploadFormRef = {
    showPrompt: () => void;
    confirmSelected: () => void;
};

/**
 * Prevents default behaviour causing firefox to redirect on submit
 *
 * @param props
 * @returns
 */
export const FileUploadForm = React.forwardRef<FileUploadFormRef, FileUploadFormProps>(
    function FileUploadForm({ onSelected, onConfirmed, allowMultipleFiles = false }: FileUploadFormProps, ref: React.ForwardedRef<FileUploadFormRef>) {
        const formRef = useRef<HTMLFormElement>(null);
        const fileInputRef = useRef<HTMLInputElement>(null);

        useImperativeHandle(
            ref,
            (): FileUploadFormRef => ({
                showPrompt: () => fileInputRef?.current?.click(),
                confirmSelected: () => {
                    const event = new Event('submit', { bubbles: true, cancelable: true });
                    formRef?.current?.dispatchEvent(event);
                }
            })
        );

        /**
         *
         * @param event Serves submit event and formdata to client
         */
        const onFileSubmitted = (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const form = new FormData(event.target as HTMLFormElement);
            onConfirmed?.(form, event);
        };

        /**
         * Serves change event and file from target
         * @param event
         */
        const onFileSelect = (event: FormEvent<HTMLInputElement>) => {
            const files = (event?.target as HTMLInputElement)?.files;
            if (!files || files.length === 0) return;
            onSelected(allowMultipleFiles ? files : files[0], event);
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
