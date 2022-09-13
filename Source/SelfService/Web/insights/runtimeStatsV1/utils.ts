// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

// export function getFailingPartions(data: any): any[] {
//     return Object.entries(Object.keys(data)
//         .reduce((obj, key) => {
//             const found = data[key]
//                 .filter(state => state.failingPartitions);
//             if (found.length >= 1) {
//                 obj[key] = found;
//             }
//             return obj;
//         }, {})).flatMap(([key, value]) => {
//             // Well this is ugly as hell
//             const d = value as unknown as any[];
//             return d.map(state => {
//                 return {
//                     store: key,
//                     ...state,
//                 };
//             });
//         });
// };
