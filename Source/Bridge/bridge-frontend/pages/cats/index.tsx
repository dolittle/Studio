// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import { Button } from '@dolittle/design-system/atoms/Button/Button';
import { useCatFact } from '../../api/cats/useCatFact';
import { Page } from '../../components/layout/Page';
import { Refresh } from '@mui/icons-material';
import { Layout } from '../../components/layout/Layout';


export default function CatsPage() {
    const catFactQuery = useCatFact();

    return (
        <Layout>
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
                {catFactQuery.isLoading && 'Loading...'}
                {catFactQuery.isError && 'Something went wrong!'}
                {catFactQuery.data?.data.map((cat, i) => <div key={i}>{cat}</div>)}
            </Page>
        </Layout>
    );
};
