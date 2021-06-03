// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import path from 'path';
import { expect } from 'chai';
import { EntityTransformer } from '../processor';

describe('fs loader', () => {

    describe('load', () => {

        it('will try to parse all files in folder', () => {
            const transformersDir = `${path.resolve(__dirname)}/transformers`;

            const fsLoader = require('../fsloader');
            const result = fsLoader.loadSync(transformersDir);

            expect(result.length).to.equal(3);
            expect(result.find((n: EntityTransformer) => n.Name === 'another transformer')).to.not.be.undefined;
            expect(result.find((n: EntityTransformer) => n.Name === 'customer transformer')).to.not.be.undefined;
            // search for specific transformer that has behaviour
            // that can be used to validate that the transformer
            // is laoded from the file system
            const transformer = result.find((n: EntityTransformer) => n.Name === 'simple transformer') as EntityTransformer;
            expect(transformer).to.not.be.undefined;
            expect(transformer.Name).to.equal('simple transformer');
            expect(transformer.Filter({ importantPersonName: 'John Carmack' })).equals(true);
            expect(transformer.Filter({ soccerPerson: 'Keane' })).equals(false);
            let company = transformer.Transform({ employeeName: 'John Carmack' });
            expect(company).to.not.be.undefined;
            expect(company.companyName).to.equal('Id Software');
            company = transformer.Transform({ employeeName: 'Roy Keane' });
            expect(company).to.not.be.undefined;
            expect(company.companyName).to.equal('Manchester United');
        });

    });

});
