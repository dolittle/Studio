// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { LogLine } from './loki/logLines';

export enum TerminalColor {
    Black, Red, Green, Yellow, Blue, Magenta, Cyan, White
}

type SectionStyle = {
    background?: TerminalColor;
    foreground?: TerminalColor;
};

export type ColoredLineSection = SectionStyle & {
    text?: string;
};

export type ColoredLine = {
    sections: ColoredLineSection[];
    leading: {
        spaces: number;
        tabs: number;
    };
};

const setSectionCsiSgrStyle = (style: SectionStyle, parameters: string): void => {
    switch (parameters) {
        case '30':
            style.foreground = TerminalColor.Black;
            return;
        case '31':
            style.foreground = TerminalColor.Red;
            return;
        case '32':
            style.foreground = TerminalColor.Green;
            return;
        case '33':
            style.foreground = TerminalColor.Yellow;
            return;
        case '34':
            style.foreground = TerminalColor.Blue;
            return;
        case '35':
            style.foreground = TerminalColor.Magenta;
            return;
        case '36':
            style.foreground = TerminalColor.Cyan;
            return;
        case '37':
            style.foreground = TerminalColor.White;
            return;
        // TODO: 38 starts more complicated colors
        case '39':
            delete style.foreground;
            return;

        case '40':
            style.background = TerminalColor.Black;
            return;
        case '41':
            style.background = TerminalColor.Red;
            return;
        case '42':
            style.background = TerminalColor.Green;
            return;
        case '43':
            style.background = TerminalColor.Yellow;
            return;
        case '44':
            style.background = TerminalColor.Blue;
            return;
        case '45':
            style.background = TerminalColor.Magenta;
            return;
        case '46':
            style.background = TerminalColor.Cyan;
            return;
        case '47':
            style.background = TerminalColor.White;
            return;
        // TODO: 48 starts more complicated colors
        case '49':
            delete style.background;
            return;
    }
};

// Seeks through raw string starting from the given position, until a character outside the given range is found. Returns the number of characters consumed.
const seekUntilOutside = (raw: string, position: number, characterRangeStart: number, characterRangeEnd: number): number => {
    let consumed = 0;
    while (position < raw.length && (raw.charCodeAt(position) >= characterRangeStart && raw.charCodeAt(position) <= characterRangeEnd)) {
        consumed++;
        position++;
    }
    return consumed;
};

// Seeks through raw string starting from the given position, until a character inside the given range is found. Returns the number of characters consumed.
const seekUntilInside = (raw: string, position: number, characterRangeStart: number, characterRangeEnd: number): number => {
    let consumed = 0;
    while (position < raw.length && (raw.charCodeAt(position) < characterRangeStart || raw.charCodeAt(position) > characterRangeEnd)) {
        consumed++;
        position++;
    }
    return consumed;
};

// Seeks through raw string starting from the given position, and consumes a valid escape sequence. Returns the number of characters consumed.
const seekEscapeSequence = (raw: string, position: number): number => {
    if (raw.charCodeAt(position) !== 0x1B || raw.charCodeAt(position + 1) !== 0x5B) {
        return 0;
    }

    let consumed = 2;

    consumed += seekUntilOutside(raw, position + consumed, 0x30, 0x3F);
    consumed += seekUntilOutside(raw, position + consumed, 0x20, 0x2F);

    if (raw.charCodeAt(position + consumed) < 0x40 || raw.charCodeAt(position + consumed) > 0x7E) {
        return 0;
    }
    consumed += 1;

    return consumed;
};

// Seeks through raw string starting from the given position, until a valid escape sequence is found. Returns the number of characters consumed.
const seekPlainText = (raw: string, position: number): number => {
    let consumed = 0;
    while (position < raw.length) {
        const textCharacters = seekUntilInside(raw, position, 0x1B, 0x1B);
        consumed += textCharacters;
        position += textCharacters;

        if (textCharacters === 0 || position === raw.length) {
            break;
        }

        const escapeCharacters = seekEscapeSequence(raw, position);
        if (escapeCharacters > 0) {
            break;
        }

        // Invalid escape sequence, consume as plain text
        consumed++;
        position++;
    }
    return consumed;
};

const setSectionStyleFromEscapeSequence = (style: SectionStyle, sequence: string): void => {
    if (sequence.charCodeAt(0) === 0x1B && sequence.charCodeAt(1) === 0x5B) {
        // Control Sequence Introducer sequence
        const parameterCharacters = seekUntilInside(sequence, 2, 0x40, 0x7E);
        switch (sequence.charCodeAt(2 + parameterCharacters)) {
            case 0x6D: // Select Graphic Rendition
                setSectionCsiSgrStyle(style, sequence.slice(2, 2 + parameterCharacters));
                return;
        }
    }
};

const countLeadingSpacesAndTabs = (raw: string): [number, number] => {
    let spaces = 0, tabs = 0;

    loop: for (let i = 0; i < raw.length; i++) {
        switch (raw.charCodeAt(i)) {
            case 0x20:
                spaces++;
                break;
            case 0x09:
                tabs++;
                break;
            default:
                break loop;
        }
    }

    return [spaces, tabs];
};

export const parseLogLine = (line: LogLine): ColoredLine => {
    const sections: ColoredLineSection[] = [];

    const raw = line.line, N = raw.length, currentStyle: SectionStyle = {};

    const [spaces, tabs] = countLeadingSpacesAndTabs(raw);

    let i = 0;
    while (i < N) {
        const textCharacters = seekPlainText(raw, i);
        if (textCharacters > 0) {
            sections.push({ text: raw.slice(i, i + textCharacters), ...currentStyle });
            i += textCharacters;
            continue;
        }

        const escapeCharacters = seekEscapeSequence(raw, i);
        if (escapeCharacters > 0) {
            setSectionStyleFromEscapeSequence(currentStyle, raw.slice(i, i + escapeCharacters));
            i += escapeCharacters;
            continue;
        }

        break;
    }

    return { sections, leading: { spaces, tabs } };
};
