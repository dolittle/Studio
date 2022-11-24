import { QueryClient } from '@tanstack/react-query';

export const buildQueryClient = () =>{
    return new QueryClient();
}