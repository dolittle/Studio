// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import path from 'path';

/**
 * Executes the spec in a describe with a title derived from the filepath.
 * @param specFilePath The __filename of the running spec.
 * @param fn The spec to run.
 */
export function describeThis(specFilePath: string, fn: (this: Mocha.Suite) => void) {
    describe(deriveDescribeTitle(specFilePath), fn);
}

function deriveDescribeTitle(specFilePath: string): string {
    const parsedPath = path.parse(specFilePath);
    const filePathWithoutFileExtension = path.join(parsedPath.dir, parsedPath.name);
    const filePathUpToSpecFolder = filePathWithoutFileExtension.replace(/(.*)for_/g, '');
    const replacedUnderscoreWithSpace = filePathUpToSpecFolder.split('_').join(' ');

    const titleSegments = replacedUnderscoreWithSpace.split(path.sep);
    const specSubjectAndFirstPart = titleSegments.slice(0, 2);
    const rest = titleSegments.slice(2);

    return [specSubjectAndFirstPart.join('/'), ...rest].join(' ');
}
