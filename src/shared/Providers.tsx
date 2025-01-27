'use client'
import { DatesProvider } from "@mantine/dates";
import 'dayjs/locale/ru';
import { ReactNode, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false
        }
    }
})
const QueryProvider = ({ children }: { children: React.ReactNode }) => {
    const [client] = useState(() => queryClient);

    return (
        <QueryClientProvider client={client}>{children}</QueryClientProvider>
    );
}


export const Providers = ({ children }: { children: ReactNode }) => {
    return <DatesProvider settings={{ locale: 'ru' }}><QueryProvider>{children}</QueryProvider></DatesProvider>

}
