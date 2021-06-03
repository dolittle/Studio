// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

({
    Name: 'customer transformer',
    Filter: (input) => {
        return true;
    },
    Transform: (input) => {
        return {
            Name: input.CustomerName,
            Adress: {
                PostalCode: input.Postnr,
                City: input.City
            }
        };
    }
});
