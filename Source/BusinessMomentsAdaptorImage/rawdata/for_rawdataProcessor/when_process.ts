import { expect } from 'chai';
import { RawDataProcessor } from '../processor';

describe('process raw data', () => {
    let rawDataProcessor: RawDataProcessor;

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
        rawDataProcessor.AddEntityTransformer({
            Name: 'Foo',
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
                }
            }
        });

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
        })
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
