import { Request, Response } from 'express';
import rawData from './dataschema';

// every we have from our database
export let allData = (req: any, res: any) => {
    let data = rawData.find((err: any, allData: any) => {
        if (err) {
            res.send('Error!');
        } else {
            res.send(allData);
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

export let deleteData = (req: Request, res: Response) => {
    rawData.deleteOne({ _id: req.params.id }, (err: any) => {
        if (err) {
            res.send(err);
        } else {
            res.send('Successfully Deleted the data');
        }
    });
};

export let updateData = (req: Request, res: Response) => {
    rawData.findByIdAndUpdate(req.params.id, req.body, (err: any, data: any) => {
        if (err) {
            res.send(err);
        } else {
            res.send('Successfully updated the data');
        }
    });
};
