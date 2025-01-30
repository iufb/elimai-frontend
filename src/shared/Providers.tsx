'use client'
import { AuthProvider } from "@/shared/context";
import { DatesProvider } from "@mantine/dates";
import 'dayjs/locale/ru';
import { ReactNode, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: 1
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
    return <AuthProvider><DatesProvider settings={{ locale: 'ru' }}><QueryProvider>{children}</QueryProvider></DatesProvider></AuthProvider>

}
