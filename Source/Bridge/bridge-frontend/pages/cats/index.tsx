import { Button } from '@dolittle/design-system/atoms/Button/Button';
import { useCatFact } from '../../api/cats/useCatFact';
import { Page } from '../../components/layout/Page';
import { Refresh } from '@mui/icons-material';


export default function CatsPage() {
    const catFactQuery = useCatFact();
    console.log(catFactQuery);

    return (
        <Page>
            <h1>Cats</h1>
            <br />
            <Button
                variant='filled'
                label='Refresh'
                disabled={catFactQuery.isFetching}
                endWithIcon={<Refresh fontSize='small' />}
                onClick={() => catFactQuery.refetch()}
            />
            <br />
            <br />
            {catFactQuery.isLoading && "Loading..."}
            {catFactQuery.isError && "Something went wrong!"}
            {catFactQuery.data?.data.map(cat => <div>{cat}</div>)}
        </Page>
    );
};
