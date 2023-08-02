// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { DialogContent } from '@mui/material';
import { TextCopyBox } from '../../../../../components/TextCopyBox';


export type ViewCredentialsDialogContentProps = {
    content: string
    downloadableFileName: string;
};

export const ViewCredentialsDialogContent = ({ content, downloadableFileName }: ViewCredentialsDialogContentProps) => {
    return (
        <>
            <DialogContent sx={{ typography: 'body2' }}>
                <TextCopyBox
                    instructions={content}
                    downloadableFileName={downloadableFileName}
                />
            </DialogContent>
        </>
    );
};
