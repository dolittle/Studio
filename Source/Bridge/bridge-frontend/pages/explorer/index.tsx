import { useEnvironments } from '../../api/environments/useEnvironments';
import { Explorer } from '../../components/explorer/Explorer';
import { Page } from '../../components/layout/Page';

export default function ExplorerPage() {
    const { data } = useEnvironments();
    return (
        <Page>
            <h1>Explorer</h1>
            <Explorer />
            {data && data.map((env) => <div key={env.name}>{env.name}</div>)}
        </Page>
    );
};

