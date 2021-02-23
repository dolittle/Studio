// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { ContextualMenuItemType, DefaultButton, Dialog, DialogFooter, DialogType, IconButton, IContextualMenuProps, IPersonaSharedProps, Persona, PersonaPresence, PersonaSize, PrimaryButton } from '@fluentui/react';
import { useId, useBoolean } from '@fluentui/react-hooks';
import * as React from 'react';

import './AppHeader.scss';

const dialogStyles = { main: { maxWidth: 450 } };
const examplePersona: IPersonaSharedProps = {
    imageUrl: 'https://static2.sharepointonline.com/files/fabric/office-ui-fabric-react-assets/persona-female.png',
    imageInitials: 'AL',
    text: 'Annie Lindqvist',
    secondaryText: 'Software Engineer',
    tertiaryText: 'In a meeting',
    optionalText: 'Available at 4:00pm',
};

const dialogContentProps = {
    type: DialogType.normal,
    title: 'Missing Subject',
    closeButtonAriaLabel: 'Close',
    subText: 'Do you want to send this message without a subject?',
};

const logo = require('./logo.svg');


export const AppHeader = () => {
    const [hideDialog, { toggle: toggleHideDialog }] = useBoolean(true);
    const labelId: string = useId('dialogLabel');
    const subTextId: string = useId('subTextLabel');

    const menuProps = {
        shouldFocusOnMount: true,
        items: [
            { key: 'settings', text: 'Settings', iconProps: { iconName: 'Settings' } },
            { key: 'profile', text: 'Profile', iconProps: { iconName: 'Contact' } },
            { key: 'divider', itemType: ContextualMenuItemType.Divider },
            { key: 'versions', text: 'Versions', iconProps: { iconName: 'Info' }, onClick: toggleHideDialog },
            { key: 'change.tenant', text: 'Change Tenant', iconProps: { iconName: 'Info' }, onClick: () => {
                window.location.href = '/.auth/cookies/initiate';
            } },
        ]
    } as IContextualMenuProps;

    const modalProps = React.useMemo(
        () => ({
            titleAriaId: labelId,
            subtitleAriaId: subTextId,
            isBlocking: false,
            styles: dialogStyles,
        }),
        [labelId, subTextId],
    );

    return (
        <header className="app-header">
            <a href="/" className="site-logo">
                <img src={logo} alt="" />
            </a>
            <div className="menu">
                <Persona {...examplePersona}
                    size={PersonaSize.size32}
                    presence={PersonaPresence.offline}
                    hidePersonaDetails></Persona>

                <IconButton className="more-button" iconProps={{ iconName: 'More' }}
                    menuProps={menuProps}
                />

                <Dialog
                    hidden={hideDialog}
                    onDismiss={toggleHideDialog}
                    dialogContentProps={dialogContentProps}
                    modalProps={modalProps} >
                    <DialogFooter>
                        <PrimaryButton onClick={toggleHideDialog} text="Send" />
                        <DefaultButton onClick={toggleHideDialog} text="Don't send" />
                    </DialogFooter>
                </Dialog>

            </div>

        </header>


    );
};
