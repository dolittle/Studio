// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { CommandBar, ICommandBarItemProps } from '@fluentui/react/lib/CommandBar';
import {
    DocumentCard,
    DocumentCardTitle,
    IContextualMenuItem,
    IButtonStyles,
    IDropdownOption,
    IDropdownStyles,
    Checkbox
} from '@fluentui/react';
import { mergeStyles, mergeStyleSets } from '@fluentui/react/lib/Styling';

import { backgroundColor, cardStyles, commandTileClass, buttonStyles as baseButtonStyles } from '../theme/viewCard';

import { Dropdown } from '@fluentui/react/lib/Dropdown';


export type CreateCardAdaptor = {
    id: '',
    name: '',
    connectorType: ''
};

const buttonStyles = mergeStyleSets(
    baseButtonStyles,
    {
        root: {
            color: '#ffffff',
            //backgroundColor: 'none'
        }
    }) as IButtonStyles;


type Props = {
    applicationId: string
    environment: string
    adaptors: CreateCardAdaptor[]
    onCancel?: (ev?: React.MouseEvent<HTMLButtonElement>) => any;
};

const conversationTileClass = mergeStyles({ height: 182 });

export const CreateCard: React.FunctionComponent<Props> = (props) => {
    const history = useHistory();
    const _props = props!;

    const applicationId = _props.applicationId;
    const environment = _props.environment;
    const adaptors = _props.adaptors;

    const hasConnectors = adaptors.length > 0;
    const [isChecked, setIsChecked] = useState(hasConnectors === false);

    const options = adaptors.map(ms => {
        return { key: ms.id, text: `${ms.name} - ${ms.connectorType}`, data: ms } as IDropdownOption;
    });

    let picked = hasConnectors ? '' : 'new';
    let adaptor: CreateCardAdaptor = {} as CreateCardAdaptor;


    const _items: ICommandBarItemProps[] = [
        {
            buttonStyles,
            key: 'cancel',
            text: 'Cancel',
            onClick: (ev?: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>, item?: IContextualMenuItem): void => {
                if (_props.onCancel) {
                    _props.onCancel();
                }
            }
        },
        {
            buttonStyles,
            key: 'create',
            text: 'Create',
            onClick: (ev?: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>, item?: IContextualMenuItem): void => {
                let href = '';
                switch (picked) {
                    case 'new':
                        href = `/microservices/application/${applicationId}/${environment}/create`;
                        history.push(href);
                        return;
                    case 'existing':
                        href = `/business-moments/application/${applicationId}/${environment}/editor/new/microservice/${adaptor.id}`;
                        history.push(href);
                        return;
                    default:
                        alert('Pick existing or select new first');
                        return;
                }
            }
        }
    ];

    const selectExisting = (event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption, index?: number) => {
        picked = 'existing';
        adaptor = option!.data as CreateCardAdaptor;
        setIsChecked(false);
    };

    const selectNew = () => {
        picked = 'new';
        setIsChecked(true);
    };


    const blueBackgroundClassName = mergeStyleSets({
        root: {
            backgroundColor
        },
        title: {
            borderColor: '#828282',
            backgroundColor
        },
        dropdownItems: {
            borderColor: '#828282',
            backgroundColor
        },
        dropdownItem: {
            backgroundColor,
        },
        dropdownItemsWrapper: {
            backgroundColor
        }
    } as IDropdownStyles);

    const className = mergeStyleSets(blueBackgroundClassName, {
        root: {
            selectors: {
                ':hover': {
                    backgroundColor: 'red'
                }
            }
        },
        dropdownItemsWrapper: {
            selectors: {
                ':hover': {
                    backgroundColor: 'red'
                }
            }
        },
        dropdownItem: {
            selectors: {
                ':hover': {
                    backgroundColor: 'red'
                }
            }
        },
        dropdownItems: {
            selectors: {
                ':hover': {
                    backgroundColor: 'red'
                }
            }
        }
    });

    return (

        <DocumentCard styles={cardStyles}>
            <div className={conversationTileClass}>
                <DocumentCardTitle
                    title='Create a business moment'
                    shouldTruncate
                />

                {hasConnectors && (
                    <>

                        <Dropdown placeholder="Select"
                            dropdownWidth="auto"
                            styles={className}
                            options={options}
                            onChange={selectExisting}
                        />

                        <h1>OR</h1>
                    </>
                )}
                <Checkbox label="Create new business moment adapter" onChange={selectNew} checked={isChecked} />

                <CommandBar styles={commandTileClass} items={_items} />
            </div>
        </DocumentCard>
    );
};

