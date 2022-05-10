// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useRef, useImperativeHandle } from 'react';

export type OnFileAdd = (form: FormData, event?) => void;
export type OnFileSelect = (file: File, event?) => void;

export interface HTMLHiddenFormProps {
    onFileAdd: OnFileAdd,
    onFileSelect: OnFileSelect
};

export type HTMLHiddenFormRef = {
    promptForFile: () => void,
    confirmSelectedFile: () => void
};

/**
 * Prevents default behaviour causing firefox to redirect on submit
 *
 * @param props
 * @returns
 */
export const HTMLHiddenForm = React.forwardRef<HTMLHiddenFormRef, HTMLHiddenFormProps>(
    (props: HTMLHiddenFormProps, ref: React.ForwardedRef<HTMLHiddenFormRef>) => {
        const formRef = useRef<HTMLFormElement>(null);
        const fileInputRef = useRef<HTMLInputElement>(null);

        useImperativeHandle(
            ref,
            (): HTMLHiddenFormRef => ({
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
            props.onFileAdd(form, event);
        };


        /**
         * Serves change event and file from target
         * @param event
         */
        const onFileSelected = (event) => {
            const file = event?.target?.files[0];
            props.onFileSelect(file, event);
        };

        return (
            <form ref={formRef} method="put" id="config-file-selector-form" hidden onSubmit={onFileSubmitted}>
                <input
                    type="file"
                    id="file-selector"
                    name='file'
                    onChange={onFileSelected}
                    ref={fileInputRef}
                />
                <input type="submit" id="file-submit" value="Submit" />
            </form>
        );
    });
