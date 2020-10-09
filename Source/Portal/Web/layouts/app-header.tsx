import { ContextualMenuItem, DefaultButton, Dialog, DialogFooter, DialogType, IconButton, IContextualMenuProps, IPersonaSharedProps, Persona, PersonaPresence, PersonaSize, PrimaryButton } from 'office-ui-fabric-react';
import * as React from 'react';

import './app-header.scss';
import { useId, useBoolean } from '@uifabric/react-hooks';

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

export const AppHeader = () => {
    const [hideDialog, { toggle: toggleHideDialog }] = useBoolean(true);
    const labelId: string = useId('dialogLabel');
    const subTextId: string = useId('subTextLabel');

    const menuProps = {
        shouldFocusOnMount: true,
        items: [
            { key: 'versions', text: 'Versions', onClick: toggleHideDialog }
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
                <img src="../images/logo.svg" alt="" />
            </a>
            <div className="menu">
                <Persona {...examplePersona}
                    size={PersonaSize.size32}
                    presence={PersonaPresence.offline}
                    hidePersonaDetails></Persona>

                <IconButton iconProps={{ iconName: 'MoreVertical' }} menuProps={menuProps} />

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
}