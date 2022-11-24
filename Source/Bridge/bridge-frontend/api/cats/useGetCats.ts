import { useQuery } from '@tanstack/react-query'

export type CatsQueryResponse ={
    data: string[]
}

async function getCats() {
    const response = await fetch('/api/cats');
    return response.json() as Promise<CatsQueryResponse>;
}

export const useGetCats = ()  => {
    return useQuery(['cats'], getCats);
}

