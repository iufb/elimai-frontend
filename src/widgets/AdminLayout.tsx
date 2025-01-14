'use client'
import { AppShell, Burger, Group, Skeleton } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Image from 'next/image';
import { ReactNode } from 'react';

export function AdminLayout({ children }: { children: ReactNode }) {
    const [opened, { toggle }] = useDisclosure();
    return (
        <AppShell
            header={{ height: 80 }}
            navbar={{
                width: { base: 200, md: 250, lg: 400 },
                breakpoint: 'md',
                collapsed: { mobile: !opened },
            }}
            padding="md"
        >
            <AppShell.Header>
                <Group h="100%" px="md">
                    <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />

                    <Image src='/logonew.png' width={60} height={60} alt='e-logo' />
                </Group>
            </AppShell.Header>
            <AppShell.Navbar p="md">
                Navbar
                {Array(15)
                    .fill(0)
                    .map((_, index) => (
                        <Skeleton key={index} h={28} mt="sm" animate={false} />
                    ))}
            </AppShell.Navbar>
            <AppShell.Main>{children}</AppShell.Main>
        </AppShell>
    );
}
