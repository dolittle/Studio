// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

/**
 * Mode of the view. Should this become overly complex, we can split the logic into multiple views with reusable components.
 * @typedef { 'new' | 'edit' } ViewMode
 */
export type ViewMode = 'new' | 'edit';

/**
 * ViewModeProps
 * @see {@link ViewMode}
 */
export type ViewModeProps = {
    mode: ViewMode;
};
