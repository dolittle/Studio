// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { useHistory } from 'react-router-dom';

import { CommandBar, ICommandBarItemProps } from '@fluentui/react/lib/CommandBar';
import {
    DocumentCard,
    DocumentCardTitle,
    IDocumentCardStyles,
    IContextualMenuItem
} from '@fluentui/react';

import { MicroserviceInfo } from '../api';
import { mergeStyles } from '@fluentui/react/lib/Styling';
import '../micoservice/microservice.scss';

const stackTokens = { childrenGap: 15 };


type Props = {
    microservice: MicroserviceInfo
    applicationId: string
    environment: string
};


export const ViewCard: React.FunctionComponent<Props> = (props) => {
    const history = useHistory();
    const microservice = props!.microservice;
    const microserviceId = microservice.id;
    const applicationId = props!.applicationId;
    const environment = props!.environment;

    const cardStyles: IDocumentCardStyles = {
        root: { display: 'inline-block', marginRight: 20, width: 320 },
    };


    const conversationTileClass = mergeStyles({ height: 182 });

    const _items: ICommandBarItemProps[] = [
        {
            key: 'editMicroservice',
            text: 'Edit',
            onClick: () => {
                const href = `/application/${applicationId}/${environment}/microservice/edit/${microserviceId}`;
                history.push(href);
            }
        },
        {
            key: 'editMicroservice',
            text: 'Delete',
            onClick: (ev?: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>, item?: IContextualMenuItem): void => {
                ev!.stopPropagation();
                alert('TODO: delete microservice');
            }
        },
        {
            key: 'viewMicroservice',
            text: 'View',
            onClick: () => {
                const href = `/application/${applicationId}/${environment}/microservice/view/${microserviceId}`;
                history.push(href);
            }
        }

    ];

    return (

        <DocumentCard
            styles={cardStyles}
            onClick={() => {
                const href = `/application/${applicationId}/${environment}/microservice/view/${microserviceId}`;
                history.push(href);
            }}
        >
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
                <CommandBar items={_items} />
            </div>
        </DocumentCard>
    );
};

