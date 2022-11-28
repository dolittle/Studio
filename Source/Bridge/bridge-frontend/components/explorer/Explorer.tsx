import { useState } from 'react';
import { useEnvironments } from '../../api/environments/useEnvironments';
import { useEnvironmentTablesMetadata } from '../../api/tableMetadata/useEnvironmentTablesMetadata';

export const Explorer = () => {
    const [selectedEnvironment, setSelectedEnvironment] = useState<string | undefined>(undefined);
    const { data: environments } = useEnvironments();
    const { data: tablesMetadata } = useEnvironmentTablesMetadata({ environment: selectedEnvironment || "" })
    return (
        <div>
            <h2>Environments</h2>
            {environments && environments.map((env) =>
                <div key={env.name} onClick={() => setSelectedEnvironment(env.name)}>{env.name}</div>
            )}

            <h3>Table Metadata</h3>
            {tablesMetadata && tablesMetadata.map((metadata) => <div key={metadata.name}>{metadata.name}</div>)}
        </div>
    );
};
