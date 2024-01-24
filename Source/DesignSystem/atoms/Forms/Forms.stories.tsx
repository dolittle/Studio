// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { useFormState } from 'react-hook-form';

import { Box } from '@mui/material';

import { componentStories, Button, Checkbox, Form, Input, Select, Switch } from '@dolittle/design-system';

type DefaultFormParameters = {
    textValue: string;
    selectOption: 'cat' | 'dog' | 'bird' | undefined;
    checkedValue: boolean;
    switchedValue: boolean;
};

type FormUIProps = {
    inputProps?: Partial<React.ComponentProps<typeof Input>>;
    selectProps?: Partial<React.ComponentProps<typeof Select>>;
    checkboxProps?: Partial<React.ComponentProps<typeof Checkbox>>;
    switchProps?: Partial<React.ComponentProps<typeof Switch>>;
};

const FormUI = ({ inputProps, checkboxProps, selectProps, switchProps }: FormUIProps) => {
    const { isValid } = useFormState();

    return (
        <>
            <Box display='flex' flexDirection='column' gap={2} sx={{ my: 2 }}>
                <Input id='textValue' label='Required input' {...inputProps} required='This field is required.' />

                <Select
                    id='selectOption'
                    label='Select option'
                    required='This field is required.'
                    options={[
                        { value: 'cat', displayValue: 'Cat' },
                        { value: 'dog', displayValue: 'Dog' },
                        { value: 'bird', displayValue: 'Bird' },
                    ]}
                    {...selectProps}
                />

                <Checkbox id='checkedValue' label='Required Checkbox*' {...checkboxProps} required='This field is required.' />

                <Switch id='switchedValue' label='Required Switch*' {...switchProps} required='This field is required.' />
            </Box>

            <Button label='Submit' type='submit' disabled={!isValid} variant='filled' />
        </>
    );
};

const { metadata } = componentStories(Form<DefaultFormParameters>, {
    decorator: Story => (
        <Form<DefaultFormParameters>
            initialValues={{
                textValue: '',
                selectOption: undefined,
                checkedValue: false,
                switchedValue: false,
            }}>
            {Story()}
        </Form>
    ),
});

metadata.parameters = {
    docs: {
        description: {
            component: `The Form component is a wrapper around the \`react-hook-form\` library. It provides a way to create a form with input validation.
            All the form components in the Design System are built to work with the Form component, and require it to be used. This is a limitation in 
            the current implementation, and a point of improvement for the future.`,
        },
    },
};

export default metadata;

export const Default = () => <FormUI />;
