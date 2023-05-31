// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import type { Config } from 'jest';

const libs = [
    // 'DesignSystem',
    '@react-hook/resize-observer',
    '@juggle/resize-observer',
];

const transformIgnorePattern = 'node_modules/(?!' + libs.join('|') + ')';
const transformPattern = 'node_modules/(' + libs.join('|') + ')';

console.log(transformIgnorePattern);


const config: Config = {
    // verbose: true,
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    moduleNameMapper: {
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
            '<rootDir>/__mocks__/fileMock.ts',
        '\\.(css|less)$': '<rootDir>/__mocks__/styleMock.ts'
    },
    transform: {
        // '\\.[jt]sx?$': 'ts-jest',
        // transformPattern: 'babel-jest'
    },
    transformIgnorePatterns: [
        transformIgnorePattern,
    ],
    testMatch: [
        '**/__tests__/**/?(*.)+(spec|test).[jt]s?(x)',
        '**/?(*.)+(spec|test).[jt]s?(x)',
    ],
};

export default config;
