// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

/**
 * The message passed when the user inputs something in the terminal.
 */
export type InputMessage = {
    type: 'input';

    /**
     * The input to the terminal.
     */
    data: string;
};

/**
 * The message passed when the terminal has resized.
 */
export type ResizeMessage = {
    type: 'resize';

    /**
     * The number of columns displayed in the terminal.
     */
    columns: number;

    /**
     * The number of rows displayed in the terminal.
     */
    rows: number;
};

/**
 * The message passed when the terminal requests the TTY to pause sending data.
 */
export type PauseMessage = {
    type: 'pause';
};

/**
 * The message passed when the terminal requests the TTY to resume sending data.
 */
export type ResumeMessage = {
    type: 'resume';
};

/**
 * The types of messages that can be read from a terminal.
 */
export type InputMessages = InputMessage | ResizeMessage | PauseMessage | ResumeMessage;

/**
 * The message to pass to print output to the terminal.
 */
export type OutputMessage = {
    type: 'output';

    /**
     * The output to the terminal.
     */
    data: string;
};

/**
 * The message to pass to set the window title of the terminal.
 */
export type WindowTitleMessage = {
    type: 'windowtitle';

    /**
     * The title to set.
     */
    title: string;
};

/**
 * The types of messages that can be written to a terminal.
 */
export type OutputMessages = OutputMessage | WindowTitleMessage;
