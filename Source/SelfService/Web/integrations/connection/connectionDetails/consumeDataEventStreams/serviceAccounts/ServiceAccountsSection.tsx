// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState, useEffect, useMemo, useReducer } from 'react';
import { useSnackbar } from 'notistack';
import { Collapse } from '@mui/material';
import { AlertBox, ContentSection } from '@dolittle/design-system';
import { useConnectionIdFromRoute } from '../../../../routes.hooks';
import { useConnectionsIdKafkaServiceAccountsGet } from '../../../../../apis/integrations/kafkaServiceAccountApi.hooks';
import { GenerateServiceAccountForm } from './GenerateServiceAccountForm';
import { ServiceAccountsTableSection } from './ServiceAccountsTableSection';

export type ServiceAccountsSectionProps = {};

export const ServiceAccountsSection = (props: ServiceAccountsSectionProps) => {
    const { enqueueSnackbar } = useSnackbar();
    const connectionId = useConnectionIdFromRoute();
    const [expandForm, setExpandForm] = useState(false);
    const [resetForm, setResetForm] = useState(false);

    const { data, isLoading, isError, error } = useConnectionsIdKafkaServiceAccountsGet({ id: connectionId });

    const items = useMemo(
        () => data?.sort((a, b) => b.createdAt! > a.createdAt! ? 1 : -1) || [], [data]
    );

    const allowGenerateNew = !expandForm;

    const handleNewGenerated = (tokenName: string) => {
        setExpandForm(false);
    };

    const handleGenerateNewEntry = () => {
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
            const shouldExpand = !isLoading && (items.length === 0);
            setExpandForm(shouldExpand);
        }

    }, [items, expandForm, isLoading]);

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
                buttons: allowGenerateNew ? [
                    {
                        label: 'Generate new service account',
                        variant: 'outlined',
                        onClick: handleGenerateNewEntry,
                        disabled: !allowGenerateNew
                    }
                ] : []
            }}
        >
            <Collapse in={expandForm}>
                <ContentSection hideDivider title='Generate New Service Account'>
                    <GenerateServiceAccountForm
                        resetForm={resetForm}
                        connectionId={connectionId}
                        onFormComplete={handleNewGenerated}
                        onFormCancelled={handleFormCancelled}
                        canCancel={items.length > 0}
                    />
                </ContentSection>
            </Collapse>
            <ServiceAccountsTableSection items={items} isLoading={isLoading} connectionId={connectionId} />
        </ContentSection>
    );
};
