'use client'

import { Link } from "@/i18n/routing"
import { Box, Button, Center, Stack, Title } from "@mantine/core"
import { Ban } from "lucide-react"
import { useTranslations } from "next-intl"
import { useSearchParams } from "next/navigation"


export const ResultWindow = () => {
    const t = useTranslations()
    const query = useSearchParams()
    const result = query.get('result')
    return <Box h={'50svh'}>
        <Center h={'100%'}>
            {result ? "YEs" :
                <Stack align="center">
                    <Ban size={100} color="red" />
                    <Title order={2} c={'red.5'}>{t('result.error')}</Title>
                    <Button variant="base"><Link href={'/'}>{t('result.link')}</Link></Button>
                </Stack>
            }
        </Center>
    </Box>

}
