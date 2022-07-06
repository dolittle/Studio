// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSnackbar } from 'notistack';

import {
    DocumentCard,
} from '@fluentui/react';
import { cardStyles } from '../theme/viewCard';

import './microservice.scss';
import { Typography } from '@mui/material';

type Props = {
    microserviceName: string
    microserviceId: string
    microserviceKind: string
    applicationId: string
    environment: string
    canDelete: boolean
};

const kindTitles = {
    'simple': {
        subTitle: 'Base default microservice', // TODO this should not be called simple
        icon: (<svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.8371 7.29842L13.8867 7.26953L13.8867 2.42318L9.73297 -1.81566e-07L5.57903 2.42318L5.57903 7.26953L9.73297 9.69231L13.8371 7.29842Z" fill="#B39DDB" />
            <path d="M8.9909 15.6061L9.04053 15.5772L9.04053 10.7309L4.88678 8.30771L0.732835 10.7309L0.732834 15.5772L4.88678 18L8.9909 15.6061Z" fill="#B39DDB" />
            <path d="M18.6833 15.6061L18.7329 15.5772L18.7329 10.7309L14.5792 8.30771L10.4252 10.7309L10.4252 15.5772L14.5792 18L18.6833 15.6061Z" fill="#B39DDB" />
        </svg>),
    },
    'raw-data-log-ingestor': {
        subTitle: 'Webhook microservice',
        icon: ''
    },
    'purchase-order-api': {
        subTitle: 'Purchase Order microservice',
        icon: (
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="20" cy="20" r="20" fill="#3B3D48" />
                <path d="M23.9626 20.48H17.7495C17.7082 20.8839 17.6072 21.2857 17.4394 21.6721L23.3158 25.0837C23.9115 24.339 24.8204 23.8906 25.7871 23.8906C26.3401 23.8906 26.8868 24.0382 27.3677 24.3176C28.8776 25.1943 29.3969 27.1424 28.5253 28.6606C27.9615 29.6427 26.9093 30.2528 25.7804 30.2528C25.2274 30.2528 24.6809 30.1052 24.2 29.8258C22.8303 29.0307 22.2797 27.3548 22.8389 25.917L16.9568 22.502C16.2037 23.4973 15.0183 24.099 13.7564 24.099C13.0553 24.099 12.3625 23.9118 11.7524 23.5575C9.83743 22.4454 9.17887 19.9741 10.2845 18.0486C10.9995 16.8032 12.3329 16.0297 13.7648 16.0297C14.4658 16.0297 15.1589 16.2169 15.7688 16.5711C16.2118 16.8282 16.5841 17.1601 16.8862 17.539L22.8389 14.083C22.2795 12.6452 22.8303 10.9693 24.2 10.1742C24.6809 9.89479 25.2274 9.74719 25.7806 9.74719C26.9098 9.74719 27.9615 10.3573 28.525 11.3391C29.3965 12.8571 28.8773 14.8054 27.3675 15.6822C26.8865 15.9615 26.3401 16.1091 25.7871 16.1091C24.8204 16.1091 23.9113 15.661 23.3158 14.9161L17.3921 18.3553C17.5635 18.7244 17.677 19.117 17.732 19.52H23.9624C24.194 17.9936 25.5051 16.8193 27.0874 16.8193C28.8327 16.8193 30.2526 18.2461 30.2526 20C30.2526 21.7539 28.8327 23.1807 27.0877 23.1807C25.5051 23.1807 24.1942 22.0064 23.9626 20.48Z" fill="#E9EAEC" />
            </svg>
        )
    }
};

export const ViewCard: React.FunctionComponent<Props> = (props) => {
    const history = useHistory();
    const { enqueueSnackbar } = useSnackbar();

    const _props = props!;
    const microserviceName = _props.microserviceName;
    const microserviceId = _props.microserviceId;
    const microserviceKind = _props.microserviceKind;
    const applicationId = _props.applicationId;
    const environment = _props.environment;
    const canDelete = _props.canDelete;

    // Today we do not store the microservice type in the cluster, making it hard to say what it is
    const subTitle = kindTitles[microserviceKind] ? kindTitles[microserviceKind].subTitle : '';
    const kindIcon = kindTitles[microserviceKind] ? kindTitles[microserviceKind].icon : '';

    const onClickDelete = (event: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>): void => {
        // Looking forward to dropping fluent, this is needed due to the onclick on the documentcardimport { useSnackbar } from 'notistack';
        event.stopPropagation();
        event.preventDefault();

        if (!canDelete) {
            enqueueSnackbar('Deleting microservice is disabled', { variant: 'error' });
            return;
        }

        const href = `/microservices/application/${applicationId}/${environment}/view/${microserviceId}/delete`;
        history.push(href);
    };

    const onClickView = () => {
        const href = `/microservices/application/${applicationId}/${environment}/view/${microserviceId}`;
        history.push(href);
    };

    return (
        <DocumentCard styles={cardStyles} onClick={onClickView}>
            <div className="microserviceViewCard">
                <div style={{
                    float: 'right',
                    paddingTop: '5px',
                    paddingRight: '5px'
                }}>
                    {kindIcon}
                </div>

                <Typography variant='h1' my={2}>{microserviceName}</Typography>
                <Typography variant='h2' my={2}>{subTitle}</Typography>
                <div className="bottomBar">
                    <a href="#"
                        onClick={onClickDelete}
                        className="left"
                    >
                        Delete
                    </a>
                </div>
            </div>
        </DocumentCard >
    );
};
