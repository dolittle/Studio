// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import { Button } from '@dolittle/design-system/atoms/Button/Button';
import { useState } from 'react';
import { useEnvironments } from '../../api/environments/useEnvironments';
import { useEnvironmentTablesMetadata } from '../../api/tableMetadata/useEnvironmentTablesMetadata';

export type ExplorerProps = {
    selectedEnvironment?: string;
};

export const Explorer = ({ selectedEnvironment }: ExplorerProps) => {
    const { data: tablesMetadata } = useEnvironmentTablesMetadata({ environment: selectedEnvironment || '' });
    return (
        <div>
            <h3>Table Metadata{selectedEnvironment ? ` for ${selectedEnvironment}` : ''}</h3>
            {tablesMetadata && tablesMetadata.map((metadata) => <div key={metadata.name}>{metadata.name}</div>)}
        </div>
    );
};
