// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { expect } from 'chai';
import { RawDataProcessor, EntityTransformer } from '../processor';
import path from 'path';
import * as fsloader from '../fsloader';


describe('process raw data', () => {
    let rawDataProcessor: RawDataProcessor;
    const transformersDir = `${path.resolve(__dirname)}/transformers`;
    const transformers = fsloader.loadSync(transformersDir);

    beforeEach(() => {
        rawDataProcessor = new RawDataProcessor();
    });

    it('will process when a filter matches', () => {
        rawDataProcessor.AddEntityTransformer({
            Name: '',
            Filter: (data: any) => {
                return true;
            },
            Transform: (data: any) => {
            }
        });
        const input = { name: 'foo' };
        const output = rawDataProcessor.Process(input);

        expect(output).not.to.be.undefined;
        expect(output.WasProcessed).to.be.true;
        expect(output.Result).to.not.be.null;
    });

    it('will transform the result', () => {
        const customerTransformer = transformers.find((n: any) => n.Name === 'customer transformer') as EntityTransformer;
        expect(customerTransformer).to.not.be.undefined;
        rawDataProcessor.AddEntityTransformer(customerTransformer);

        const input = {
            CustomerName: 'Rema 1000',
            Postnr: 7070,
            City: 'Trondheim'
        };
        const output = rawDataProcessor.Process(input);

        expect(output.Result).to.deep.equal({
            Name: 'Rema 1000',
            Adress: {
                PostalCode: 7070,
                City: 'Trondheim'
            }
        });
    });

    it('will not process whne a filter matches', () => {
        rawDataProcessor.AddEntityTransformer({
            Name: '',
            Filter: (data: any) => {
                return false;
            },
            Transform: (data: any) => {
            }
        });
        const input = { name: 'foo' };
        const output = rawDataProcessor.Process(input);

        expect(output).not.to.be.undefined;
        expect(output.WasProcessed).to.be.false;
        expect(output.Result).to.be.null;
    });

});
