// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { useHistory } from 'react-router-dom';
import { useGlobalContext } from '../stores/notifications';
import {
    DocumentCard,
} from '@fluentui/react';
import { cardStyles } from '../theme/viewCard';

import { deleteMicroservice } from '../stores/microservice';
import './microservice.scss';

type Props = {
    microserviceName: string
    microserviceId: string
    microserviceKind: string
    applicationId: string
    environment: string
    canEdit: boolean
    canDelete: boolean
    onAfterDelete: (microserviceId: string, environment: string) => void;
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
    'static-site': {
        subTitle: 'Static files microservice',
        icon: (<svg width="15" height="18" viewBox="0 0 15 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.1348 0.000366211H5.02505C5.06689 0.118787 5.09113 0.244487 5.09113 0.375381V4.07275C5.09113 4.6931 4.5865 5.19773 3.96615 5.19773H0.673798C0.543406 5.19773 0.41757 5.17274 0.298828 5.13053V16.6688C0.298828 17.4038 0.898807 18 1.63005 18H13.1348C13.8698 18 14.466 17.4038 14.466 16.6688V1.33161C14.466 0.596614 13.8698 0.000366211 13.1348 0.000366211ZM12.0082 15.8447H2.75914C2.55206 15.8447 2.38415 15.6768 2.38415 15.4697V7.63903C2.38415 7.43194 2.55206 7.26404 2.75914 7.26404C2.96623 7.26404 3.13414 7.43194 3.13414 7.63903V15.0947H4.63136V13.198C4.63136 12.9909 4.79926 12.823 5.00635 12.823C5.21344 12.823 5.38134 12.9909 5.38134 13.198V15.0947H7.37642V11.3483C7.37642 11.1412 7.54432 10.9733 7.75141 10.9733C7.9585 10.9733 8.1264 11.1412 8.1264 11.3483V15.0947H10.1215V9.49843C10.1215 9.29134 10.2894 9.12343 10.4965 9.12343C10.7036 9.12343 10.8715 9.29134 10.8715 9.49843V15.0947H12.0082C12.2152 15.0947 12.3832 15.2627 12.3832 15.4697C12.3832 15.6768 12.2152 15.8447 12.0082 15.8447Z" fill="#B39DDB" />
            <path d="M0.673012 4.44808H3.96543C4.1717 4.44808 4.34043 4.27932 4.34043 4.07308V0.375642C4.34043 0.218152 4.24295 0.0794064 4.10045 0.0231484C3.95419 -0.0293331 3.7892 0.00815694 3.68419 0.128157L0.395521 3.82558C0.298019 3.93434 0.271767 4.09183 0.331779 4.22682C0.391767 4.36181 0.526759 4.44808 0.673012 4.44808Z" fill="#B39DDB" />
        </svg>
        )
    },
    'business-moments-adaptor': {
        subTitle: 'Business moment adapter microservice',
        icon: (<svg width="21" height="18" viewBox="0 0 21 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.01789 14.7097L8.23955 14.4033C8.50686 14.0338 8.56988 13.56 8.40906 13.1341L8.12872 12.3974L9.64997 11.8215L7.52239 6.21457L2.18062 8.24218C1.95896 8.32694 1.78293 8.4921 1.68513 8.70942C1.58734 8.92675 1.58082 9.16797 1.66557 9.38964L1.70904 9.50699L0.959276 9.79169C0.56375 9.94164 0.365988 10.385 0.51594 10.7783L1.43738 13.2058C1.5091 13.3971 1.65253 13.5492 1.83943 13.6318C1.9394 13.6774 2.04588 13.6991 2.15237 13.6991C2.24365 13.6991 2.33492 13.6817 2.42402 13.6491L3.17378 13.3645C3.31504 13.7013 3.64537 13.9099 3.99526 13.9099C4.09957 13.9099 4.20606 13.8904 4.31038 13.8513L4.51031 13.7752L6.53792 17.7587C6.61399 17.9108 6.76829 17.9999 6.9291 17.9999C6.98126 17.9999 7.03342 17.9912 7.08558 17.9717L8.82632 17.311C8.94368 17.2654 9.03712 17.1719 9.08276 17.0546C9.1284 16.9372 9.11971 16.8047 9.06103 16.6938L8.01789 14.7097ZM3.68449 9.80038L3.45196 9.19188L6.64441 7.97922L6.67701 8.06615L6.87477 8.58772L4.25822 9.58088L3.68449 9.80038Z" fill="#B39DDB" />
            <path d="M17.8259 12.8515C17.7238 12.9732 17.5738 13.0406 17.4174 13.0406C17.3826 13.0406 17.3457 13.0363 17.3087 13.0297L10.424 11.6193L8.229 5.83639L12.445 0.214273C12.5624 0.0578011 12.7558 -0.0226079 12.9492 0.00564394C13.1427 0.0338958 13.3056 0.164289 13.3752 0.346839L17.9172 12.3169C17.9889 12.4973 17.952 12.7038 17.8259 12.8515Z" fill="#B39DDB" />
            <path d="M19.6793 5.26704L17.7495 5.99723L17.5952 5.59084L17.4409 5.18445L19.3707 4.45425L19.525 4.86065L19.6793 5.26704Z" fill="#B39DDB" />
            <path d="M17.5236 1.58578L16.0958 3.07443L15.7807 2.77453L15.4678 2.47462L16.8956 0.983795L17.2085 1.28587L17.5236 1.58578Z" fill="#B39DDB" />
            <path d="M20.1989 8.63789L20.1293 9.50283L18.0713 9.33767L18.143 8.47055L20.1989 8.63789Z" fill="#B39DDB" />
        </svg>
        )
    },
    'raw-data-log-ingestor': {
        subTitle: 'Webhook microservice',
        icon: ''
    }
};

