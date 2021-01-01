// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import byline from 'byline';

export type CapturedLog = {
    id: string;
    logs: NodeJS.ReadableStream;
    byline: byline.LineStream;
};
