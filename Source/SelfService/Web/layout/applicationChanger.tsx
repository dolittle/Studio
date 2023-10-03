// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { useGlobalContext } from '../context/globalContext';

import { getSelectionMenuItems, DropdownMenuProps, MenuItemProps } from '@dolittle/design-system';

import { ShortInfo } from '../apis/solutions/api';
import { getApplication, getApplicationsListing, getLiveApplications, HttpResponseApplication } from '../apis/solutions/application';

import { ApplicationCreateDialog } from '../components/applicationCreateDialog';

export const ApplicationChanger = () => {
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const { currentApplicationId, setCurrentApplicationId } = useGlobalContext();

    const [applications, setApplications] = useState([] as ShortInfo[]);
    const [liveApplications, setLiveApplications] = useState([] as ShortInfo[]);
    const [application, setApplication] = useState({} as HttpResponseApplication);
    const [canCreateApplication, setCanCreateApplication] = useState(false);
    const [createSpaceDialogOpen, setCreateSpaceDialogOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!currentApplicationId) {
            enqueueSnackbar('No application found with this ID.', { variant: 'error' });
            navigate('/applications');
            return;
        };

        Promise.all([
            getApplicationsListing(),
            getLiveApplications(),
            getApplication(currentApplicationId),
        ]).then(values => {
            setApplications(values[0].applications);
            setLiveApplications(values[1].applications);
            setApplication(values[2]);
            setCanCreateApplication(values[0].canCreateApplication);
            setIsLoading(false);
        }).catch(() => {
            enqueueSnackbar('Failed getting data from the server.', { variant: 'error' });
            navigate('/applications');
            return;
        });
    }, []);

    if (isLoading) return null;

    const applicationMenuItems = () => {
        const menuItems: DropdownMenuProps['menuItems'] = applications.map(application => {
            return {
                id: application.id,
                label: application.name,
                onSelect: (menuItem: MenuItemProps) => handleApplicationChange(menuItem),
            };
        });

        menuItems.push({
            id: 'create-new-application',
            label: 'Create New application',
            icon: 'AddBoxRounded',
            onSelect: () => handleApplicationCreate(),
        });

        return menuItems;
    };

    const handleApplicationChange = (menuItem: MenuItemProps) => {
        if (menuItem.id === currentApplicationId) return;

        if (liveApplications.some(application => application.id === menuItem.id)) {
            setCurrentApplicationId(menuItem.id);
            window.location.href = 'selfservice/home'; // TODO: stay on the same page?
            return false;
        } else {
            navigate(`/building`);
            return;
        }
    };

    const handleApplicationCreate = () => {
        if (!canCreateApplication) {
            enqueueSnackbar('Currently disabled. Please reach out via freshdesk or teams.', { variant: 'error' });
            return;
        }

        setCreateSpaceDialogOpen(true);
    };

    return (
        <>
            <ApplicationCreateDialog isOpen={createSpaceDialogOpen} onClose={() => setCreateSpaceDialogOpen(false)} />
            {getSelectionMenuItems(applicationMenuItems(), application.name)}
        </>
    );
};
