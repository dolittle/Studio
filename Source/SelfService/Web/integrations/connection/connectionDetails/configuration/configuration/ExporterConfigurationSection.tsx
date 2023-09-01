// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { ContentParagraph, ContentSection, Input, Link, Switch } from '@dolittle/design-system';

export type CronFormParameters = {
    cronExpression: string;
};

export type ExporterConfigurationSectionProps = {
    canEdit: boolean;
};

export const ExporterConfigurationSection = ({ canEdit }: ExporterConfigurationSectionProps) => {

    return (
        <>
            <ContentSection title='Cron Expression'>
                <ContentParagraph>
                    The Exporter is usually configured to force update all data every nightly as a way to ensure the system is in sync. You can override this setting by supplying your own <Link message='cron expression' href='https://crontab.cronhub.io/' target />.
                </ContentParagraph>
                <Input
                    id='cronExpression'
                    label='Cron Expression'
                    disabled={!canEdit} />
            </ContentSection>
            <ContentSection title='Require strict certificate validation'>
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
