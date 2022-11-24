import { useGetCats } from '../../api/cats/useGetCats';
import { Page } from '../../components/layout/page';

export default function CatsPage() {
    const cats = useGetCats();
    console.log(cats);

    return (
        <Page>
            <h1>Cats</h1>
            {cats.isLoading && "Loading..."}
            {cats.isError && "Something went wrong!"}
            {cats.data?.data.map(cat => <div>{cat}</div>)}
        </Page>
    );
};
