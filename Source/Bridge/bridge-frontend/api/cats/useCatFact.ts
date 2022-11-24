import { useQuery } from '@tanstack/react-query'

export type CatsQueryResponse ={
    data: string[]
}

async function getCatFact() {
    const response = await fetch('/api/cats');
    return response.json() as Promise<CatsQueryResponse>;
}

export const useCatFact = ()  => {
    return useQuery(['cats'], getCatFact);
}

