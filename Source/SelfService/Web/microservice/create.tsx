// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

// TODO validate the data
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router';

import { Create as Base } from './base/create';
import { Create as PurchaseOrder } from './purchaseOrder/create';

import { HttpResponseApplication } from '../api/application';

import { Grid, Typography } from '@mui/material';
import { SimpleCard } from './create/card';

type CreateProps = {
    environment: string
    application: HttpResponseApplication
};

export const Create: React.FC<CreateProps> = ({ environment, application }: CreateProps) => {
    const history = useHistory();
    const location = useLocation();

    const searchParams = new URLSearchParams(location.search);

    const items = [
        {
            kind: 'dolittle-microservice',
            name: 'Base (default)',
            description: 'Setup a container with the Dolittle runtime ready to consume your events.',
            icon: (
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M40 20C40 31.0457 31.0457 40 20 40C8.9543 40 0 31.0457 0 20C0 8.9543 8.9543 0 20 0C31.0457 0 40 8.9543 40 20Z" fill="#3B3D48" />
                    <path d="M24.5601 18.1093L24.6152 18.0773L24.6152 12.6924L20 10L15.3845 12.6924L15.3845 18.0773L20 20.7692L24.5601 18.1093Z" fill="#E9EAEC" />
                    <path d="M19.1753 27.3401L19.2305 27.308L19.2305 21.9231L14.6152 19.2307L9.9997 21.9231L9.9997 27.308L14.6152 29.9999L19.1753 27.3401Z" fill="#E9EAEC" />
                    <path d="M29.9449 27.3401L30 27.308L30 21.9231L25.3847 19.2307L20.7692 21.9231L20.7692 27.308L25.3847 29.9999L29.9449 27.3401Z" fill="#E9EAEC" />
                </svg>
            )
        },
        {
            kind: 'purchase-order-api',
            name: 'Purchase Order',
            description: 'Integrate your purchase orders from M3.',
            icon: (
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="20" cy="20" r="20" fill="#3B3D48" />
                    <path d="M23.9626 20.48H17.7495C17.7082 20.8839 17.6072 21.2857 17.4394 21.6721L23.3158 25.0837C23.9115 24.339 24.8204 23.8906 25.7871 23.8906C26.3401 23.8906 26.8868 24.0382 27.3677 24.3176C28.8776 25.1943 29.3969 27.1424 28.5253 28.6606C27.9615 29.6427 26.9093 30.2528 25.7804 30.2528C25.2274 30.2528 24.6809 30.1052 24.2 29.8258C22.8303 29.0307 22.2797 27.3548 22.8389 25.917L16.9568 22.502C16.2037 23.4973 15.0183 24.099 13.7564 24.099C13.0553 24.099 12.3625 23.9118 11.7524 23.5575C9.83743 22.4454 9.17887 19.9741 10.2845 18.0486C10.9995 16.8032 12.3329 16.0297 13.7648 16.0297C14.4658 16.0297 15.1589 16.2169 15.7688 16.5711C16.2118 16.8282 16.5841 17.1601 16.8862 17.539L22.8389 14.083C22.2795 12.6452 22.8303 10.9693 24.2 10.1742C24.6809 9.89479 25.2274 9.74719 25.7806 9.74719C26.9098 9.74719 27.9615 10.3573 28.525 11.3391C29.3965 12.8571 28.8773 14.8054 27.3675 15.6822C26.8865 15.9615 26.3401 16.1091 25.7871 16.1091C24.8204 16.1091 23.9113 15.661 23.3158 14.9161L17.3921 18.3553C17.5635 18.7244 17.677 19.117 17.732 19.52H23.9624C24.194 17.9936 25.5051 16.8193 27.0874 16.8193C28.8327 16.8193 30.2526 18.2461 30.2526 20C30.2526 21.7539 28.8327 23.1807 27.0877 23.1807C25.5051 23.1807 24.1942 22.0064 23.9626 20.48Z" fill="#E9EAEC" />
                </svg>
            )
        }
    ];

    const kindViaParams = (): string => {
        if (!searchParams.has('kind')) {
            return '';
        }

        const kind = searchParams.get('kind') as string;

        if (!kind || !items.map(e => e.kind).includes(kind)) {
            return '';
        }

        return kind;
    };

    const [microserviceTypeState, setMicroserviceTypeState] = useState(kindViaParams());
    useEffect(() => {
        setMicroserviceTypeState(kindViaParams());
    }, [kindViaParams()]);

    const onCreate = (kind: string) => {
        searchParams.set('kind', kind);
        history.replace({ pathname: location.pathname, search: searchParams.toString() });
        setMicroserviceTypeState(kind);
    };

    if (microserviceTypeState === '') {
        return (
            <>
                <Typography variant='h1' my={3}>Microservices</Typography>

                <Grid container rowSpacing={4} columnSpacing={4} sx={{ maxInlineSize: '920px' }}>
                    {items.map(data => (
                        <Grid key={`pick-microservice-kind-${data.kind}`} item xs={6}>
                            <SimpleCard {...data} onCreate={onCreate} />
                        </Grid>
                    ))}
                </Grid>
            </>
        );
    }

    return (
        <Grid
            container
            direction="column"
            justifyContent="flex-start"
            alignItems="stretch"
        >
            {microserviceTypeState === 'dolittle-microservice' && (
                <Base application={application} environment={environment} />
            )}

            {microserviceTypeState === 'purchase-order-api' && (
                <PurchaseOrder application={application} environment={environment} />
            )}
        </Grid>
    );
};
