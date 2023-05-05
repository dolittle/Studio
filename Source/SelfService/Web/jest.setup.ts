// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import '@testing-library/jest-dom';
import 'jest-canvas-mock';
import * as ResizeObserverModule from'resize-observer-polyfill';

(global as any).ResizeObserver = ResizeObserverModule.default;
