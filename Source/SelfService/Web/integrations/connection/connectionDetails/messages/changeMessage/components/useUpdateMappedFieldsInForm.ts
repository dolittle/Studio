// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { useFormContext } from 'react-hook-form';

import { FieldMapping } from '../../../../../../apis/integrations/generated';

export type UpdateMappedFieldsInForm = (fieldMappings: Map<string, FieldMapping>, isInitial?: boolean) => void;

export const useUpdateMappedFieldsInForm = (): UpdateMappedFieldsInForm => {
    const { setValue, getValues } = useFormContext();

    const updateFormValue = (mappedFields: FieldMapping[], isInitial: boolean) => {
        setValue('fields', mappedFields, { shouldValidate: true, shouldDirty: !isInitial });
    };

    return (newMappedFields: Map<string, FieldMapping>, isInitial: boolean = false) => {
        const currentMappedFields = getValues('fields') as FieldMapping[];

        if (!fieldsAlreadyMapped(newMappedFields, currentMappedFields)) {
            updateFormValue(Array.from(newMappedFields.values()), isInitial);
        }
    };
};

function fieldsAlreadyMapped(newMappedFields: Map<string, FieldMapping>, currentMappedFields: FieldMapping[]): boolean {
    const newMappedFieldsArray = Array.from(newMappedFields.entries());
    const sameLength = newMappedFieldsArray.length === currentMappedFields.length;
    const sameKeys = newMappedFieldsArray.every(([columnName,]) => currentMappedFields.some(field => field.columnName === columnName));
    const sameKeyValues = newMappedFieldsArray.every(([columnName, newMappedField]) => {
        const current = currentMappedFields.find(currentMappedField => currentMappedField.columnName === columnName);
        return current?.fieldName === newMappedField.fieldName;
    });

    return sameLength && sameKeys && sameKeyValues;
};
