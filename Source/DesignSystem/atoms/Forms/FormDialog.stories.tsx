// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState } from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Button, FormDialog, Input, Select } from '../../index';

// TODO: Update component to improve text.

const selectOptions = [
    { value: 'Option 1', displayValue: 'Option 1' },
    { value: 'Option 2', displayValue: 'Option 2' },
    { value: 'Option 3', displayValue: 'Option 3' },
];

const DialogContent = () =>
    <>
        <Input id='input' label='Form Input Field' />
        <Select id='select' label='Form Select Field' options={selectOptions} />
    </>;

export default {
    title: 'Forms/Form Dialog',
    component: FormDialog,
    parameters: {
        docs: {
            description: {
                component: ``,
            },
        },
    },
    argTypes: {
        isOpen: { control: false },
        children: { control: false },
    },
    args: {
        id: 'form-dialog',
        isOpen: false,
        title: 'This is a dialog title',
        description: 'This is a dialog description.',
        children: <DialogContent />,
        isLoading: false,
        cancelButtonLabel: 'Cancel',
        hideCancelButton: false,
        onCancel: action('Canceled!'),
        submitBtnLabel: 'Submit',
        hideSubmitButton: false,
        onSubmit: action('Submitted!'),
        onClose: action('Closed!'),
        formInitialValues: {
            input: '',
            select: '',
        } as { input: string, select: string },
    },
} as ComponentMeta<typeof FormDialog>;

const Template: ComponentStory<typeof FormDialog> = args => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleDialogClose = () => setIsDialogOpen(false);

    return (
        <>
            <Button label='Open form dialog' onClick={() => setIsDialogOpen(true)} />

            <FormDialog {...args} isOpen={isDialogOpen} onCancel={handleDialogClose} onSubmit={handleDialogClose} onClose={handleDialogClose} />
        </>
    );
};

export const Default = Template.bind({});
