// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

export const formatTime = (time: string) => {
    if (time) {
        const splitedTime = time.split(/[hm.]/g);

        if (time.includes('h') && +splitedTime[0] >= 24) {
            const days = Math.floor(+splitedTime[0] / 24);
            const hours = +splitedTime[0] % 24;
            const minutes = +splitedTime[1];
            const seconds = +splitedTime[2];

            return `${days}d ${hours}h ${minutes}m ${seconds}s`;
        } else if (time.includes('h')) {
            const hours = +splitedTime[0] % 24;
            const minutes = +splitedTime[1];
            const seconds = +splitedTime[2];

            return `${hours}h ${minutes}m ${seconds}s`;
        } else if (time.includes('m')) {
            const minutes = +splitedTime[0];
            const seconds = +splitedTime[1];

            return `${minutes}m ${seconds}s`;
        } else if (time.includes('.')) {
            const seconds = +splitedTime[0];

            return `${seconds}s`;
        } else {
            return 'N/A';
        }
    } else {
        return 'N/A';
    }
};

export const formatStartingDate = (initialDate: string) => {
    if (initialDate) {
        const splitedDate = initialDate.split(' ');
        const date = splitedDate[0].split('-').join('/');
        const time = splitedDate[1];

        return `${date} ${time}`;
    } else {
        return 'N/A';
    }
};
