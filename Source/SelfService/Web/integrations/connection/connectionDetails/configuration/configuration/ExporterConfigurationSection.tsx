// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { ContentSection, Form, Input, Link, Tooltip } from '@dolittle/design-system';
import { ConnectionModel } from '../../../../../apis/integrations/generated';

export type CronFormParameters = {
    cronExpression: string;
};

export type ExporterConfigurationSectionProps = {
    canEdit: boolean;
};

export const ExporterConfigurationSection = ({ canEdit }: ExporterConfigurationSectionProps) => {

    return (
        <ContentSection title='Exporter Settings'>
            <Tooltip
                tooltipTitle='Cron Expression'
                tooltipText={<>The Exporter is usually configured to force update all data every ... as a way to ensure the system is in sync. You can override this setting by supplying your own <Link message='cron expression' href='https://crontab.cronhub.io/' target /></>}
                sx={{ top: 16 }}
            >
                <Input
                    id='cronExpression'
                    label='Cron Expression'
                    disabled={!canEdit}
                />
            </Tooltip>
        </ContentSection>
    );
};
