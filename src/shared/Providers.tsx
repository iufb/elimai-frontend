'use client'

import { ReactNode, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

const QueryProvider = ({ children }: { children: React.ReactNode }) => {
    const [queryClient] = useState(() => new QueryClient());

    return (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
}


export const Providers = ({ children }: { children: ReactNode }) => {
    return <QueryProvider>{children}</QueryProvider>

}
