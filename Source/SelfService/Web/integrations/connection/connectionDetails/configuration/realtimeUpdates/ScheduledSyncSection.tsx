// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { ContentSection, ContentParagraph, Input, Link } from '@dolittle/design-system';

export type ScheduledSyncSectionProps = {
    canEdit: boolean;
};

export const ScheduledSyncSection = ({ canEdit }: ScheduledSyncSectionProps) =>
    <ContentSection title='Scheduled Data Sync'>
        <ContentParagraph>
            The Exporter is configured to update all data every night as a way to ensure the system is in sync. You can override this setting by supplying your own <Link label='cron expression' href='https://crontab.cronhub.io/' target />.
        </ContentParagraph>
        <Input
            id='cronExpression'
            label='Cron Expression'
            disabled={!canEdit} />
    </ContentSection>;
