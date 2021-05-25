import { Request, Response } from 'express';
import rawData from './dataschema';

export let allData = (req: any, res: any) => {
    let data = rawData.find((err: any, data: any) => {
        if (err) {
            res.send('Error!');
        } else {
            res.send(data);
        }
    });
};

export let getData = (req: Request, res: Response) => {
    rawData.findById(req.params.id, (err: any, data: any) => {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    });
};

export let addData = (req: Request, res: Response) => {
    let data = new rawData(req.body);
    data.save((err: any) => {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    });
};
