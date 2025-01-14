'use client'
import { DatesProvider } from "@mantine/dates";
import 'dayjs/locale/ru';
import { ReactNode, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

const QueryProvider = ({ children }: { children: React.ReactNode }) => {
    const [queryClient] = useState(() => new QueryClient());

    return (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
}


export const Providers = ({ children }: { children: ReactNode }) => {
    return <DatesProvider settings={{ locale: 'ru' }}><QueryProvider>{children}</QueryProvider></DatesProvider>

}
