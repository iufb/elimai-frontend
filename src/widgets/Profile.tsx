'use client'
import { DownloadBtn } from "@/features"
import { rGetTicketsByUser } from "@/shared/api/games"
import { Ticket } from "@/shared/types"
import { Alert, Box, Center, LoadingOverlay, Stack, Table, Title } from "@mantine/core"
import { AlertTriangle, CircleX } from "lucide-react"
import { useTranslations } from "next-intl"
import { useParams } from "next/navigation"
import { useMemo } from "react"
import { useQuery } from "react-query"

export const Profile = () => {

    return <TicketsTable />
}

const TicketsTable = () => {
    const t = useTranslations('gamesTable')
    const { data: tickets, isLoading, error } = useQuery<Ticket[], { message: string, status: number }, Ticket[], string[]>({
        queryKey: ['tickets user'], queryFn: async () => {
            return rGetTicketsByUser()
        }
    })
    const { locale } = useParams()
    const rows = useMemo(() => {
        if (!tickets) return []
        const groupedTickets = Object.groupBy(tickets, (ticket) => {
            const key = `name_${locale}` as keyof typeof ticket
            return ticket[key]
        })
        return Object.keys(groupedTickets).map(key =>
            <Table.Tr key={key}>
                <Table.Td ta="center">{locale == 'ru' ? "Елимай" : "Елімай"} <br /> {key}</Table.Td>
                <Table.Td ta="center">{groupedTickets[key]?.length}</Table.Td>
                <Table.Td ta="center">
                    {groupedTickets[key] && <DownloadBtn type="ticket" tickets={groupedTickets[key]} />}
                </Table.Td>
            </Table.Tr>
        )
    }, [tickets])
    if (isLoading) {
        return <Box w={'100%'} h={250} pos='relative'><LoadingOverlay loaderProps={{ color: 'elimai.6' }} visible={isLoading} zIndex={1000} /></Box>
    }
    if (error?.status === 404) {
        return <Center w={'100%'} h={250} maw={1200} mx={'auto'}><Alert
            icon={<AlertTriangle />}
            variant="filled" color="elimai.4" my={20} title={t('notFoundTickets.title')}
        >
            {t('notFoundTickets.desc')}
        </Alert></Center>

    }
    if (error) {
        return <Center w={'100%'} h={250} maw={1200} mx={'auto'}><Alert
            icon={<CircleX />}
            variant="filled" color="red.4" my={20} title={t('errorTickets.title')}
        >
            {t('errorTickets.desc')}
        </Alert></Center>

    }

    return <Stack align="center" my={20} >
        <Title order={4}>{t('buyedTickets')}</Title>
        <Table.ScrollContainer mt={20} mx={'auto'} maw={1200} minWidth={350} w={'100%'}>
            <Table stripedColor="slate.2" withTableBorder fz={{
                xs: 14, md: 16, lg: 18
            }} >
                <Table.Thead >
                    <Table.Tr>
                        <Table.Th ta={'center'}>{t('game')}</Table.Th>
                        <Table.Th ta={'center'}>{t('count')}</Table.Th>
                        <Table.Th ta={'center'}>{t('tickets')}</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {rows}
                </Table.Tbody>
            </Table>
        </Table.ScrollContainer></Stack>


}
