'use client';

import { usePathname, useRouter } from '@/i18n/routing';
import { Select } from '@mantine/core';
import { useParams } from 'next/navigation';
import { useTransition } from 'react';

type Props = {
    defaultValue: string;
    locales: readonly ["kz", "ru"]
};

export default function LocaleSwitcherSelect({
    defaultValue,
    locales,
}: Props) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const pathname = usePathname();
    const params = useParams();

    function onSelectChange(value: string) {
        const nextLocale = value
        startTransition(() => {
            router.replace(
                // @ts-expect-error -- TypeScript will validate that only known `params`
                // are used in combination with a given `pathname`. Since the two will
                // always match for the current route, we can skip runtime checks.
                { pathname, params },
                { locale: nextLocale }
            );
        });
    }

    return (
        <Select
            w={100}
            checkIconPosition='right'
            styles={{
                input: {
                    fontSize: '18px', // Change font size of the input field
                },
                option: {
                    fontSize: "18px"
                }
            }}
            data={locales}
            defaultValue={defaultValue}
            comboboxProps={{ transitionProps: { transition: 'pop', duration: 200 } }}
            disabled={isPending}
            onChange={(value) => onSelectChange(value as string)}

        />
    );
}
