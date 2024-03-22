// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { useFormContext } from 'react-hook-form';
import { enqueueSnackbar } from 'notistack';

import { FileUploadForm, FileUploadFormRef, MaxWidthTextBlock, MaxWidthBlock } from '@dolittle/design-system';
import { IonConfigRequest } from '../../../../../apis/integrations/generated';

import { TextCopyBox } from '../../../../../components/TextCopyBox';

/**
 * Simple type guard to check if the object is of type IonConfigRequest.
 * Other approaches found here: https://stackoverflow.com/a/62438143/115303
 * @param o The object to check.
 * @returns o as an IonConfigRequest.
 */
function isIonConfigRequest(o: any): o is IonConfigRequest {
    return 'iu' in o &&
        'pu' in o &&
        'ot' in o &&
        'saak' in o &&
        'sask' in o &&
        'ci' in o &&
        'cs' in o;
}

export const instructions = [
    `1. Open Infor ION API. Open the menu from the upper left corner and select 'Infor ION API'.`,
    `2. Select 'Authorized Apps' from the left hand menu followed by the '+' icon to add a new account.`,
    `3. Provide a name. Example: "Aigonix_Bridge".`,
    `4. Under 'Type', select 'Backend Service'.`,
    `5. Provide a description. Example: "Integration Connector".`,
    `6. Toggle on 'Use Bridge Authentication. Optional: You can toggle on ‘User Impersonation' if you would like to monitor specific user activity.`,
    `7. Click the save icon button.`,
    `8. Scroll down and click 'Download Credentials' button. If you would like to use an account you've previously created, you can access the account via 'Authorized Apps' then selecting the account name.`,
    `9. When the dialog pops up, toggle on 'Create Service Account' and provide a username from your M3 account you would like to associate with the ION service account.`,
    `10. Last, click 'Download'. Upload the files below.`,
];

export type IonServiceAccountCredentialsProps = {
    canEdit: boolean;
};

export const IonServiceAccountCredentials = React.forwardRef<FileUploadFormRef, IonServiceAccountCredentialsProps>(function (
    props: IonServiceAccountCredentialsProps,
    ref: React.ForwardedRef<FileUploadFormRef>
) {

    const { setValue } = useFormContext();

    const handleFileUploaded = (file: File | FileList) => {
        file = file as File;
        const fileReader = new FileReader();
        fileReader.onload = (event) => {
            const contents = event.target?.result as string;
            try {
                const json = JSON.parse(contents);
                if (isIonConfigRequest(json)) {
                    setValue('ionConfiguration', json, { shouldDirty: true });
                    return;
                }
            } catch (error) {
                console.error('Error uploading ION Configuration', error);
            }
            enqueueSnackbar('Error uploading ION Configuration', { variant: 'error' });
        };

        fileReader.readAsText(file);
    };

    return <>
        <TextCopyBox instructions={instructions} withMaxWidth />

        {props.canEdit && (
            <MaxWidthBlock sx={{ mt: 2 }}>
                <FileUploadForm onSelected={handleFileUploaded} validFileExtensions={['ionapi']} ref={ref} />
            </MaxWidthBlock>
        )}
    </>;
});

IonServiceAccountCredentials.displayName = 'IonServiceAccountCredentials';
