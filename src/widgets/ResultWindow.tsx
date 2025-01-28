'use client'

import { Link } from "@/i18n/routing"
import { Alert, Box, Button, Center, Group, Loader, Stack, Text, Title } from "@mantine/core"
import { BadgeCheck, Ban, CircleHelp, } from "lucide-react"
import { useTranslations } from "next-intl"
import { useParams, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

import { DownloadTicketsBtn } from "@/features"
import { BuyTicketBtn } from "@/features/BuyTicketBtn"
import { rGetTickets } from "@/shared/api/games"
import { TicketsView } from "@/widgets/TicketsView"
import { useQuery } from "react-query"

export const ResultWindow = () => {
    const t = useTranslations()
    const query = useSearchParams()
    const order = query.get('order')
    const gameId = query.get('event_id')
    const { locale } = useParams()
    const { data: tickets, isFetching, error, refetch } = useQuery({
        queryKey: ['getTicket'], queryFn: async () => {
            const data = await rGetTickets(order)
            return data
        },
        enabled: !!order,
        refetchOnWindowFocus: false
    })
    return <Box mt={20} mih={'50svh'}>
        <Center w={'100%'} h={'100%'} pos={'relative'}>
            {isFetching ? <Loader color="elimai.6" /> :
                !error ?
                    <Stack>
                        <Alert
                            icon={<BadgeCheck />}
                            p={10}
                            variant="filled" color="elimai.2" title={t('result.success.message')}
                        >
                            <span>{t('result.success.count', { count: tickets?.length })}</span>
                            <ul>
                                <li>{t('result.success.instructions')}</li>
                                <li>{t('result.success.additional_info.email')}</li>
                                <li>{t('result.success.additional_info.account')}</li>
                            </ul>
                        </Alert>
                        <Group grow>
                            {tickets && <DownloadTicketsBtn tickets={tickets} />}
                            {gameId && <BuyTicketBtn again variant="outline" gameId={parseInt(gameId)} />}
                        </Group>
                        {tickets && <TicketsView tickets={tickets} />}
                    </Stack>
                    :
                    <Stack align="center">
                        <Ban size={100} color="red" />
                        <Title order={2} c={'red.5'}>{t('result.error')}</Title>

                        <Button variant="base" onClick={() => refetch()}>{t('result.again')}</Button>
                        <Button variant="outline"><Link href={'/'}>{t('result.link')}</Link></Button>
                    </Stack>}

        </Center>
    </Box>

}

const NotDownloadedView = ({ refetch }: { refetch: () => void }) => {
    const [timer, setTimer] = useState(10)
    const t = useTranslations()
    useEffect(() => {
        if (timer > 0) {
            const timer = setInterval(() => {
                setTimer((prevSeconds) => prevSeconds - 1);
            }, 1000); // Update every second
            return () => clearInterval(timer); // Cleanup on unmount
        }
    }, [timer]);
    const onClick = () => {
        refetch()
        setTimer(10)
    }
    return <Stack justify="center" align="center">
        <CircleHelp size={80} color="var(--mantine-color-elimai-6)" />
        <Title ta={'center'} order={3} c={"slate.4"}>
            {t('result.notStarted.title')} <button disabled={timer !== 0} onClick={onClick}>
                <Text fw={'bold'} size="lg" c={timer > 0 ? "slate.4" : "elimai.6"}>
                    {t('result.notStarted.timer.text')} {timer > 0 && t('timer', { timer })}
                </Text>
            </button>
        </Title>
        <Button variant="base"><Link href={'/'}>{t('result.link')}</Link></Button>
    </Stack>


}
