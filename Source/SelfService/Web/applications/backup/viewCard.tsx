// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { useNavigate } from 'react-router-dom';

import { CommandBar, ICommandBarItemProps } from '@fluentui/react/lib/CommandBar';
import { DocumentCard, IContextualMenuItem } from '@fluentui/react';
import { mergeStyles } from '@fluentui/react/lib/Styling';

import { Typography } from '@mui/material';

import { HttpResponseApplication } from '../../apis/solutions/application';
import { cardStyles, commandTileClass, buttonStyles } from '../../components/theme-legacy/viewCard';
import { getLatestBackupLinkByApplication } from '../../apis/solutions/backups';
import { useGlobalContext } from '../../context/globalContext';

type Props = {
    application: HttpResponseApplication
    environment: string
};

const conversationTileClass = mergeStyles({ height: 182, paddingLeft: 10 });


export const ViewCard: React.FunctionComponent<Props> = (props) => {
    const navigate = useNavigate();
    const { setCurrentEnvironment, setCurrentApplicationId } = useGlobalContext();
    const _props = props!;
    const application = _props.application;
    const environment = _props.environment;

    const _items: ICommandBarItemProps[] = [
        {
            buttonStyles,
            key: 'downloadLatest',
            text: 'Download Latest Backup',
            onClick: async (ev?: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>, item?: IContextualMenuItem): Promise<void> => {
                ev!.stopPropagation();
                const url = await getLatestBackupLinkByApplication(_props.application.id, environment); //_props.
                window.open(url.url, '_blank');
            }
        },
        {
            buttonStyles,
            key: 'viewAllBackups',
            text: 'View All Backups',
            onClick: (ev?: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>, item?: IContextualMenuItem): void => {
                setCurrentApplicationId(application.id);
                setCurrentEnvironment(environment);
                const href = `/backups/application/${application.id}/${environment}/list`;
                navigate(href);
            }
        }
    ];


    const name = application.name;
    const environmentName = `${environment} - Environment`;

    return (
        <DocumentCard key={`${name}-${environment}`} styles={cardStyles}>
            <div className={conversationTileClass}>
                <Typography variant='h1' my={2}>{name}</Typography>
                <Typography variant='h2' my={2}>{environmentName}</Typography>
                <CommandBar styles={commandTileClass} items={_items} />
            </div>
        </DocumentCard>
    );
};

