import { Providers } from "@/shared/Providers";
import "@mantine/core/styles.css";
import '@mantine/dates/styles.css';
import '@mantine/notifications/styles.css';
import "./globals.css";
export default function Layout({ children }: { children: any }) {
    return <Providers>
        {children}</Providers>
}
