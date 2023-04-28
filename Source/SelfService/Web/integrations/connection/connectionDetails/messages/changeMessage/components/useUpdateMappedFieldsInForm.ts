// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { useFormContext } from 'react-hook-form';
import { FieldMapping } from '../../../../../../apis/integrations/generated';

export type UpdateMappedFieldsInForm = (fieldMappings: FieldMapping[]) => void;

export const useUpdateMappedFieldsInForm = (): UpdateMappedFieldsInForm => {
    const { setValue: setFormValue } = useFormContext();
    return (newMappedFields: FieldMapping[]) => {
        setFormValue('fields', newMappedFields);
    };
};

