// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
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


    const [isChecked, setIsChecked] = React.useState(false);
    const _items: ICommandBarItemProps[] = [
        {
            buttonStyles,
            key: 'cancel',
            text: 'Cancel',
            onClick: (ev?: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>, item?: IContextualMenuItem): void => {
                console.log('cancel modal');
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
                console.log('goto microservice create page');
                let href = '';
                switch (picked) {
                    case 'new':
                        href = `/application/${applicationId}/${environment}/microservice/create`;
                        console.log(href);
                        history.push(href);
                        return;
                    case 'existing':
                        href = `/application/${applicationId}/${environment}/business-moments/editor/${moment.id}`;
                        console.log(href);
                        alert('Moment Id is wrong');
                        return;
                        history.push(href);
                        return;
                    default:
                        alert('Pick existing or select new first');
                        return;
                }
            }
        }
    ];

    const options = adaptors.map(ms => {
        return { key: ms.id, text: `${ms.name} - ${ms.connectorType}`, data: ms } as IDropdownOption;
    });

    let picked = '';
    let moment: CreateCardAdaptor = {} as CreateCardAdaptor;

    const selectExisting = (event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption, index?: number) => {
        console.log('select existing');
        picked = 'existing';
        moment = option!.data as CreateCardAdaptor;
        setIsChecked(false);
    };

    const selectNew = () => {
        console.log('select new');
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

                <Dropdown placeholder="Select"
                    dropdownWidth="auto"
                    styles={className}
                    options={options}
                    onChange={selectExisting}
                />

                <h1>OR</h1>

                <Checkbox label="Create new business moment adapter" onChange={selectNew} checked={isChecked} />

                <CommandBar styles={commandTileClass} items={_items} />
            </div>
        </DocumentCard>
    );
};

