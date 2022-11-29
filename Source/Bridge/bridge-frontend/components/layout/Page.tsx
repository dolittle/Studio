// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

export type PageProps = {
    children?: React.ReactNode
};

export const Page = ({ children }: PageProps) => {
    return (
        <div>
            {children}
        </div>
    );
};
