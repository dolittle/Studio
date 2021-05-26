// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { useParams } from 'react-router-dom';
import { CreateCard, CreateCardAdaptor } from './createCard';

import { useBoolean } from '@fluentui/react-hooks';
import { Modal, DefaultButton } from '@fluentui/react';


import { ViewCard } from './viewCard';

export const BusinessMomentsOverview: React.FunctionComponent = () => {
    const [isModalOpen, { setTrue: showModal, setFalse: hideModal }] = useBoolean(false);
    const { environment, applicationId } = useParams() as any;

    const businessMoments = [
        {
            applicationId,
            momentId: 'fake-bm-123',
            environment,
            name: 'Added to Component',
            microserviceId: 'fake-ms-345',
            microserviceName: 'Product Structure Extractor',
            connectorType: 'Webhook',
            canEdit: true,

        },
        {
            applicationId,
            environment,
            momentId: 'fake-bm-678',
            name: 'Customer Created',
            microserviceId: 'fake-ms-345',
            microserviceName: 'Customer Extractor',
            connectorType: 'Webhook',
            canEdit: true,
        },
    ];

    const adaptors = businessMoments.map(moment => {
        return {
            id: moment.momentId,
            name: moment.microserviceName,
            connectorType: moment.connectorType,
        } as CreateCardAdaptor;
    });

    return (
        <>
            <h1>Business moments</h1>
            <DefaultButton onClick={showModal} text="Create Business Moment" />
            <div className="serv">
                <ul>
                    {businessMoments.map((moment) => {
                        return <li key={moment.momentId}><ViewCard {...moment} /></li>;
                    })}
                </ul>
            </div>
            <Modal
                isOpen={isModalOpen}
                onDismiss={hideModal}
                isBlocking={false}
            >
                <CreateCard applicationId={applicationId} environment={environment} adaptors={adaptors} onCancel={() => {
                    hideModal();
                }} />
            </Modal>
        </>
    );
};
