'use client'
import { AuthProtectedButton } from '@/features';
import { Link, useRouter } from '@/i18n/routing';
import { AppShell, Burger, Center, Flex, Group, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { ReactNode } from 'react';
import classes from './BaseLayout.module.css';

export function BaseLayout({ children }: { children: ReactNode }) {
    const [opened, { toggle }] = useDisclosure();
    const t = useTranslations()
    const router = useRouter()
    return (
        <AppShell
            header={{ height: 60 }}
            navbar={{ width: 300, breakpoint: 'md', collapsed: { desktop: true, mobile: !opened } }}
        >
            <AppShell.Header>
                <Group h="100%" px="md">
                    <Burger opened={opened} onClick={toggle} hiddenFrom="md" size="sm" />
                    <Group justify="space-between" style={{ flex: 1 }}>
                        <Image src='/logonew.png' width={50} height={50} alt='e-logo' />
                        <Group ml="xl" gap={0} visibleFrom="md" align='flex-end'>
                            <Link href={'/'} className={classes.control}>{t('header.main')}</Link>
                            <Link href={'https://fcelimai.kz'} target='_blank' className={classes.control}>{t('header.fcelimai')}</Link>
                            <AuthProtectedButton className={classes.control} label={t('header.profile')} action={() => {
                                router.push('/profile')
                            }} />

                        </Group>
                    </Group>
                </Group>
            </AppShell.Header>

            <AppShell.Navbar py="md" px={4}>
                <Link href={'/'} className={classes.control}>{t('header.main')}</Link>
                <Link href={'https://fcelimai.kz'} target='_blank' className={classes.control}>{t('header.fcelimai')}</Link>
                <Link href={'/profile'} className={classes.control}>{t('header.profile')}</Link>
            </AppShell.Navbar>


            <AppShell.Main>
                {children}
                <Links />
                <footer>
                    <Text py={10} fz={14} ta={'center'} c={'gray.4'}>© {new Date().getFullYear()} {t('footer')}</Text>
                </footer>

            </AppShell.Main>
        </AppShell>
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
                borderRadius: 100
            }}>
                <Link style={{ margin: 10 }} href={link.href} target='_blank'>
                    <Image fill src={link.img} alt='logo' />
                </Link></Center>)}
    </Flex>

}
