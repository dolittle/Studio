import { QueryClient, QueryClientConfig } from '@tanstack/react-query';

export const buildQueryClient = () =>{
    const clientOptions: QueryClientConfig = {
        defaultOptions: {
            queries: {
                staleTime: 1000 * 60 , // 1 minute
            }
        }

    };
    return new QueryClient(clientOptions);
}