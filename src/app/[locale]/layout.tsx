import "@mantine/core/styles.css";


import { Link, routing } from "@/i18n/routing";
import {
    Box,
    Center,
    ColorSchemeScript,
    Flex,
    mantineHtmlProps,
    MantineProvider,
    Text
} from "@mantine/core";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { Nunito } from 'next/font/google';
import Image from "next/image";
import { notFound } from 'next/navigation';
import "./globals.css";
import { theme } from "./theme";
const nunito = Nunito({
    subsets: ["cyrillic", "latin"],
    weight: ["300", "400", "700"],
    display: "swap"
})
export async function generateMetadata({ params }: { params: { locale: string } }) {
    const { locale } = await params
    const t = await getTranslations('meta');
    return {
        title: t('title'),
        description: t('description'),
    }
}

export default async function RootLayout({ params, children }: { params: { locale: string }, children: any }) {
    // Ensure that the incoming `locale` is valid
    const { locale } = await params
    if (!routing.locales.includes(locale as any)) {
        notFound();
    }
    const messages = await getMessages();
    const t = await getTranslations()
    return (
        <html lang={locale} className={nunito.className} {...mantineHtmlProps} >
            <head>
                <ColorSchemeScript />
                <meta
                    name="viewport"
                    content=";inimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
                />
            </head>
            <body>
                <NextIntlClientProvider messages={messages}>
                    <MantineProvider theme={theme}>
                        <nav style={{
                            position: 'sticky',
                            top: 0,
                            zIndex: 1000,
                            backgroundColor: 'white'
                        }} >
                            <Box style={{
                                borderBottom: '1px solid var(--mantine-color-slate-3)'
                            }}
                            >
                                <Flex px={{ xs: 10, xl: 0 }} maw={1200} mx={'auto'} h={70} align={'center'}  >
                                    <Link href={'https://fcelimai.kz/'}>
                                        <Text fw={'bold'} c={'slate.9'} size="lg">
                                            {t('mainlink')}
                                        </Text>
                                    </Link>
                                </Flex>
                            </Box>
                        </nav>
                        <main className="main">
                            {children}
                            <Box maw={1200} mx={'auto'}>
                                <Links />
                                <Link href={'/policy'}>
                                    <Text px={{ xs: 10, xl: 0 }} className={'policy'} fw={'bold'} fz={'lg'}>
                                        {t('policy.title')}
                                    </Text>
                                </Link>
                            </Box>

                        </main>
                        <footer>
                            <Text py={10} fz={14} ta={'center'} c={'gray.4'}>© {new Date().getFullYear()} {t('footer')}</Text>
                        </footer>
                    </MantineProvider>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
const links =
    [
        { img: "/logonew.png", href: "/ru/" },
        { img: "/it-hub.png", href: "https://www.instagram.com/abai_it?igsh=MWU3MmIyNTdnMG05aQ==" },

        { img: "/abu.png", href: "https://www.instagram.com/bokeikhan_university?igsh=MXBpaG43djVoZ3dxMA==" },
        { img: "/abai-it.png", href: "https://www.instagram.com/abai_it_school?igsh=MWtrOHc2eWkzb2JwOQ==" }
    ]

const Links = () => {
    return <Flex wrap={'wrap'} gap={10} justify={'center'} align={'center'} py={40} >
        {links.map(link =>
            <Center pos={'relative'} w={120} h={120} key={link.href} style={{
                border: '1px solid var(--mantine-color-gray-3)',
                borderRadius: 100
            }}>
                <Link style={{ margin: 10 }} href={link.href} target='_blank'>
                    <Image fill src={link.img} alt='logo' />
                </Link></Center>)}
    </Flex>
}

