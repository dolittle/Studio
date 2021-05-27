// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Request, Response } from 'express';
import rawData from './dataschema';

export const allData = (req: any, res: any) => {
    const data = rawData.find((err: any, data: any) => {
        if (err) {
            res.send('Error!');
        } else {
            res.send(data);
        }
    });
};

export const getData = (req: Request, res: Response) => {
    rawData.findById(req.params.id, (err: any, data: any) => {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    });
};
