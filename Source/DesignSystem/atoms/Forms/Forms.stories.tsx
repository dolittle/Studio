// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { Box, Divider } from '@mui/material';
import { componentStories, Checkbox, Form, Switch, Input, Select, Button } from '@dolittle/design-system';
import { useFormContext, useFormState } from 'react-hook-form';

type FormData = {
    textValue: string;
    selectOption: 'default' | 'cat' | 'dog' | 'bird' | undefined;
    checkedValue: boolean;
    switchedValue: boolean;
};


type FormUIProps = {
    inputProps?: Partial<React.ComponentProps<typeof Input>>;
    selectProps?: Partial<React.ComponentProps<typeof Select>>;
    checkboxProps?: Partial<React.ComponentProps<typeof Checkbox>>;
    switchProps?: Partial<React.ComponentProps<typeof Switch>>;
};

const FormUI = ({ inputProps, selectProps, checkboxProps, switchProps }: FormUIProps) => {
    const { isValid } = useFormState();

    return (
        <>
            <Box display='flex' flexDirection='column' gap={2} sx={{ my: 2 }}>
                <Input id="textValue" label="Text" {...inputProps} required />
                <Select id='selectOption' label='Select Option' options={[
                    { value: '', displayValue: 'Default' },
                    { value: 'cat', displayValue: 'Cat' },
                    { value: 'dog', displayValue: 'Dog' },
                    { value: 'bird', displayValue: 'Bird' },
                ]}
                    {...selectProps}
                    required
                ></Select>
                <Checkbox id="checkedValue" label="Checked value" {...checkboxProps} required />
                <Switch id="switchedValue" label="Switched value" {...switchProps} required />
            </Box>
            <Button label='Submit' type='submit' disabled={!isValid} variant='filled' />
        </>
    );
};

const { metadata, createStory } = componentStories(Form<FormData>, {
    decorator: (Story) => (
        <Form<FormData>
            initialValues={{
                textValue: '',
                selectOption: 'cat',
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
            All the form components in the Design System are built to work with the Form component, and require it to be used. This is a limitation in the current implementation, and a point of improvement for the future.`
        }
    }
};

export default metadata;

export const Default = () => <FormUI />;
