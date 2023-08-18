// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../context/globalContext';

import { SimpleCard } from '@dolittle/design-system';

import { HttpResponseApplication } from '../../apis/solutions/application';
import { getLatestBackupLinkByApplication } from '../../apis/solutions/backups';

export type BackupsListItemsProps = {
    application: HttpResponseApplication;
    environment: string;
    name: string;
};

export const BackupsListItems = ({ application, environment, name }: BackupsListItemsProps) => {
    const navigate = useNavigate();
    const { setCurrentApplicationId, setCurrentEnvironment } = useGlobalContext();

    const handleBackupsView = async () => {
        // Do we need to set the current application id here?
        setCurrentApplicationId(application.id);
        setCurrentEnvironment(environment);

        const href = `/backups/application/${application.id}/list`;
        navigate(href);
    };

    const handleBackupDownload = async (event: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>) => {
        event.stopPropagation();
        const url = await getLatestBackupLinkByApplication(application.id, environment);
        window.open(url.url, '_blank');
    };

    return (
        <SimpleCard
            title={application.name}
            subtitle={`${environment} Environment`}
            description={name}
            secondaryButton={{
                label: 'View all backups',
                onClick: handleBackupsView,
            }}
            primaryButton={{
                label: 'Download latest Backup',
                onClick: handleBackupDownload,
            }}
        />
    );
};
