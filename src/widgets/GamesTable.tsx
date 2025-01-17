'use client'
import { BuyTicketBtn } from "@/features/BuyTicketBtn";
import { rGetGames } from "@/shared/api/games";
import { GameStatus } from "@/shared/consts";
import { Box, LoadingOverlay, Stack, Table, Title } from "@mantine/core";
import dayjs from "dayjs";
import jsPDF from "jspdf";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import QRCode from 'qrcode';
import { useQuery } from "react-query";
import "/public/Nunito-Bold-normal.js";


export const GamesTable = () => {
    const { data: games, isLoading, isError } = useQuery({
        queryKey: ['games'], queryFn: async () => {
            const data = await rGetGames()
            return data
        }
    })
    const { locale } = useParams()

    const t = useTranslations('gamesTable')

    if (isLoading) {
        return <Box w={'100%'} h={400} pos='relative'><LoadingOverlay loaderProps={{ color: 'elimai.6' }} visible={isLoading} zIndex={1000} /></Box>
    }
    if (!games) { return <Title ta={'center'} my={100} c={'red.5'} order={3}>Ошибка загрузки...</Title> }



    const rows = games.map((element, idx) => (
        <Table.Tr key={element.id}>
            <Table.Td ta={'center'}>{dayjs(element.event_date).locale(locale as string).format("DD-MM-YYYY HH:mm")}</Table.Td>
            <Table.Td ta={'center'}>{locale == 'ru' ? "Елимай" : "Елімай"} - {element[locale == 'ru' ? `name_ru` : 'name_kz']}</Table.Td>
            <Table.Td ta={'center'}>
                <BuyTicketBtn gameId={element.id} disabled={element.status !== GameStatus[0]} />
            </Table.Td>
        </Table.Tr>
    ));

    return (
        <Stack align="center" my={20} >
            <Title order={2}>Матчи</Title>
            <Table.ScrollContainer mx={'auto'} maw={1200} minWidth={500} w={'100%'}>
                <Table striped stripedColor="slate.2" withTableBorder fz={{
                    xs: 14, md: 16, lg: 18
                }} >
                    <Table.Thead >
                        <Table.Tr>
                            <Table.Th ta={'center'}>{t('date')}</Table.Th>
                            <Table.Th ta={'center'}>{t('game')}</Table.Th>
                            <Table.Th ta={'center'}>{t('buy')}</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>{rows}</Table.Tbody>
                    <Table.Caption>{t('caption')}</Table.Caption>
                </Table>
            </Table.ScrollContainer>
        </Stack>
    );
}
