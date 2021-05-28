// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { useHistory } from 'react-router-dom';

import { CommandBar, ICommandBarItemProps } from '@fluentui/react/lib/CommandBar';
import {
    DocumentCard,
    DocumentCardTitle,
    IContextualMenuItem
} from '@fluentui/react';
import { cardStyles, commandTileClass, buttonStyles } from '../theme/viewCard';

import { deleteMicroservice, MicroserviceInfo } from '../api/api';
import { mergeStyles } from '@fluentui/react/lib/Styling';
import './microservice.scss';


type Props = {
    microservice: MicroserviceInfo
    applicationId: string
    environment: string
    canEdit: boolean
    onAfterDelete: (microserviceId: string, environment: string) => void;
};


const conversationTileClass = mergeStyles({ height: 182 });


export const ViewCard: React.FunctionComponent<Props> = (props) => {
    const history = useHistory();
    const _props = props!;
    const microservice = _props.microservice;
    const microserviceId = microservice.id;
    const applicationId = _props.applicationId;
    const environment = _props.environment;
    const canEdit = _props.canEdit;

    const _items: ICommandBarItemProps[] = [
        {
            buttonStyles,
            key: 'editMicroservice',
            text: 'Edit',
            disabled: !canEdit,
            onClick: () => {
                const href = `/application/${applicationId}/${environment}/microservice/edit/${microserviceId}`;
                history.push(href);
            }
        },
        {
            buttonStyles,
            key: 'deleteMicroservice',
            text: 'Delete',
            disabled: !canEdit,
            onClick: (ev?: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>, item?: IContextualMenuItem): void => {
                ev!.stopPropagation();
                (async () => {
                    const success = await deleteMicroservice(applicationId, environment, microserviceId);
                    if (!success) {
                        alert('Failed to delete');
                        return;
                    }
                    alert('Microservice to deleted');
                    // Bubble up change, this is where a store is nice.
                    // Today lets just cheat.
                    // TODO a better way
                    _props.onAfterDelete(microserviceId, environment);
                    //const href = `/application/${applicationId}/${environment}/microservices/overview`;
                    //history.push(href);
                })();
            }
        },
        {
            buttonStyles,
            key: 'viewMicroservice',
            text: 'View',
            onClick: () => {
                const href = `/application/${applicationId}/${environment}/microservice/view/${microserviceId}`;
                history.push(href);
            }
        }

    ];

    return (

        <DocumentCard styles={cardStyles}>
            <div className={conversationTileClass}>
                <DocumentCardTitle
                    title={microservice.name}
                    shouldTruncate
                />
                <DocumentCardTitle
                    title={'todo'}
                    shouldTruncate
                    showAsSecondaryTitle
                />
                <CommandBar styles={commandTileClass} items={_items} />
            </div>
        </DocumentCard>
    );
};

