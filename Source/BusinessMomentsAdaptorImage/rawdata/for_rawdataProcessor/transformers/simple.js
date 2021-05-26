// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

({
    Name: 'simple transformer',
    Filter: (input) => {
        if (input.importantPersonName === 'John Carmack') {
            return true;
        }
        return false;
    },
    Transform: (input) => {
        if (input.employeeName === 'John Carmack') {
            return {
                companyName: 'Id Software'
            };
        }

        if (input.employeeName === 'Roy Keane') {
            return {
                companyName: 'Manchester United'
            };
        }

        return {};
    }
});
