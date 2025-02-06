'use client'
import { AuthProtectedButton } from '@/features';
import { Link as IntlLink, usePathname, useRouter } from '@/i18n/routing';
import { useAuth } from '@/shared/context';
import { AuthStatusView } from '@/widgets/AuthStatusView';
import { LocaleSwitcher } from '@/widgets/LocaleSwitcher';
import { AppShell, Box, Burger, Center, Flex, Group, Stack, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { clsx } from 'clsx';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { ReactNode, useEffect } from 'react';
import classes from './BaseLayout.module.css';

export function BaseLayout({ children }: { children: ReactNode }) {
    const [opened, { toggle, close }] = useDisclosure();
    const t = useTranslations()
    const { isAdmin } = useAuth()
    const router = useRouter()
    const path = usePathname()
    useEffect(() => {
        close()

    }, [path])
    return (
        <AppShell
            header={{ height: 60 }}
            navbar={{ width: 300, breakpoint: 'lg', collapsed: { desktop: true, mobile: !opened } }}
        >
            <AppShell.Header >
                <Group w={'100vw'} h="100%" pl={10} pr={20} >
                    <Burger opened={opened} onClick={toggle} hiddenFrom="lg" size="sm" />
                    <Group justify="space-between" style={{ flex: 1 }}>
                        <Image src='/logonew.png' width={50} height={50} alt='e-logo' />
                        <Group ml="xl" gap={0} visibleFrom="lg" align='flex-end'>
                            <IntlLink href={'https://fcelimai.kz'} target='_blank' className={classes.control}>{t('header.fcelimai')}</IntlLink>
                            <IntlLink href={'/'} className={clsx(classes.control, path == '/' && classes.active)}>{t('header.main')}</IntlLink>
                            <AuthProtectedButton btnProps={{
                                ['data-id']: 'profile'
                            }} className={clsx(classes.control, path == '/profile' && classes.active)} label={t('header.profile')} action={() => {
                                router.push('/profile')
                            }} />
                            {isAdmin &&
                                <Link href={'/admin'} className={clsx(classes.control)}>Админ-панель</Link>}
                        </Group>
                        <Group>
                            <LocaleSwitcher />
                            <AuthStatusView visibleFrom='lg' />
                        </Group>
                    </Group>
                </Group>
            </AppShell.Header>

            <AppShell.Navbar py="md" px={4}>
                <Box flex={1}>
                    <IntlLink href={'https://fcelimai.kz'} target='_blank' className={classes.control}>{t('header.fcelimai')}</IntlLink>
                    <IntlLink href={'/'} className={classes.control}>{t('header.main')}</IntlLink>
                    <AuthProtectedButton className={clsx(classes.control, path == '/profile' && classes.active)} label={t('header.profile')} action={() => {
                        router.push('/profile')
                    }} />
                    {isAdmin &&
                        <Link href={'/admin'} className={clsx(classes.control)}>Админ-панель</Link>}

                </Box>
                <AuthStatusView />
            </AppShell.Navbar>


            <AppShell.Main >
                {children}
                <Links />
                <footer>
                    <Stack
                        p={{ xs: 5, sm: 10, xl: 0 }}
                        maw={1200} mx={'auto'}>
                        <Text ta={{ xs: 'center', lg: 'start' }} maw={1200} c={'gray.4'} component={IntlLink} href={'/policy'}>{t('policy.title')}</Text>
                        <Text py={10} fz={14} ta={'center'} c={'gray.4'}>© {new Date().getFullYear()} {t('footer')}</Text>
                    </Stack>
                </footer>

            </AppShell.Main>
        </AppShell >
    );
}
const links =
    [
        { img: "/logonew.png", href: "/" },
        { img: "/it-hub.png", href: "https://www.instagram.com/abai_it?igsh=MWU3MmIyNTdnMG05aQ==" },

        { img: "/abu.png", href: "https://www.instagram.com/bokeikhan_university?igsh=MXBpaG43djVoZ3dxMA==" },
        { img: "/abai-it.png", href: "https://www.instagram.com/abai_it_school?igsh=MWtrOHc2eWkzb2JwOQ==" }
    ]

const Links = () => {
    return <Flex wrap={'wrap'} gap={10} justify={'center'} align={'center'} py={40} >
        {links.map(link =>
            <Center pos={'relative'} w={120} h={120} key={link.href} style={{
                border: '1px solid var(--mantine-color-gray-3)',
                borderRadius: 100,
            }}>
                <Link style={{
                    margin: 10,
                    position: 'relative'
                }} href={link.href} target='_blank'  >
                    <Image sizes='(max-width: 768px) 120px, (max-width: 1200px) 100px' width={120} height={120} src={link.img} alt='logo' />
                </Link></Center>)}
    </Flex>

}
