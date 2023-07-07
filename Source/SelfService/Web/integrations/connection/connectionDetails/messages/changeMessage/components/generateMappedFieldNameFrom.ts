// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { toPascalCase } from './../../../../../../utils/helpers/strings';

/**
 * Function generates a unique mapped name based on the column description.
 * @param columnDescription The M3 description of the column, usually explaining in brief words what the column is.
 * @param columnName The M3 name of the column, usually an upper-cased, 6-character abbreviation. Used in case of duplicate descriptions.
 * @param uniqueMappedNames A list of already uniquely mapped names, to ensure that the generated name is unique.
 * @returns Returns a unique mapped name based on the column description. If there are duplicates, the M3FieldName will be appended to the name.
 */
export const generateMappedFieldNameFrom = (columnDescription: string, columnName: string, uniqueMappedNames: string[]) => {
    const generated = toPascalCase(columnDescription);
    return uniqueMappedNames.includes(generated) ? generated + columnName : generated;
};
