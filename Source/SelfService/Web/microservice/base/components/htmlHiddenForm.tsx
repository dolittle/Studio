// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';


export type OnFileAdd = (form: FormData, event?) => void;
export type OnFileSelect = (file: File, event?) => void;

export interface HTMLHiddenFormProps {
    onFileAdd: OnFileAdd,
    onFileSelect: OnFileSelect
}


/**
 * Prevents default behaviour causing firefox to redirect on submit
 *
 * @param props
 * @returns
 */
export default function HTMLHiddenForm(props: HTMLHiddenFormProps) {

    /**
     *
     * @param event Serves submit event and formdata to client
     */
    const onFileAdd = (event) => {
        event.preventDefault();

        const form = new FormData(event.target as HTMLFormElement);

        props.onFileAdd(form, event);
    };


    /**
     * Serves change event and file from target
     * @param event
     */
    const onFileSelect = (event) => {
        const file = event?.target?.files[0];

        props.onFileSelect(file, event);
    };

    return(
        <form method="put" id="config-file-selector-form" hidden onSubmit={onFileAdd}>
            <input type="file" id="file-selector" name='file' onChange={onFileSelect} />
            <input type="submit" id="file-submit" value="Submit" />
        </form>
    );
}
