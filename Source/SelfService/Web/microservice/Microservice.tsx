// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.


// TODO validate the data
// TODO change action button from create to save
import React from 'react';
import { useHistory, useLocation } from 'react-router';

import { Create as BusinessMomentsAdaptor } from './businessMomentsAdaptor/create';
import { Create as Base } from './base/create';
import { Create as StaticSite } from './staticSite/create';
import { Create as RawDataLog } from './rawDataLog/config/create';
import { Container as PurchaseOrder } from './purchaseOrder/container';

import { HttpResponseApplications2 } from '../api/api';

import { Grid, makeStyles, Theme } from '@material-ui/core';
import { createStyles } from '@material-ui/styles';
import { SimpleCard } from './create/card';

type Props = {
    environment: string
    application: HttpResponseApplications2
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        paper: {
            padding: theme.spacing(1),
            textAlign: 'center',
            color: theme.palette.text.secondary,
        },
    }),
);


export const Create: React.FunctionComponent<Props | undefined> = (props) => {
    const history = useHistory();
    const location = useLocation();

    const classes = useStyles();
    const _props = props!;
    const environment = _props.environment;
    const searchParams = new URLSearchParams(useLocation().search);

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
            kind: 'business-miner',
            name: 'Business moment adapter',
            description: 'Integrate your data into the Dolittle platform to mine for business moments.',
            icon: (
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="20" cy="20" r="20" fill="#3B3D48" />
                    <path d="M17.4197 26.3441L17.6668 26.0036C17.9648 25.5931 18.0351 25.0667 17.8558 24.5935L17.5432 23.7749L19.2393 23.135L16.8673 16.905L10.9118 19.158C10.6647 19.2521 10.4684 19.4356 10.3594 19.6771C10.2504 19.9186 10.2431 20.1866 10.3376 20.4329L10.386 20.5633L9.55015 20.8796C9.10918 21.0463 8.8887 21.5389 9.05588 21.9759L10.0832 24.6731C10.1631 24.8856 10.323 25.0547 10.5314 25.1464C10.6429 25.1971 10.7616 25.2213 10.8803 25.2213C10.9821 25.2213 11.0838 25.202 11.1832 25.1657L12.0191 24.8494C12.1766 25.2237 12.5448 25.4555 12.9349 25.4555C13.0512 25.4555 13.1699 25.4338 13.2862 25.3903L13.5091 25.3058L15.7697 29.732C15.8545 29.901 16.0265 30 16.2058 30C16.264 30 16.3221 29.9903 16.3803 29.9686L18.321 29.2345C18.4518 29.1838 18.556 29.08 18.6069 28.9496C18.6578 28.8192 18.6481 28.6719 18.5827 28.5487L17.4197 26.3441ZM12.5884 20.8893L12.3292 20.2132L15.8884 18.8658L15.9248 18.9624L16.1452 19.5419L13.2281 20.6454L12.5884 20.8893Z" fill="#E9EAEC" />
                    <path d="M28.3547 24.2795C28.2409 24.4148 28.0737 24.4896 27.8992 24.4896C27.8605 24.4896 27.8193 24.4848 27.7781 24.4775L20.1024 22.9104L17.6553 16.4849L22.3557 10.238C22.4865 10.0642 22.7021 9.97481 22.9178 10.0062C23.1334 10.0376 23.3151 10.1825 23.3927 10.3853L28.4565 23.6855C28.5365 23.8859 28.4953 24.1153 28.3547 24.2795Z" fill="#E9EAEC" />
                    <path d="M30.4214 15.8522L28.2698 16.6635L28.0978 16.212L27.9258 15.7604L30.0773 14.9491L30.2493 15.4006L30.4214 15.8522Z" fill="#E9EAEC" />
                    <path d="M28.0176 11.7619L26.4258 13.416L26.0745 13.0827L25.7256 12.7495L27.3174 11.093L27.6663 11.4287L28.0176 11.7619Z" fill="#E9EAEC" />
                    <path d="M30.9999 19.5977L30.9224 20.5587L28.6279 20.3752L28.7079 19.4117L30.9999 19.5977Z" fill="#E9EAEC" />
                </svg>
            )
        },
        {
            kind: 'static-site',
            name: 'Static Site',
            description: 'Setup container to serve static content with ease.',
            icon: (
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M40 20C40 31.0457 31.0457 40 20 40C8.9543 40 0 31.0457 0 20C0 8.9543 8.9543 0 20 0C31.0457 0 40 8.9543 40 20Z" fill="#3B3D48" />
                    <path d="M22 10H14C12.9 10 12.01 10.9 12.01 12L12 28C12 29.1 12.89 30 13.99 30H26C27.1 30 28 29.1 28 28V16L22 10ZM24 26H16V24H24V26ZM24 22H16V20H24V22ZM21 17V11.5L26.5 17H21Z" fill="#E9EAEC" />
                </svg>
            )
        },
        {
            kind: 'raw-data-log-ingestor',
            name: 'Raw Data Log Webhook',
            description: 'Connect multiple webhooks to ingest data from your system.',
            icon: (
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M40 20C40 31.0457 31.0457 40 20 40C8.9543 40 0 31.0457 0 20C0 8.9543 8.9543 0 20 0C31.0457 0 40 8.9543 40 20Z" fill="#3B3D48" />
                    <path d="M27.9988 19.3025C28.3703 18.7972 28.5891 18.2041 28.6314 17.5881C28.6738 16.972 28.538 16.3567 28.2389 15.8094C27.9398 15.262 27.489 14.8038 26.9357 14.4847C26.3824 14.1656 25.7478 13.9979 25.1015 14H14.5013C13.618 14.0541 12.7926 14.4389 12.2046 15.0708C11.6165 15.7027 11.3132 16.5307 11.3605 17.375C11.3627 18.036 11.5527 18.684 11.9102 19.25C11.0716 19.3633 10.308 19.7728 9.77016 20.3976C9.23229 21.0225 8.95925 21.8172 9.00493 22.625C8.95762 23.4692 9.26093 24.2972 9.84899 24.9291C10.4371 25.5611 11.2624 25.9459 12.1457 26H27.4571C28.3481 26.0042 29.2077 25.686 29.863 25.1093C30.5184 24.5327 30.9209 23.7405 30.9895 22.8919C31.0582 22.0434 30.7879 21.2015 30.233 20.5356C29.6782 19.8696 28.88 19.4291 27.9988 19.3025ZM18.4273 22.625C18.4739 23.0715 18.3356 23.5177 18.0421 23.8682C17.7486 24.2186 17.3232 24.4453 16.8569 24.5C16.3906 24.4453 15.9652 24.2186 15.6717 23.8682C15.3782 23.5177 15.2399 23.0715 15.2865 22.625C15.2399 22.1784 15.3782 21.7322 15.6717 21.3818C15.9652 21.0314 16.3906 20.8046 16.8569 20.75C17.3232 20.8046 17.7486 21.0314 18.0421 21.3818C18.3356 21.7322 18.4739 22.1784 18.4273 22.625ZM14.5013 15.5C14.9676 15.5546 15.3931 15.7814 15.6865 16.1318C15.98 16.4822 16.1183 16.9285 16.0717 17.375C16.1183 17.8215 15.98 18.2678 15.6865 18.6182C15.3931 18.9686 14.9676 19.1954 14.5013 19.25C14.035 19.1954 13.6096 18.9686 13.3161 18.6182C13.0226 18.2678 12.8843 17.8215 12.9309 17.375C12.8843 16.9285 13.0226 16.4822 13.3161 16.1318C13.6096 15.7814 14.035 15.5546 14.5013 15.5ZM10.5753 22.625C10.5287 22.1784 10.667 21.7322 10.9605 21.3818C11.254 21.0314 11.6794 20.8046 12.1457 20.75C12.612 20.8046 13.0375 21.0314 13.331 21.3818C13.6244 21.7322 13.7627 22.1784 13.7161 22.625C13.7627 23.0715 13.6244 23.5177 13.331 23.8682C13.0375 24.2186 12.612 24.4453 12.1457 24.5C11.6794 24.4453 11.254 24.2186 10.9605 23.8682C10.667 23.5177 10.5287 23.0715 10.5753 22.625Z" fill="#E9EAEC" />
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
        },
    ];

    const kindViaParams = (): string => {
        if (!searchParams.has('kind')) {
            return '';
        }

        const kind = searchParams.get('kind') as string;

        if (!items.map(e => e.kind).includes(kind)) {
            return '';
        }
        return kind;
    };

    const kindFromParams = kindViaParams();

    const [microserviceTypeState, setMicroserviceTypeState] = React.useState(kindFromParams);

    const onCreate = (kind: string) => {
        searchParams.set('kind', kind);
        history.replace({ pathname: location.pathname, search: searchParams.toString() });
        setMicroserviceTypeState(kind);
    };

    if (microserviceTypeState === '') {
        return <>
            <h1>Select a microservice</h1>
            <div className={classes.root}>
                <Grid container spacing={1}>
                    {items.map(data => (
                        <Grid key={`pick-microservice-kind-${data.kind}`} item xs={4}>
                            <SimpleCard {...data} onCreate={onCreate} />
                        </Grid>
                    ))}
                </Grid>
            </div>
        </>;
    }

    return (
        <>
            <Grid
                container
                direction="column"
                justifyContent="flex-start"
                alignItems="stretch"
            >
                {microserviceTypeState === 'dolittle-microservice' && (
                    <Base application={_props.application} environment={environment} />
                )}

                {microserviceTypeState === 'business-miner' && (
                    <BusinessMomentsAdaptor application={_props.application} environment={environment} />
                )}

                {microserviceTypeState === 'raw-data-log-ingestor' && (
                    <RawDataLog application={_props.application} environment={environment} />
                )}

                {microserviceTypeState === 'static-site' && (
                    <StaticSite application={_props.application} environment={environment} />
                )}

                {microserviceTypeState === 'purchase-order-api' && (
                    <PurchaseOrder application={_props.application} environment={environment} />
                )}
            </Grid>
        </>
    );
};
