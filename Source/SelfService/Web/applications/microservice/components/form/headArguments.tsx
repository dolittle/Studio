// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { useFieldArray, useFormContext } from 'react-hook-form';

import { Button, Input } from '@dolittle/design-system';

type HeadArgumentsProps = {
    disabled?: boolean;
    dashedBorder?: boolean;
};

export const HeadArguments = ({ disabled, dashedBorder }: HeadArgumentsProps) => {
    const { formState: { errors } } = useFormContext();

    // Name comes from the Form initial values and the name of the fields array.
    const { fields, append, remove } = useFieldArray({
        name: 'headArguments'
    });

    // Check if there are any errors in the 'headArguments' array.
    const hasErrors = Object.keys(errors).includes('headArguments');

    return (
        <>
            {fields.map((arg, index) => (
                <div key={arg.id}>
                    <Input
                        id={`headArguments.${index}.value`}
                        label='CMD Argument'
                        autoFocus
                        disabled={disabled}
                        required
                        dashedBorder={dashedBorder}
                        sx={{ width: 220 }}
                    />
                    <Button
                        label='Remove'
                        color='subtle'
                        disabled={disabled}
                        startWithIcon='DeleteRounded'
                        onClick={() => remove(index)}
                        sx={{ m: 1.5 }}
                    />
                </div>
            ))}

            <Button
                label='Add CMD argument'
                color='subtle'
                startWithIcon='AddCircle'
                disabled={disabled || hasErrors}
                onClick={() => append({ value: '' })}
                sx={{ width: 'fit-content', mt: 2.5 }}
            />
        </>
    );
};
