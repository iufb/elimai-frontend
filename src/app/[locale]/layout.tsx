import "@mantine/core/styles.css";


import { routing } from "@/i18n/routing";
import {
    ColorSchemeScript,
    mantineHtmlProps,
    MantineProvider,
} from "@mantine/core";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { theme } from "./theme";
export const metadata = {
    title: "Mantine Next.js template",
    description: "I am using Mantine with Next.js!",
};

export default async function RootLayout({ params, children }: { params: { locale: string }, children: any }) {
    // Ensure that the incoming `locale` is valid
    const { locale } = await params
    if (!routing.locales.includes(locale as any)) {
        notFound();
    }
    const messages = await getMessages();
    return (
        <html lang={locale} {...mantineHtmlProps}>
            <head>
                <ColorSchemeScript />
                <link rel="shortcut icon" href="/favicon.svg" />
                <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
                />
            </head>
            <body>
                <NextIntlClientProvider messages={messages}>
                    <MantineProvider theme={theme}>{children}</MantineProvider>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
