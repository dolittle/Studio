// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { componentStories } from '@dolittle/design-system';
import { FormGroup } from '@mui/material';

import { Form } from './Form';
import { Input } from './Input';
import { Checkbox } from './Checkbox';

type Application = {
    name: string;
    contact: {
        name: string;
        email: string;
    };
    environments: {
        development: boolean;
        test: boolean;
        production: boolean;
    };
};

type Props = {};
const Example = (props: Props) => { // CREATE APPLICATION PAGE
    return (
        <Form<Application>
            initialValues={{
                name: '',
                contact: {
                    name: '',
                    email: '',
                },
                environments: {
                    development: false,
                    test: false,
                    production: true,
                }
            }}
            onSubmit={(application) => {
                console.log('APPLICATION', application);
            }}
        >
            <Input
                id="name"
                label="Application Name"
                required
                pattern={{ value: /^[a-z0-9]+$/, message: 'Name can only contain alphanumeric characters.'}}/>
            <Input
                id="contact.name"
                label="Contact Name"
                required
                pattern={{ value: /^[a-z0-9]+$/, message: 'Name can only contain alphanumeric characters.'}}/>
            <Input
                id="contact.email"
                label="Contact email"
                required
                pattern={{ value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, message: 'Please enter a valid email address.'}}/>
            <FormGroup sx={{ display: 'inline-flex' }}>
                <Checkbox
                    id='environments.production'
                    label='Production'
                    disabled
                     />
                 <Checkbox
                    id='environments.test'
                    label='Test'/>
                 <Checkbox
                    id='environments.development'
                    label='Development'/>
            </FormGroup>
            <button type="submit">SUBMIT</button>
        </Form>
    );
};

const { metadata, createStory } = componentStories(Example);
export default metadata;

export const Default = createStory({});
