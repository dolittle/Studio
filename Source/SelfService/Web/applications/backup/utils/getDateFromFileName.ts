// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { dateRegex, timeRegex } from '../../../utils/helpers/regex';

// Hack to get the date from the file name.
export const getDateFromFileName = (fileName: string) => {
    if (typeof fileName !== 'string') return 'N/A';

    // Remove from string all characters that are not digits, underscores or dashes.
    // From '/petripoint-dev-backup/mongo/petripoint-dev-2023-06-14_05-29-14.gz.mongodump' to '----2023-06-14_05-29-14'.
    const cleanedFileName = fileName.replace(/[^\d_-]/g, '');

    // From '----2023-06-14_05-29-14' to ['----2023-06-14', '05-29-14'].
    const dateAndTime = cleanedFileName.split('_');

    // Remove dashes from the beginning of the string.
    // From '['----2023-06-14', '05-29-14']' to '2023-06-14'.
    const date = dateAndTime[0].replace(/^\-+/gm, '');

    // From '['----2023-06-14', '05-29-14']' to '05:29:14'.
    const time = dateAndTime[1].replace(/-/g, ':');

    // Check if the date and time are valid.
    if (!dateRegex.test(date) || !timeRegex.test(time)) {
        return 'N/A';
    }

    return `${date} at ${time}`;
};
