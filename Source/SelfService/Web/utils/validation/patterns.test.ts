// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import { emailRegex, alphaNumericLowerCasedCharsRegex, alphaNumericCharsRegex, nonWhitespaceRegex } from './patterns';

describe('when matching alphaNumericLowerCasedCharsRegex', () => {
    it('should match', () => {
        expect('abc').toMatch(alphaNumericLowerCasedCharsRegex);
        expect('123').toMatch(alphaNumericLowerCasedCharsRegex);
        expect('abc123').toMatch(alphaNumericLowerCasedCharsRegex);
    });
    it('should not match', () => {
        expect('abc123!').not.toMatch(alphaNumericLowerCasedCharsRegex);
        expect('abcD123').not.toMatch(alphaNumericLowerCasedCharsRegex);
    });
});

