// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { ContentParagraph, ContentSection, Switch } from '@dolittle/design-system';

export type SettingsFormContentProps = {
    canEdit: boolean;
};

export const SettingsFormContent = ({ canEdit }: SettingsFormContentProps) => {

    return (
        <>
            <ContentSection title='Use strict certificate validation'>
                <ContentParagraph>
                    If enabled, the Exporter will only accept connections to servers with valid certificates. For some on premise solutions it may be required to disable this setting.
                </ContentParagraph>
                <Switch
                    id='strictCertificateValidation'
                    label='Strict certificate validation'
                    disabled={!canEdit} />
            </ContentSection>
        </>
    );
};
