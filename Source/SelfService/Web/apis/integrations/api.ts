// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

export const getBridgeServerUrlPrefix = () => {
    return '/selfservice/api/bridge';
};

export async function generateStatusErrorMessage(status: number, body: string): Promise<string>;
export async function generateStatusErrorMessage(result: Response): Promise<string>;
export async function generateStatusErrorMessage(resultOrStatus: Response | number, body?: string): Promise<string> {
  if (typeof resultOrStatus === 'number' && body) {
    return `Request failed with status code ${resultOrStatus} and body: ${body}`;
  } else {
    const result = resultOrStatus as Response;
    return `Request failed with status code ${result.status} and body: ${await result.text()}`;
  }
}

