// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState, useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { Collapse, Box, Typography } from '@mui/material';
import { AlertBox, ContentSection } from '@dolittle/design-system';
import { useConnectionIdFromRoute } from '../../../../routes.hooks';
import { GenerateServiceAccountForm } from './GenerateServiceAccountForm';

export type ServiceAccountsSectionProps = {};

export const ServiceAccountsSection = (props: ServiceAccountsSectionProps) => {
    const { enqueueSnackbar } = useSnackbar();
    const connectionId = useConnectionIdFromRoute();
    const [expandForm, setExpandForm] = useState(false);
    const [activeEntry, setActiveEntry] = useState<string | undefined>(undefined);
    const [resetForm, setResetForm] = useState(false);

    const isLoading = false;
    const isError = false;
    const error = '';

    const items = [];

    const allowGenerateNew = !expandForm || (expandForm && !!activeEntry);

    const handleNewGenerated = (tokenName: string) => {
        setActiveEntry(tokenName);
    };

    const handleGenerateNewEntry = () => {
        setActiveEntry(undefined);
        setResetForm(true);
        setExpandForm(true);
    };

    const handleFormCancelled = () => {
        if (items.length) {
            setExpandForm(false);
        }
        setResetForm(true);
    };

    useEffect(() => {
        if (expandForm && !isLoading) {
            setExpandForm(true);
        } else {
            const shouldExpand = !isLoading && (items.length === 0 || activeEntry !== undefined);
            setExpandForm(shouldExpand);
        }

    }, [items, activeEntry, expandForm, isLoading]);

    useEffect(() => {
        //TODO: Pav - no like this
        if (resetForm) {
            setResetForm(false);
        }
    }, [resetForm]);

    if (isError) return <AlertBox message={`Error while fetching credentials list. ${error}`} />;

    return (
        <ContentSection
            title='Service Accounts'
            headerProps={{
                buttons:[
                    {
                        label: 'Generate new service account',
                        variant: 'outlined',
                        onClick: handleGenerateNewEntry,
                        disabled: !allowGenerateNew
                    }
                ]
            }}
        >
             <Collapse in={expandForm}>
                <ContentSection hideDivider={!expandForm} title='Generate New Credentials'>
                    <GenerateServiceAccountForm
                        resetForm={resetForm}
                        connectionId={connectionId}
                        onFormComplete={handleNewGenerated}
                        onFormCancelled={handleFormCancelled}
                        canCancel={items.length > 0}
                    />
                </ContentSection>
            </Collapse>


        </ContentSection>
    );
};
