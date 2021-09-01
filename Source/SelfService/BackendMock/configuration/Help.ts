// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { InternalSchema } from 'convict';
import { Configuration } from './Configuration';
import { validateConfiguration } from './Validation';

type ConfigurationProperty = {
    default: any;
    doc: string;
    arg: string;
    env: string;
};

const isConfigurationProperty = (obj: any): obj is ConfigurationProperty =>
    obj.hasOwnProperty('default') &&
    obj.hasOwnProperty('doc') && typeof obj.doc === 'string' &&
    obj.hasOwnProperty('arg') && typeof obj.arg === 'string' &&
    obj.hasOwnProperty('env') && typeof obj.env === 'string';

const flattenConfigurationProperties = <T>(list: ConfigurationProperty[], schema: InternalSchema<T>): ConfigurationProperty[] => {
    for (const key in schema.properties) {
        const property = schema.properties[key] as any;
        if (isConfigurationProperty(property)) {
            list.push(property);
        }
        if (property.hasOwnProperty('properties') && typeof property.properties === 'object') {
            flattenConfigurationProperties(list, property);
        }
    }
    return list;
};

/**
 * Prints a help text to the STDOUT describing all possible command line arguments.
 */
export const printCommandHelp = () => {
    process.stdout.write('M3 PurchaseOrderAPI\n\n');

    const properties = flattenConfigurationProperties([], Configuration.getSchema());

    const widestPropertyArg = properties
        .map(property => property.arg.length)
        .reduce((a,b) => Math.max(a,b));

    process.stdout.write('Options:\n');
    for (const property of properties) {
        const paddedArg = property.arg.padEnd(widestPropertyArg);
        process.stdout.write(`\t--${paddedArg} ${property.doc} (default: '${property.default}')\n`);
    }

    process.stdout.write(`\t--${'help'.padEnd(widestPropertyArg)} Prints this help text\n`);
};

/**
 * Checks whether or not the caller requested help to be printed (by specifying '-h' or '--help' as an argument).
 * @returns A value indicating whether the command line help was requested.
 */
export const shouldPrintHelp = (): boolean => {
    for (const argument of process.argv) {
        if (argument === '--help' || argument === '-h') {
            return true;
        }
    }
    return false;
};

/**
 * Prints the command line help text or configuration validation error and calls 'process.exit()' or proceeds if configuration is valid.
 */
export const printHelpOrValidationError = () => {
    const configValidation = validateConfiguration();

    if (shouldPrintHelp()) {
        printCommandHelp();
        process.exit(0);
    }

    if (!configValidation.isValid) {
        printCommandHelp();
        process.stderr.write(`\nError: ${configValidation.error.message}\n`);
        process.exit(1);
    }
};
