import { expect } from 'chai';
import fs from 'fs';
import path from 'path';
import { EntityTransformer } from '../processor';

describe('handling data from Platform', () => {

    let payloadFromPlatform: any;

    beforeEach(() => {
        // just for learning purposes
        const testDataDir = `${path.resolve(__dirname)}/data`;
        const data = fs.readFileSync(`${testDataDir}/data-from-platform.json`);
        payloadFromPlatform = JSON.parse(data.toString());
    });

    it('should be possible to read json file', () => {
        expect(payloadFromPlatform).to.not.be.undefined;
        expect(payloadFromPlatform.name).to.equal('Webhook-101');
    });

    it('wip', () => {
        const platformDataHandler = new PlatformDataHandler();
        const transformers = platformDataHandler.ExtractTransformers(payloadFromPlatform);

        expect(transformers.length).is.greaterThan(0);
        expect(transformers[0].Name).to.equal('I am name');
        expect(transformers[0].Filter).to.not.be.undefined;
        expect(transformers[0].Filter({})).to.equal(false);;
    });

});

// TODO: refactor this into a separate file
class PlatformDataHandler {

    ExtractTransformers(input: any): EntityTransformer[] {
        let result = new Array<EntityTransformer>();
        for (let entityDefinition of input.extra.entities) {
            result.push({
                Name: entityDefinition.name,
                Filter: new Function(entityDefinition.filter) as (input: any) => boolean,
                Transform: new Function(entityDefinition.transform) as (input: any) => any
            })
        }

        return result;
    }

}

