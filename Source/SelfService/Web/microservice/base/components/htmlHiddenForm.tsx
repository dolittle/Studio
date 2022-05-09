// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';


export type OnFileAdd = (event) => void;
export type OnFileSelect = (event) => void;

export interface HTMLHiddenFormProps {
    onFileAdd: OnFileAdd,
    onFileSelect: OnFileSelect
}


export default function HTMLHiddenForm(props: HTMLHiddenFormProps) {
    return(
        <form method="put" id="config-file-selector-form" hidden onSubmit={props.onFileAdd}target="_blank">
            <input type="file" id="file-selector" name='file' onChange={props.onFileSelect} />
            <input type="submit" id="file-submit" value="Submit" />
        </form>
    );
}
