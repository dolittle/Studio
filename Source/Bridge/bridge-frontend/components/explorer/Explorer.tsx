import { Button } from '@dolittle/design-system/atoms/Button/Button';
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
                <div key={env.name}>
                    {env.name}
                    <Button
                        label={selectedEnvironment === env.name ? "Deselect" : "Select"}
                        variant={selectedEnvironment === env.name ? 'outlined' : 'text'} onClick={
                            () => {
                                if (selectedEnvironment && selectedEnvironment == env.name) {
                                    setSelectedEnvironment(undefined);
                                } else {
                                    setSelectedEnvironment(env.name || "");
                                }
                            }
                        }
                    />
                </div>
            )}

            <h3>Table Metadata{selectedEnvironment ? ` for ${selectedEnvironment}` : ""}</h3>
            {tablesMetadata && tablesMetadata.map((metadata) => <div key={metadata.name}>{metadata.name}</div>)}
        </div>
    );
};
