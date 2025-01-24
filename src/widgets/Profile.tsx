'use client'
import { DownloadTicketsBtn } from "@/features"
import { rGetTicketsByUser } from "@/shared/api/games"
import { Box, LoadingOverlay, Stack, Table, Title } from "@mantine/core"
import { useTranslations } from "next-intl"
import { useParams } from "next/navigation"
import { useMemo } from "react"
import { useQuery } from "react-query"

export const Profile = () => {
    const t = useTranslations('gamesTable')
    const { data: tickets, isLoading, isError } = useQuery({
        queryKey: ['tickets user'], queryFn: async () => {
            const data = await rGetTicketsByUser()
            return data
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
                    {groupedTickets[key] && <DownloadTicketsBtn tickets={groupedTickets[key]} />}
                </Table.Td>
            </Table.Tr>
        )
    }, [tickets])
    if (isLoading) {
        return <Box w={'100%'} h={400} pos='relative'><LoadingOverlay loaderProps={{ color: 'elimai.6' }} visible={isLoading} zIndex={1000} /></Box>
    }
    if (!tickets) { return <Title ta={'center'} my={100} c={'red.5'} order={3}>Ошибка загрузки...</Title> }
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
// interface SeeTicketButtonProps {
//     tickets: Ticket[]
// }
// const SeeTicketButton = ({ tickets }: SeeTicketButtonProps) => {
//     const [opened, { open, close }] = useDisclosure(false);
//     const t = useTranslations()
//     const rows = tickets.map((ticket, idx) =>
//         <Table.Tr key={idx}>
//             <Table.Td ta="center">{idx + 1}</Table.Td>
//             <Table.Td ta="center">
//                 <Button variant="base"><EyeIcon /></Button>
//             </Table.Td>
//             <Table.Td ta="center">
//                 <Button variant="base"><DownloadIcon /></Button>
//             </Table.Td>
//
//         </Table.Tr>
//
//     )
//
//     console.log(tickets)
//     return (
//         <>
//             <Modal fullScreen size={'lg'} opened={opened} onClose={close} title={t('seeTickets.modal')}>
//                 <Table.ScrollContainer mt={20} mx={'auto'} maw={1200} minWidth={350} w={'100%'}>
//                     <Table stripedColor="slate.2" withTableBorder fz={{
//                         xs: 14, md: 16, lg: 18
//                     }} >
//                         <Table.Thead >
//                             <Table.Tr>
//                                 <Table.Th ta={'center'}>{t('seeTickets.name')}</Table.Th>
//                                 <Table.Th ta={'center'}>{t('seeTickets.seeAction')}</Table.Th>
//                                 <Table.Th ta={'center'}>{t('seeTickets.downloadAction')}</Table.Th>
//                             </Table.Tr>
//                         </Table.Thead>
//                         <Table.Tbody>
//                             {rows}
//                         </Table.Tbody>
//                     </Table>
//                 </Table.ScrollContainer>
//
//             </Modal>
//             <Button onClick={open} variant="base">{t('seeTickets.btn')}</Button>
//         </>
//     );
// }
