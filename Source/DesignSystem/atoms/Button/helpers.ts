// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

export const buttonDescription = `
A button triggers an event or action. Its label should let the user know what will happen next.

**Styling:** Buttons come in three style variations. All variations can be used with or without icons to help lift the UI and
quickly visually communicate to the user what the button will do.

- ***Filled buttons*** are reserved for primary actions. They should be used to call attention to an action on a form or to
highlight the strongest call to action on the page. Filled buttons should appear only once per container (not including the
application header or in a modal dialog). Not every screen requires a primary action, or filled button. Filled buttons use our primary main color.
- ***Outlined buttons*** are reserved for login screens. The empty fill allows third-party icons to be used in their original styling.
- ***Text buttons*** are used for secondary actions, such as 'cancel' or to carry out an optional action within the page.
They are commonly found in dialogs, cards or sometimes toolbars. Text buttons may use our primary main color or the inherit color
of the page depending on whether or not the user's attention should be drawn to the button or if the button needs to be distinguished
from other content on the page.
`;

export const spacing = { '& button': { mr: 3, mb: 3 } };
