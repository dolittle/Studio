// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

const path = require('path');

const chaiPath = path.dirname(require.resolve('chai'));


module.exports = function (wallaby) {
    return {
        files: [
            { pattern: path.join(chaiPath, 'chai.js'), instrument: false },
            //{ pattern: 'Source/Shared/**/*.ts', instrument: false },
            'Source/DevCentral/main/tsconfig.json',
            './tsconfig.json',
            'Source/DevCentral/main/**/*.ts',
            '!Source/DevCentral/main/**/when_*',
        ],

        tests: [
            'Source/DevCentral/main/**/for_*/**/*.ts',
            '!Source/DevCentral/main/**/given/**/*.ts',
            '!**/*.d.ts'
        ],

        env: {
            type: 'node'
        },

        setup: (wallaby) => {
            if (global._tsconfigPathsRegistered) return;

            const tsConfigPaths = require('tsconfig-paths');
            const tsconfig = require('./tsconfig.json');

            tsConfigPaths.register({
                baseUrl: './',
                paths: tsconfig.compilerOptions.paths
            });

            global._tsconfigPathsRegistered = true;

            require('reflect-metadata');

            global.expect = chai.expect;
            const should = chai.should();
            global.sinon = require('sinon');
            const sinonChai = require('sinon-chai');
            const chaiAsPromised = require('chai-as-promised');
            chai.use(sinonChai);
            chai.use(chaiAsPromised);
        }
    };
};