export const ViewCard: React.FunctionComponent<Props> = (props) => {
    const { setNotification } = useGlobalContext();
    const history = useHistory();
    const _props = props!;
    const microserviceName = _props.microserviceName;
    const microserviceId = _props.microserviceId;
    const microserviceKind = _props.microserviceKind;
    const applicationId = _props.applicationId;
    const environment = _props.environment;
    const canEdit = _props.canEdit;
    const canDelete = _props.canDelete;

    // Today we do not store the microservice type in the cluster, making it hard to say what it is
    const subTitle = kindTitles[microserviceKind] ? kindTitles[microserviceKind].subTitle : '';
    const kindIcon = kindTitles[microserviceKind] ? kindTitles[microserviceKind].icon : '';

    const onClickStopPropagation = (event: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>): void => {
        event.stopPropagation();
        event.preventDefault();
    };

    const onClickDelete = async (event: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>) => {
        event.stopPropagation();
        event.preventDefault();
        const success = await deleteMicroservice(applicationId, environment, microserviceId);

        if (!success) {
            setNotification('Failed to delete', 'error');
            return;
        }
        //setNotification('Microservice to deleted', 'info');
        _props.onAfterDelete(microserviceId, environment);
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

                <h1>{microserviceName}</h1>
                <h2>{subTitle}</h2>
                {createBottomBar(canEdit, canDelete, onClickDelete, onClickStopPropagation)}
            </div>
        </DocumentCard >
    );
};

function createBottomBar(canEdit: boolean, canDelete: boolean, onClickDelete, onClickStopPropagation) {
    return (
        <div className="bottomBar">
            {canDelete ?
                createDeleteButton(canEdit, onClickDelete, onClickStopPropagation)
                : (null)
            }
            {createStatus()}
        </div>
    );
}

function createDeleteButton(canEdit: boolean, onClickDelete, onClickStopPropagation) {
    return canEdit ?
        (
            <a href="#"
                onClick={onClickDelete}
                className="left"
            >
                Delete
            </a>
        ) :
        (
            <a href="#"
                className="left"
                onClick={onClickStopPropagation}
            >
                Delete
            </a>
        );
}

function createStatus() {
    return (
        <div className="right">STATUS:TODO</div>
    );
}
